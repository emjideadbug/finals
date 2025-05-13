import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`);
  
  if (!response.ok) {
    return new NextResponse('Post not found', { status: 404 });
  }

  const post = await response.json();
  return NextResponse.json(post);
} 