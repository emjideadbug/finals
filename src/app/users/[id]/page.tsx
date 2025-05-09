'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { use } from 'react';

export default function UserDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { data: userData, isLoading: isLoadingUser, error: userError } = useQuery({
    queryKey: ['user', resolvedParams.id],
    queryFn: () => fetch(`https://jsonplaceholder.typicode.com/users/${resolvedParams.id}`).then(res => res.json()),
  });

  const { data: postsData, isLoading: isLoadingPosts } = useQuery({
    queryKey: ['user-posts', resolvedParams.id],
    queryFn: () => fetch(`https://jsonplaceholder.typicode.com/posts?userId=${resolvedParams.id}`).then(res => res.json()),
  });

  if (userError) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black p-4">
        <div className="max-w-2xl mx-auto">
          <Card className="backdrop-blur-md bg-gray-800/50 border-gray-700/50 shadow-2xl">
            <CardContent className="p-6">
              <div className="text-red-400 text-center">
                Error loading user data. Please try again later.
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const formatAddress = (address: any) => {
    if (!address) return 'No address available';
    
    // Handle new format (Barangay, Municipality)
    if (address.street.includes(',')) {
      const [barangay, municipality] = address.street.split(',');
      return `${barangay.trim()}, ${municipality.trim()}, ${address.suite}, ${address.city}`;
    }
    
    // Handle old format
    return `${address.street}, ${address.suite}, ${address.city}`;
  };

  const getMapUrl = (address: any) => {
    if (!address) return '';
    const query = encodeURIComponent(formatAddress(address));
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      console.warn('Google Maps API key is not configured');
      return '';
    }
    return `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${query}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black p-4">
      <div className="max-w-2xl mx-auto">
        <Card className="backdrop-blur-md bg-gray-800/50 border-gray-700/50 shadow-2xl mb-8">
          <CardHeader>
            <CardTitle className="text-4xl font-extrabold text-white drop-shadow-lg text-center">
              User Profile
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-lg font-semibold shadow-lg transition-all duration-300">
                <Link href="/">Home</Link>
              </Button>
              <Button asChild className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-lg font-semibold shadow-lg transition-all duration-300">
                <Link href="/users">Users</Link>
              </Button>
              <Button asChild className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-lg font-semibold shadow-lg transition-all duration-300">
                <Link href="/dashboard">Dashboard</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {isLoadingUser ? (
          <Card className="backdrop-blur-md bg-gray-800/50 border-gray-700/50 shadow-xl mb-8">
            <CardContent className="p-6">
              <div className="space-y-4">
                <Skeleton className="h-8 w-3/4 bg-white/20" />
                <Skeleton className="h-4 w-1/2 bg-white/20" />
                <Skeleton className="h-4 w-2/3 bg-white/20" />
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="backdrop-blur-md bg-gray-800/50 border-gray-700/50 shadow-xl mb-8">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <h2 className="text-2xl font-bold text-white">{userData.name}</h2>
                  <p className="text-gray-300">@{userData.username}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Contact Information</h3>
                  <p className="text-gray-300">Email: {userData.email}</p>
                  <p className="text-gray-300">Phone: {userData.phone}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Address</h3>
                  <p className="text-gray-300">
                    {userData.address && (
                      <>
                        Barangay: {userData.address.street.split(',')[0]}<br />
                        Municipality: {userData.address.street.split(',')[1]}<br />
                        Province: {userData.address.suite}<br />
                        Country: {userData.address.city}
                      </>
                    )}
                  </p>
                </div>
                {userData.address && (
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold text-white mb-2">Location</h3>
                    <div className="w-full h-64 rounded-lg overflow-hidden">
                      <iframe
                        src={getMapUrl(userData.address)}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      />
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        <Card className="backdrop-blur-md bg-gray-800/50 border-gray-700/50 shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-white">Posts</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoadingPosts ? (
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-6 w-3/4 bg-white/20" />
                    <Skeleton className="h-4 w-full bg-white/20" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {postsData.map((post: any) => (
                  <Card key={post.id} className="backdrop-blur-md bg-gray-800/50 border-gray-700/50 shadow-xl">
                    <CardContent className="p-4">
                      <h3 className="text-xl font-semibold text-white mb-2">{post.title}</h3>
                      <p className="text-gray-300">{post.body}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}