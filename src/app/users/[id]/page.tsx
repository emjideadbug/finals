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

  const { data: posts } = useQuery({
    queryKey: ['posts'],
    queryFn: () => fetch('/api/posts').then(res => res.json()),
  });

  const getMapUrl = (address: any) => {
    if (!address) return '';
    const query = encodeURIComponent(
      `${address.street}, ${address.suite}, ${address.city}, ${address.zipcode}`
    );
    return `https://www.google.com/maps?q=${query}&output=embed`;
  };

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

  // Filter posts for this user
  const userPosts = posts?.filter((post: any) => post.userId === parseInt(userId as string)) || [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black p-4">
      <div className="max-w-2xl mx-auto">
        <Card className="backdrop-blur-md bg-gray-800/50 border-gray-700/50 shadow-2xl">
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
                <p className="text-gray-300"><span className="font-semibold">Username:</span> {user.username}</p>
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
                    <div className="mt-4">
                      <h4 className="text-lg font-semibold text-white mb-2">Location</h4>
                      <div className="w-full h-64 rounded-lg overflow-hidden">
                        <iframe
                          src={getMapUrl(user.address)}
                          width="100%"
                          height="100%"
                          style={{ border: 0 }}
                          allowFullScreen
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                        />
                      </div>
                    </div>
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

                {/* User's Posts Section */}
                <div className="mt-8">
                  <h3 className="text-xl font-semibold text-white mb-4">Posts by {user.name}</h3>
                  {userPosts.length > 0 ? (
                    <div className="space-y-4">
                      {userPosts.map((post: any) => (
                        <Card key={post.id} className="backdrop-blur-md bg-gray-800/50 border-gray-700/50 hover:shadow-xl transition-all duration-300">
                          <CardContent className="p-4">
                            <h4 className="text-lg font-semibold text-white mb-2">{post.title}</h4>
                            <p className="text-gray-300 mb-4">{post.body}</p>
                            <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
                              <Link href={`/posts/${post.id}`}>Read More</Link>
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-400 text-center">No posts found</p>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}