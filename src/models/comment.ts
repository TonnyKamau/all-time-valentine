import mongoose, { Schema, Document } from 'mongoose';
import { decryptField, encryptField } from '@/lib/encryption';

// Define the base interface for a comment
interface IComment {
  name: string;
  instagram?: string;
  twitter?: string;
  facebook?: string;
  comment: string;
  createdAt: Date;
}

// Define the document interface extending both IComment and Document
interface ICommentDocument extends IComment, Document {
  updatedAt: Date;
}

// Helper function to decrypt a comment object
export function decryptComment(comment: ICommentDocument) {
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
  instagram: { type: String, required: false },
  twitter: { type: String, required: false },
  facebook: { type: String, required: false },
  comment: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
  }
}, {
  timestamps: true // This will handle both createdAt and updatedAt
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

// Export interfaces for use in other files
export type { IComment, ICommentDocument };