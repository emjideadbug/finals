'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { Card } from "@/components/ui/card";

export default function UsersPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: () => fetch('https://jsonplaceholder.typicode.com/users').then(res => res.json()),
  });

  if (isLoading) return <div className="text-white">Loading users...</div>;
  if (error) return <div className="text-red-400">Error loading users</div>;

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-6">Users</h1>
      <div className="grid gap-4">
        {data.map((user: any) => (
          <Card key={user.id} className="bg-white/10 border-white/20 hover:bg-white/20 transition">
            <Link href={`/users/${user.id}`} className="block p-4">
              <div className="text-xl font-semibold text-white">{user.name}</div>
              <div className="text-gray-300">@{user.username}</div>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}