'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function PostsPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['posts'],
    queryFn: () => fetch('https://jsonplaceholder.typicode.com/posts').then(res => res.json()),
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black p-4">
      <div className="max-w-2xl mx-auto">
        <Card className="backdrop-blur-md bg-gray-800/50 border-gray-700/50 shadow-2xl mb-8">
          <CardHeader>
            <CardTitle className="text-4xl font-extrabold text-white drop-shadow-lg text-center">
              Posts
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
              <Button asChild className="w-full sm:w-auto bg-yellow-600 hover:bg-yellow-700 text-lg font-semibold shadow-lg transition-all duration-300">
                <Link href="/posts/create">Create Post</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {error ? (
          <div className="text-red-400 bg-red-900/20 p-4 rounded-lg border border-red-500/20">
            Error loading posts. Please try again later.
          </div>
        ) : (
          <div className="grid gap-4">
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <Card key={i} className="backdrop-blur-md bg-gray-800/50 border-gray-700/50 shadow-xl">
                  <div className="p-4">
                    <Skeleton className="h-6 w-3/4 bg-white/20 mb-2" />
                    <Skeleton className="h-4 w-full bg-white/20" />
                  </div>
                </Card>
              ))
            ) : (
              data.map((post: any) => (
                <Card key={post.id} className="backdrop-blur-md bg-gray-800/50 border-gray-700/50 shadow-xl hover:bg-gray-700/50 transition-all duration-300">
                  <Link href={`/posts/${post.id}`} className="block p-4">
                    <div className="text-xl font-semibold text-white mb-2">{post.title}</div>
                    <div className="text-gray-300 line-clamp-2">{post.body}</div>
                  </Link>
                </Card>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}