
import { dbConnect } from '@/dbconfig/dbConfig';
import { Comment } from '@/models/comment';

async function migrateLikes() {
  try {
    await dbConnect();
    
    // Find all comments without likes or likedBy fields
    const commentsToUpdate = await Comment.find({
      $or: [
        { likes: { $exists: false } },
        { likedBy: { $exists: false } }
      ]
    });

    console.log(`Found ${commentsToUpdate.length} comments to update`);

    // Update each comment
    for (const comment of commentsToUpdate) {
      comment.likes = comment.likes || 0;
      comment.likedBy = comment.likedBy || [];
      await comment.save();
    }

    console.log('Migration completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

export default migrateLikes;