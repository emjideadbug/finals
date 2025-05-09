import { NextResponse } from 'next/server';
import customData from '@/data/customData.json';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const post = customData.posts.find(post => post.id === parseInt(params.id));
  
  if (!post) {
    return new NextResponse('Post not found', { status: 404 });
  }

  return NextResponse.json(post);
} 