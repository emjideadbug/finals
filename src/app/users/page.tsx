'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { User } from '@/types';

export default function UsersPage() {
  const { data: users, isLoading, error } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: () => fetch('/api/users').then(res => res.json()),
  });

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black p-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center text-red-500">
            <h1 className="text-2xl font-bold mb-4">Error Loading Users</h1>
            <p>Please try again later.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Users</h1>
          <Link href="/users/create">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
              Add New User
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="backdrop-blur-md bg-gray-800/50 border-gray-700/50 shadow-xl">
                <CardHeader>
                  <Skeleton className="h-6 w-3/4 bg-white/20" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full bg-white/20 mb-2" />
                  <Skeleton className="h-4 w-2/3 bg-white/20" />
                </CardContent>
              </Card>
            ))
          ) : (
            users?.map((user) => (
              <Link href={`/users/${user.id}`} key={user.id}>
                <Card className="backdrop-blur-md bg-gray-800/50 border-gray-700/50 shadow-xl hover:bg-gray-800/70 transition-colors cursor-pointer">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-white">{user.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300">@{user.username}</p>
                    <p className="text-gray-400 text-sm mt-2">{user.email}</p>
                  </CardContent>
                </Card>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}