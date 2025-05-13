import { NextResponse } from 'next/server';

const fetchWithRetry = async (url: string, retries = 3) => {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, {
        next: { revalidate: 60 }, // Cache for 60 seconds
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return response;
    } catch (error) {
      if (i === retries - 1) throw error;
      // Wait for 1 second before retrying
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
};

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    const response = await fetchWithRetry('https://jsonplaceholder.typicode.com/posts');
    let posts = await response.json();

    if (userId) {
      posts = posts.filter((post: any) => post.userId === parseInt(userId));
    }

    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return new NextResponse(
      JSON.stringify({ error: 'Failed to fetch posts' }), 
      { status: 500 }
    );
  }
} 