import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Await the params object
    const resolvedParams = await params;

    // Fetch the user data
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${resolvedParams.id}`);

    if (!response.ok) {
      return new NextResponse('User not found', { status: 404 });
    }

    const user = await response.json();

    return NextResponse.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    return new NextResponse(
      JSON.stringify({ error: 'Failed to fetch user' }),
      { status: 500 }
    );
  }
}