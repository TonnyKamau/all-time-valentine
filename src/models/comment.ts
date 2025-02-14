import mongoose, { Schema, Document } from 'mongoose';
import { decryptField, encryptField } from '@/lib/encryption';

interface IComment {
  name: string;
  instagram?: string;
  twitter?: string;
  facebook?: string;
  comment: string;
  likes: number;
  likedBy: string[];
  createdAt: Date;
}

interface ICommentDocument extends IComment, Document {
  updatedAt: Date;
}

export function decryptComment(comment: ICommentDocument) {
  return {
    ...comment.toObject(),
    name: decryptField(comment.name),
    instagram: comment.instagram ? decryptField(comment.instagram) : "",
    twitter: comment.twitter ? decryptField(comment.twitter) : "",
    facebook: comment.facebook ? decryptField(comment.facebook) : "",
    comment: decryptField(comment.comment),
    likes: comment.likes || 0,
    likedBy: comment.likedBy || []
  };
}

const CommentSchema = new Schema<ICommentDocument>({
  name: { type: String, required: true },
  instagram: { type: String, required: false },
  twitter: { type: String, required: false },
  facebook: { type: String, required: false },
  comment: { type: String, required: true },
  likes: { type: Number, default: 0, required: true },
  likedBy: { type: [String], default: [], required: true },
  createdAt: {
    type: Date,
    default: Date.now,
  }
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

// Create and export the model
export const Comment = mongoose.models.comments || mongoose.model<ICommentDocument>('comments', CommentSchema);
export type { IComment, ICommentDocument };