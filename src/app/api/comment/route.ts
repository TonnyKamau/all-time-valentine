import { dbConnect } from '@/dbconfig/dbConfig';
import mongoose, { Schema, Document } from 'mongoose';
import { decryptField, encryptField } from '@/lib/encryption';
import { NextResponse } from 'next/server';

interface IComment {
  name: string;
  instagram?: string;
  twitter?: string;
  facebook?: string;
  comment: string;
}

// Define the document interface extending both IComment and Document
interface ICommentDocument extends IComment, Document {
  createdAt: Date;
  updatedAt: Date;
}

// Helper function to decrypt a comment object with proper typing
function decryptComment(comment: ICommentDocument) {
  return {
    ...comment.toObject(),
    name: decryptField(comment.name),
    instagram: comment.instagram ? decryptField(comment.instagram) : "",
    twitter: comment.twitter ? decryptField(comment.twitter) : "",
    facebook: comment.facebook ? decryptField(comment.facebook) : "",
    comment: decryptField(comment.comment)
  };
}

// Define the schema
const CommentSchema = new Schema<ICommentDocument>({
  name: { type: String, required: true },
  instagram: { type: String },
  twitter: { type: String },
  facebook: { type: String },
  comment: { type: String, required: true }
}, {
  timestamps: true
});

// Add middleware to encrypt fields before saving
CommentSchema.pre('save', function(next) {
  if (this.isModified('name')) {
    this.name = encryptField(this.name);
  }
  if (this.isModified('instagram') && this.instagram) {
    this.instagram = encryptField(this.instagram);
  }
  if (this.isModified('twitter') && this.twitter) {
    this.twitter = encryptField(this.twitter);
  }
  if (this.isModified('facebook') && this.facebook) {
    this.facebook = encryptField(this.facebook);
  }
  if (this.isModified('comment')) {
    this.comment = encryptField(this.comment);
  }
  next();
});

// Get the model, or create it if it doesn't exist
const Comment = mongoose.models.Comment || mongoose.model<ICommentDocument>('Comment', CommentSchema);

export async function GET() {
  try {
    await dbConnect();
    const comments = await Comment.find().sort({ createdAt: -1 });
    // Decrypt all comments before sending
    const decryptedComments = comments.map(decryptComment);
    return NextResponse.json({ data: decryptedComments }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch comments' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    const { name, instagram, twitter, facebook, comment } = body as IComment;

    // Validate required fields
    if (!name || !comment) {
      return NextResponse.json(
        { error: 'Name and comment are required' },
        { status: 400 }
      );
    }

    // Create new comment (encryption happens in the pre-save middleware)
    const newComment = await Comment.create({
      name,
      instagram,
      twitter,
      facebook,
      comment
    });

    // Decrypt before sending response
    const decryptedComment = decryptComment(newComment);
    return NextResponse.json({ data: decryptedComment }, { status: 201 });
  } catch  {
    return NextResponse.json(
      { error: 'Failed to create comment' },
      { status: 500 }
    );
  }
}