import { NextResponse } from 'next/server';
import customData from '@/data/customData.json';
 
export async function GET() {
  return NextResponse.json(customData.users);
} 