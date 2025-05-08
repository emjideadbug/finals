import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

<nav>
  <Link href="/users">Users</Link>
  <Link href="/posts">Posts</Link>
  <Link href="/dashboard">Dashboard</Link>
</nav>
export default function Home() {
  return (
    <main className="min-h-[60vh] flex flex-col items-center justify-center">
      <Card className="backdrop-blur-md bg-white/10 border-white/20 shadow-2xl w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-4xl font-extrabold text-white drop-shadow-lg">
            Welcome to the App!
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg text-gray-200 mb-8">
            Explore users, posts, and analytics with a beautiful, modern interface.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-lg font-semibold shadow-lg">
              <Link href="/users">Users</Link>
            </Button>
            <Button asChild className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-lg font-semibold shadow-lg">
              <Link href="/posts">Posts</Link>
            </Button>
            <Button asChild className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-lg font-semibold shadow-lg">
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}