import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const postId = searchParams.get('postId');

    let url = 'https://jsonplaceholder.typicode.com/comments';
    if (postId) {
      url += `?postId=${postId}`;
    }

    const response = await fetch(url, {
      next: { revalidate: 60 }, // Cache for 60 seconds
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      return new NextResponse('Failed to fetch comments', { status: response.status });
    }

    const comments = await response.json();
    return NextResponse.json(comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    return new NextResponse(
      JSON.stringify({ error: 'Failed to fetch comments' }),
      { status: 500 }
    );
  }
}