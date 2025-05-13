import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/users/${params.id}`);
  
  if (!response.ok) {
    return new NextResponse('User not found', { status: 404 });
  }

  const user = await response.json();
  return NextResponse.json(user);
} 