'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { Card } from "@/components/ui/card";

export default function PostDetailsPage() {
  const { id } = useParams();

  const { data: post, isLoading: postLoading } = useQuery({
    queryKey: ['post', id],
    queryFn: () => fetch(`https://jsonplaceholder.typicode.com/posts/${id}`).then(res => res.json()),
  });

  const { data: comments, isLoading: commentsLoading } = useQuery({
    queryKey: ['comments', id],
    queryFn: () => fetch(`https://jsonplaceholder.typicode.com/comments?postId=${id}`).then(res => res.json()),
  });

  if (postLoading || commentsLoading) return <div className="text-white">Loading...</div>;
  if (!post) return <div className="text-red-400">Post not found</div>;

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="bg-white/10 border-white/20 mb-6">
        <div className="p-6">
          <h1 className="text-3xl font-bold text-white mb-2">{post.title}</h1>
          <div className="text-gray-200">{post.body}</div>
        </div>
      </Card>
      <h2 className="text-2xl font-semibold text-white mb-4">Comments</h2>
      <div className="grid gap-4">
        {comments.map((comment: any) => (
          <Card key={comment.id} className="bg-white/10 border-white/20">
            <div className="p-4">
              <div className="font-semibold text-white">{comment.name} <span className="text-gray-400">({comment.email})</span></div>
              <div className="text-gray-200">{comment.body}</div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}