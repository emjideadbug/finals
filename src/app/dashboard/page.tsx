'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';

// Dynamically import ApexCharts to avoid SSR issues
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface User {
  id: number;
  name: string;
  address: {
    street: string;
    suite: string;
    city: string;
  };
}

interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

interface UserPost {
  name: string;
  posts: number;
}

export default function DashboardPage() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      const [users, posts] = await Promise.all([
        fetch('https://jsonplaceholder.typicode.com/users').then(res => res.json()),
        fetch('https://jsonplaceholder.typicode.com/posts').then(res => res.json())
      ]);

      // Calculate posts per user
      const postsPerUser = users.map((user: User) => {
        const userPosts = posts.filter((post: Post) => post.userId === user.id);
        return {
          name: user.name,
          posts: userPosts.length
        };
      }).sort((a: UserPost, b: UserPost) => b.posts - a.posts).slice(0, 5);

      return {
        totalUsers: users.length,
        totalPosts: posts.length,
        averagePostsPerUser: posts.length / users.length,
        topUsers: postsPerUser
      };
    },
    staleTime: 0, // Always consider data stale
    refetchInterval: 5000, // Refetch every 5 seconds
    refetchIntervalInBackground: true // Continue refetching even when tab is not active
  });

  const chartOptions: ApexOptions = {
    chart: {
      type: 'bar',
      toolbar: {
        show: false
      },
      background: 'transparent'
    },
    theme: {
      mode: 'dark'
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: true,
      }
    },
    dataLabels: {
      enabled: false
    },
    xaxis: {
      categories: stats?.topUsers.map((user: UserPost) => user.name) || [],
      labels: {
        style: {
          colors: '#fff'
        }
      }
    },
    yaxis: {
      labels: {
        style: {
          colors: '#fff'
        }
      }
    },
    grid: {
      borderColor: '#404040'
    }
  };

  const chartSeries = [{
    name: 'Posts',
    data: stats?.topUsers.map((user: UserPost) => user.posts) || []
  }];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black p-4">
      <div className="max-w-4xl mx-auto">
        <Card className="backdrop-blur-md bg-gray-800/50 border-gray-700/50 shadow-2xl mb-8">
          <CardHeader>
            <CardTitle className="text-4xl font-extrabold text-white drop-shadow-lg text-center">
              Dashboard
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
                <Link href="/posts">Posts</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {isLoading ? (
          <div className="grid gap-4 md:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <Card key={i} className="backdrop-blur-md bg-gray-800/50 border-gray-700/50 shadow-xl">
                <CardContent className="p-6">
                  <Skeleton className="h-8 w-3/4 bg-white/20 mb-2" />
                  <Skeleton className="h-4 w-1/2 bg-white/20" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <>
            <div className="grid gap-4 md:grid-cols-3 mb-8">
              <Card className="backdrop-blur-md bg-gray-800/50 border-gray-700/50 shadow-xl">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-2">Total Users</h3>
                  <p className="text-3xl font-bold text-blue-400">{stats?.totalUsers}</p>
                </CardContent>
              </Card>
              <Card className="backdrop-blur-md bg-gray-800/50 border-gray-700/50 shadow-xl">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-2">Total Posts</h3>
                  <p className="text-3xl font-bold text-green-400">{stats?.totalPosts}</p>
                </CardContent>
              </Card>
              <Card className="backdrop-blur-md bg-gray-800/50 border-gray-700/50 shadow-xl">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-2">Avg Posts/User</h3>
                  <p className="text-3xl font-bold text-purple-400">
                    {stats?.averagePostsPerUser.toFixed(1)}
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card className="backdrop-blur-md bg-gray-800/50 border-gray-700/50 shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-white">Top 5 Users by Post Count</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  {typeof window !== 'undefined' && (
                    <Chart
                      options={chartOptions}
                      series={chartSeries}
                      type="bar"
                      height="100%"
                    />
                  )}
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}