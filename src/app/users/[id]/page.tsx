'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from 'next/link';

export default function UserProfilePage() {
  const params = useParams();
  const userId = params.id;

  const { data: user, isLoading, error } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetch(`/api/users/${userId}`).then(res => res.json()),
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black p-4">
        <div className="max-w-2xl mx-auto">
          <Card className="backdrop-blur-md bg-gray-800/50 border-gray-700/50 shadow-2xl">
            <CardContent className="p-6">
              <p className="text-gray-300 text-center">Loading user profile...</p>
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
              <p className="text-red-400 text-center">Failed to load user profile.</p>
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
              User Profile
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
            <div className="bg-gray-800/50 rounded-lg p-6 shadow-lg">
              <h2 className="text-2xl font-bold text-white mb-4">{user.name}</h2>
              <div className="space-y-4">
                <p className="text-gray-300"><span className="font-semibold">Email:</span> {user.email}</p>
                <p className="text-gray-300"><span className="font-semibold">Phone:</span> {user.phone}</p>
                <p className="text-gray-300"><span className="font-semibold">Website:</span> {user.website}</p>
                {user.address && (
                  <div className="mt-4">
                    <h3 className="text-xl font-semibold text-white mb-2">Address</h3>
                    <p className="text-gray-300"><span className="font-semibold">Street:</span> {user.address.street}</p>
                    <p className="text-gray-300"><span className="font-semibold">Suite:</span> {user.address.suite}</p>
                    <p className="text-gray-300"><span className="font-semibold">City:</span> {user.address.city}</p>
                    <p className="text-gray-300"><span className="font-semibold">Zipcode:</span> {user.address.zipcode}</p>
                  </div>
                )}
                {user.company && (
                  <div className="mt-4">
                    <h3 className="text-xl font-semibold text-white mb-2">Company</h3>
                    <p className="text-gray-300"><span className="font-semibold">Name:</span> {user.company.name}</p>
                    <p className="text-gray-300"><span className="font-semibold">Catch Phrase:</span> {user.company.catchPhrase}</p>
                    <p className="text-gray-300"><span className="font-semibold">Business:</span> {user.company.bs}</p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}