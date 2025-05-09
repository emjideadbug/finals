'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function UsersPage() {
  const { data: users, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: () => fetch('/api/users').then(res => res.json()),
  });

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black p-4">
        <div className="max-w-4xl mx-auto">
          <Card className="backdrop-blur-md bg-gray-800/50 border-gray-700/50 shadow-2xl">
            <CardContent className="p-6">
              <div className="text-red-400 text-center">
                Error loading users. Please try again later.
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
              Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-lg font-semibold shadow-lg transition-all duration-300">
                <Link href="/">Home</Link>
              </Button>
              <Button asChild className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-lg font-semibold shadow-lg transition-all duration-300">
                <Link href="/posts">Posts</Link>
              </Button>
              <Button asChild className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-lg font-semibold shadow-lg transition-all duration-300">
                <Link href="/dashboard">Dashboard</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {isLoading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <Card key={i} className="backdrop-blur-md bg-gray-800/50 border-gray-700/50 shadow-xl">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <Skeleton className="h-8 w-3/4 bg-white/20" />
                    <Skeleton className="h-4 w-1/2 bg-white/20" />
                    <Skeleton className="h-4 w-2/3 bg-white/20" />
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            users?.map((user: any) => (
              <Card key={user.id} className="backdrop-blur-md bg-gray-800/50 border-gray-700/50 shadow-xl hover:shadow-2xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h2 className="text-2xl font-bold text-white">{user.name}</h2>
                      <p className="text-gray-300">@{user.username}</p>
                    </div>
                    <div>
                      <p className="text-gray-300">Email: {user.email}</p>
                      <p className="text-gray-300">Phone: {user.phone}</p>
                    </div>
                    <div>
                      <p className="text-gray-300">
                        {user.address.street}, {user.address.suite}, {user.address.city}
                      </p>
                    </div>
                    <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
                      <Link href={`/users/${user.id}`}>View Profile</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}