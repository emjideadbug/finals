import { NextResponse } from 'next/server';
import customData from '@/data/customData.json';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  // Function to get author information
  const getAuthorInfo = (postUserId: number) => {
    const author = customData.users.find(user => user.id === postUserId);
    return author ? {
      id: author.id,
      name: author.name,
      username: author.username
    } : null;
  };

  // Function to get comments for a post
  const getPostComments = (postId: number) => {
    return customData.comments.filter(comment => comment.postId === postId);
  };

  if (userId) {
    const filteredPosts = customData.posts
      .filter(post => post.userId === parseInt(userId))
      .map(post => ({
        ...post,
        author: getAuthorInfo(post.userId),
        comments: getPostComments(post.id)
      }));
    return NextResponse.json(filteredPosts);
  }

  const postsWithAuthorsAndComments = customData.posts.map(post => ({
    ...post,
    author: getAuthorInfo(post.userId),
    comments: getPostComments(post.id)
  }));

  return NextResponse.json(postsWithAuthorsAndComments);
} 