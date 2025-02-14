import { NextResponse } from 'next/server';
import { dbConnect } from '@/dbconfig/dbConfig';
import { decryptComment, IComment, Comment } from '@/models/comment';


export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    const { name, instagram, twitter, facebook, comment } = body as IComment;
    
    if (!name || !comment) {
      return NextResponse.json(
        { error: 'Name and comment are required' },
        { status: 400 }
      );
    }

    const newComment = await Comment.create({
      name,
      instagram,
      twitter,
      facebook,
      comment
    });

    const decryptedComment = decryptComment(newComment);
    return NextResponse.json({ data: decryptedComment }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: 'Failed to create comment' },
      { status: 500 }
    );
  }
}