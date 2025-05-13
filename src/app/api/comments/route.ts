import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const postId = searchParams.get('postId');

  const response = await fetch('https://jsonplaceholder.typicode.com/comments');
  let comments = await response.json();

  if (postId) {
    comments = comments.filter(comment => comment.postId === parseInt(postId));
  }

  return NextResponse.json(comments);
} 