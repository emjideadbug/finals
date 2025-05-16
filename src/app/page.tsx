import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex flex-col items-center justify-center p-4">
      <Card className="backdrop-blur-md bg-gray-800/50 border-gray-700/50 shadow-2xl w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-4xl font-extrabold text-white drop-shadow-lg text-center">
            Dynamic Web Application
          </CardTitle>
          <p className="text-sm text-gray-400 text-center mt-2">
            Built with Next.js and Tailwind CSS
          </p>  
        </CardHeader>
        <CardContent>
          <p className="text-lg text-gray-300 mb-8 text-center">
            Explore users, posts, and analytics.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-lg font-semibold shadow-lg transition-all duration-300">
              <Link href="/users">Users</Link>
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
    </main>
  );
}