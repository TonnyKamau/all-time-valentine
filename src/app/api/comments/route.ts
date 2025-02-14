import { NextResponse } from 'next/server';
import { dbConnect } from '@/dbconfig/dbConfig';
import { Comment, decryptComment } from '@/models/comment';
dbConnect();

export async function GET() {
  try {

    const comments = await Comment.find().sort({ createdAt: -1 });
    const decryptedComments = comments.map(decryptComment);
    return NextResponse.json({ data: decryptedComments }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch comments' },
      { status: 500 }
    );
  }
}
