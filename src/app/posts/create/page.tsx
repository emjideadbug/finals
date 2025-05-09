'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useQueryClient } from '@tanstack/react-query';
import { Skeleton } from "@/components/ui/skeleton";

export default function CreatePostPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    body: '',
    userId: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const newPost = await response.json();
        // Optimistically update the cache
        queryClient.setQueryData(['posts'], (oldData: any) => {
          return [...(oldData || []), newPost];
        });
        queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] });
        router.push('/posts');
      }
    } catch (error) {
      console.error('Error creating post:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black p-4">
      <div className="max-w-2xl mx-auto">
        <Card className="backdrop-blur-md bg-gray-800/50 border-gray-700/50 shadow-2xl mb-8">
          <CardHeader>
            <CardTitle className="text-4xl font-extrabold text-white drop-shadow-lg text-center">
              Create New Post
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-lg font-semibold shadow-lg transition-all duration-300">
                <Link href="/">Home</Link>
              </Button>
              <Button asChild className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-lg font-semibold shadow-lg transition-all duration-300">
                <Link href="/users">Users</Link>
              </Button>
              <Button asChild className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-lg font-semibold shadow-lg transition-all duration-300">
                <Link href="/dashboard">Dashboard</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="backdrop-blur-md bg-gray-800/50 border-gray-700/50 shadow-xl">
          <CardContent className="p-6">
            {isLoading ? (
              <div className="space-y-6">
                <div className="space-y-4">
                  <Skeleton className="h-4 w-20 bg-white/20" />
                  <Skeleton className="h-10 w-full bg-white/20" />
                </div>
                <div className="space-y-4">
                  <Skeleton className="h-4 w-20 bg-white/20" />
                  <Skeleton className="h-10 w-full bg-white/20" />
                </div>
                <div className="space-y-4">
                  <Skeleton className="h-4 w-20 bg-white/20" />
                  <Skeleton className="h-[200px] w-full bg-white/20" />
                </div>
                <Skeleton className="h-10 w-full bg-white/20" />
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="userId" className="text-white">User ID</Label>
                    <Input
                      id="userId"
                      name="userId"
                      type="number"
                      value={formData.userId}
                      onChange={handleChange}
                      required
                      className="bg-gray-700/50 border-gray-600 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="title" className="text-white">Title</Label>
                    <Input
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      required
                      className="bg-gray-700/50 border-gray-600 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="body" className="text-white">Content</Label>
                    <Textarea
                      id="body"
                      name="body"
                      value={formData.body}
                      onChange={handleChange}
                      required
                      className="bg-gray-700/50 border-gray-600 text-white min-h-[200px]"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-lg font-semibold shadow-lg transition-all duration-300"
                >
                  {isLoading ? 'Creating...' : 'Create Post'}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 