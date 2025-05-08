'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { Card } from "@/components/ui/card";

export default function PostsPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['posts'],
    queryFn: () => fetch('https://jsonplaceholder.typicode.com/posts').then(res => res.json()),
  });

  if (isLoading) return <div className="text-white">Loading posts...</div>;
  if (error) return <div className="text-red-400">Error loading posts</div>;

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-6">Posts</h1>
      <div className="grid gap-4">
        {data.map((post: any) => (
          <Card key={post.id} className="bg-white/10 border-white/20 hover:bg-white/20 transition">
            <Link href={`/posts/${post.id}`} className="block p-4">
              <div className="text-lg font-semibold text-white">{post.title}</div>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}