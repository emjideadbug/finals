'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { use } from 'react';

export default function PostDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { data: post, isLoading: isLoadingPost, error: postError } = useQuery({
    queryKey: ['post', resolvedParams.id],
    queryFn: () => fetch(`/api/posts/${resolvedParams.id}`).then(res => {
      if (!res.ok) throw new Error('Post not found');
      return res.json();
    }),
  });

  const { data: comments, isLoading: isLoadingComments } = useQuery({
    queryKey: ['post-comments', resolvedParams.id],
    queryFn: () => fetch(`/api/comments?postId=${resolvedParams.id}`).then(res => res.json()),
  });

  if (postError) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black p-4">
        <div className="max-w-4xl mx-auto">
          <Card className="backdrop-blur-md bg-gray-800/50 border-gray-700/50 shadow-2xl">
            <CardContent className="p-6">
              <div className="text-red-400 text-center">
                Post not found
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black p-4">
      <div className="max-w-4xl mx-auto">
        <Card className="backdrop-blur-md bg-gray-800/50 border-gray-700/50 shadow-2xl mb-8">
          <CardHeader>
            <CardTitle className="text-4xl font-extrabold text-white drop-shadow-lg text-center">
              Post
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

        {isLoadingPost ? (
          <Card className="backdrop-blur-md bg-gray-800/50 border-gray-700/50 shadow-xl mb-8">
            <CardContent className="p-6">
              <div className="space-y-4">
                <Skeleton className="h-8 w-3/4 bg-white/20" />
                <Skeleton className="h-4 w-full bg-white/20" />
                <Skeleton className="h-4 w-2/3 bg-white/20" />
              </div>
            </CardContent>
          </Card>
        ) : post ? (
          <Card className="backdrop-blur-md bg-gray-800/50 border-gray-700/50 shadow-xl mb-8">
            <CardContent className="p-6">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-white">{post.title}</h2>
                <p className="text-gray-300 text-lg">{post.body}</p>
              </div>
            </CardContent>
          </Card>
        ) : null}

        <Card className="backdrop-blur-md bg-gray-800/50 border-gray-700/50 shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-white">Comments</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoadingComments ? (
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-6 w-3/4 bg-white/20" />
                    <Skeleton className="h-4 w-full bg-white/20" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {comments?.map((comment: any) => (
                  <Card key={comment.id} className="backdrop-blur-md bg-gray-800/50 border-gray-700/50 shadow-xl">
                    <CardContent className="p-4">
                      <div className="space-y-2">
                        <h3 className="text-lg font-semibold text-white">{comment.name}</h3>
                        <p className="text-gray-300">{comment.body}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}