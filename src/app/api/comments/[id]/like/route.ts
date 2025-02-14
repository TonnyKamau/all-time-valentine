import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '@/dbconfig/dbConfig';
import { Comment, decryptComment } from '@/models/comment';
import { headers } from 'next/headers';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    
    const commentId = (await params).id;
    const headersList = headers();
    const userIp = (await headersList).get('x-forwarded-for') || 'unknown';

    // Use findById first to check existence
    const comment = await Comment.findById(commentId);
    
    if (!comment) {
      return NextResponse.json(
        { error: 'Comment not found' },
        { status: 404 }
      );
    }

    // Check if already liked
    if (comment.likedBy.includes(userIp)) {
      return NextResponse.json(
        { error: 'Already liked this comment' },
        { status: 400 }
      );
    }

    // Update with optimized query
    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      {
        $inc: { likes: 1 },
        $push: { likedBy: userIp }
      },
      {
        new: true,
        runValidators: true
      }
    );

    const decryptedComment = decryptComment(updatedComment);
    
    return NextResponse.json(
      {
        data: {
          ...decryptedComment,
          hasLiked: true
        }
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error liking comment:', error);
    return NextResponse.json(
      { error: 'Failed to like comment' },
      { status: 500 }
    );
  }
}