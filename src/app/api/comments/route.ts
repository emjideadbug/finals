import { NextResponse } from 'next/server';
import customData from '@/data/customData.json';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const postId = searchParams.get('postId');

  if (postId) {
    const filteredComments = customData.comments.filter(comment => comment.postId === parseInt(postId));
    return NextResponse.json(filteredComments);
  }

  return NextResponse.json(customData.comments);
} 