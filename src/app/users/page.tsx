'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from '@tanstack/react-query';

export default function UsersPage() {
  const { data: users, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: () => fetch('/api/users').then(res => res.json()),
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black p-4">
        <div className="max-w-2xl mx-auto">
          <Card className="backdrop-blur-md bg-gray-800/50 border-gray-700/50 shadow-2xl">
            <CardContent className="p-6">
              <p className="text-gray-300 text-center">Loading users...</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (error) {
  return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black p-4">
    <div className="max-w-2xl mx-auto">
          <Card className="backdrop-blur-md bg-gray-800/50 border-gray-700/50 shadow-2xl">
            <CardContent className="p-6">
              <p className="text-red-400 text-center">Failed to load users.</p>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center">
              {users.map((user: any) => (
                <Card key={user.id} className="bg-gray-800/50 border-gray-700/50 shadow-lg w-full max-w-sm">
                  <CardContent className="p-4">
                    <h2 className="text-xl font-bold text-white">{user.name}</h2>
                    <p className="text-gray-300">Email: {user.email}</p>
                    <p className="text-gray-300">Phone: {user.phone}</p>
                    {user.address && (
                      <div className="mt-2">
                        <p className="text-gray-300">Country: {user.address.country}</p>
                        <p className="text-gray-300">Province: {user.address.province}</p>
                        <p className="text-gray-300">Municipality: {user.address.municipality}</p>
                        <p className="text-gray-300">Barangay: {user.address.barangay}</p>
                      </div>
                    )}
                    <div className="mt-4">
                      <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
                        <Link href={`/users/${user.id}`}>View Profile</Link>
                      </Button>
                    </div>
                  </CardContent>
          </Card>
        ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}