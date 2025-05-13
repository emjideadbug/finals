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

  const { data: author } = useQuery({
    queryKey: ['user', post?.userId],
    queryFn: () => fetch(`/api/users/${post?.userId}`).then(res => res.json()),
    enabled: !!post?.userId,
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
              Post Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button asChild className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-lg font-semibold shadow-lg transition-all duration-300">
                <Link href="/">Home</Link>
              </Button>
              <Button asChild className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-lg font-semibold shadow-lg transition-all duration-300">
                <Link href="/users">Users</Link>
              </Button>
              <Button asChild className="w-full sm:w-auto bg-yellow-600 hover:bg-yellow-700 text-lg font-semibold shadow-lg transition-all duration-300">
                <Link href="/posts">Posts</Link>
              </Button>
              <Button asChild className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-lg font-semibold shadow-lg transition-all duration-300">
                <Link href="/dashboard">Dashboard</Link>
              </Button>
            </div>

            {isLoadingPost ? (
              <div className="space-y-4">
                <Skeleton className="h-8 w-3/4 bg-white/20" />
                <Skeleton className="h-4 w-full bg-white/20" />
              </div>
            ) : post ? (
              <div className="bg-gray-800/50 rounded-lg p-6 shadow-lg mb-8">
                {author && (
                  <div className="flex items-center gap-2 mb-4 bg-gray-700/30 p-2 rounded-lg">
                    <span className="text-sm text-gray-300">Posted by:</span>
                    <Link href={`/users/${author.id}`} className="text-sm font-semibold text-blue-400 hover:text-blue-300">
                      {author.name}
                    </Link>
                  </div>
                )}
                <h2 className="text-2xl font-bold text-white mb-4">{post.title}</h2>
                <p className="text-gray-300">{post.body}</p>
              </div>
            ) : null}

            <div className="mt-8">
              <h3 className="text-2xl font-bold text-white mb-4">Comments</h3>
              {isLoadingComments ? (
                <div className="space-y-4">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <Card key={i} className="backdrop-blur-md bg-gray-800/50 border-gray-700/50 shadow-xl">
                      <CardContent className="p-4">
                        <Skeleton className="h-4 w-1/4 bg-white/20 mb-2" />
                        <Skeleton className="h-4 w-full bg-white/20" />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : comments?.length > 0 ? (
                <div className="space-y-4">
                  {comments.map((comment: any) => (
                    <Card key={comment.id} className="backdrop-blur-md bg-gray-800/50 border-gray-700/50 shadow-xl">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-sm text-gray-300">By:</span>
                          <span className="text-sm font-semibold text-blue-400">{comment.name}</span>
                          <span className="text-sm text-gray-400">({comment.email})</span>
                        </div>
                        <p className="text-gray-300">{comment.body}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 text-center">No comments found</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}