import { NextResponse } from 'next/server';
import { dbConnect } from '@/dbconfig/dbConfig';
import { decryptComment, IComment, Comment } from '@/models/comment';

const TIMEOUT_DURATION = 5000; // 5 seconds

export async function POST(request: Request) {
  let timeoutId: NodeJS.Timeout | undefined = undefined;
  let isTimeout = false;
  
  try {
    // Set up timeout
    const timeoutPromise = new Promise((_, reject) => {
      timeoutId = setTimeout(() => {
        isTimeout = true;
        reject(new Error('Database operation timed out'));
      }, TIMEOUT_DURATION);
    });

    // Connect to database with timeout
    await Promise.race([
      dbConnect(),
      timeoutPromise
    ]);

    const body = await request.json();
    const { name, instagram, twitter, facebook, comment } = body as IComment;
   
    if (!name?.trim() || !comment?.trim()) {
      if (timeoutId) clearTimeout(timeoutId);
      return NextResponse.json(
        { error: 'Name and comment are required' },
        { status: 400 }
      );
    }

    // Create comment with timeout
    const commentPromise = Comment.create({
      name: name.trim(),
      instagram: instagram?.trim(),
      twitter: twitter?.trim(),
      facebook: facebook?.trim(),
      comment: comment.trim()
    });

    const newComment = await Promise.race([
      commentPromise,
      timeoutPromise
    ]);

    const decryptedComment = decryptComment(newComment);
    if (timeoutId) clearTimeout(timeoutId);
    return NextResponse.json({ data: decryptedComment }, { status: 201 });
  } catch (error) {
    if (timeoutId) clearTimeout(timeoutId);
    console.error('Error creating comment:', error);
    
    if (isTimeout) {
      return NextResponse.json(
        { error: 'Request timed out. Please try again.' },
        { status: 408 }
      );
    }

    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Failed to create comment'
      },
      { status: 500 }
    );
  }
}