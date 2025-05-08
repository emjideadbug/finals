'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import GoogleMapEmbed from '@/components/GoogleMapEmbed';
import { Card } from "@/components/ui/card";

export default function UserProfilePage() {
  const { id } = useParams();

  const { data: user, isLoading: userLoading } = useQuery({
    queryKey: ['user', id],
    queryFn: () => fetch(`https://jsonplaceholder.typicode.com/users/${id}`).then(res => res.json()),
  });

  const { data: posts, isLoading: postsLoading } = useQuery({
    queryKey: ['posts', id],
    queryFn: () => fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`).then(res => res.json()),
  });

  if (userLoading || postsLoading) return <div className="text-white">Loading...</div>;
  if (!user) return <div className="text-red-400">User not found</div>;

  const address = `${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`;

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="bg-white/10 border-white/20 mb-6">
        <div className="p-6">
          <h1 className="text-3xl font-bold text-white mb-2">{user.name} <span className="text-gray-300">({user.username})</span></h1>
          <div className="text-gray-200 mb-2">Email: {user.email}</div>
          <div className="text-gray-200 mb-2">Address: {address}</div>
        </div>
        <GoogleMapEmbed address={address} />
      </Card>
      <h2 className="text-2xl font-semibold text-white mb-4">Posts</h2>
      <div className="grid gap-4">
        {posts.map((post: any) => (
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