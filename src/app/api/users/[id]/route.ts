import { NextResponse } from 'next/server';
import customData from '@/data/customData.json';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const user = customData.users.find(user => user.id === parseInt(params.id));
  
  if (!user) {
    return new NextResponse('User not found', { status: 404 });
  }

  return NextResponse.json(user);
} 