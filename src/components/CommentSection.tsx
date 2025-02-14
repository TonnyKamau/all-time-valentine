import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  MessageCircle, 
  Instagram, 
  Twitter, 
  Facebook,
  Calendar 
} from "lucide-react";

interface CommentData {
  name: string;
  instagram: string;
  twitter: string;
  facebook: string;
  comment: string;
}

interface Comment extends CommentData {
  _id: string;
  createdAt?: string;
}

interface ApiResponse {
  data?: Comment | Comment[];
  error?: string;
}

const initialCommentState: CommentData = {
  name: '',
  instagram: '',
  twitter: '',
  facebook: '',
  comment: ''
};

// Function to generate a random avatar URL
const getRandomAvatar = (name: string) => {
  const styles = ['adventurer', 'adventurer-neutral', 'avataaars', 'big-ears', 'big-ears-neutral', 'big-smile', 'bottts', 'croodles', 'croodles-neutral', 'initials'];
  const randomStyle = styles[Math.floor(Math.random() * styles.length)];
  return `https://api.dicebear.com/7.x/${randomStyle}/svg?seed=${encodeURIComponent(name)}`;
};

const CommentSection: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<CommentData>(initialCommentState);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const response = await fetch('/api/comment');
      const { data, error }: ApiResponse = await response.json();
      
      if (response.ok && data) {
        const commentsArray = Array.isArray(data) ? data : [data];
        setComments(commentsArray);
      } else {
        throw new Error(error || 'Failed to fetch comments');
      }
    } catch {
      toast({
        title: "Error",
        description: "Failed to fetch comments",
        variant: "destructive"
      });
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setNewComment(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (!newComment.name || !newComment.comment) return;

    setIsLoading(true);
    try {
      const response = await fetch('/api/comment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newComment),
      });

      const { data, error }: ApiResponse = await response.json();
      
      if (response.ok && data) {
        const newCommentData = Array.isArray(data) ? data[0] : data;
        setComments(prev => [newCommentData, ...prev]);
        setNewComment(initialCommentState);
        toast({
          title: "Success",
          description: "Comment added successfully",
        });
      } else {
        throw new Error(error || 'Failed to add comment');
      }
    } catch  {
      toast({
        title: "Error",
        description: "Failed to add comment",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Comment Form */}
      <Card className="shadow-md">
        <CardContent className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <MessageCircle className="w-6 h-6 text-pink-600" />
            <h2 className="text-2xl font-semibold">Leave a Comment</h2>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={newComment.name}
                onChange={handleChange}
                placeholder="Your name"
                required
                className="mt-1"
                disabled={isLoading}
              />
            </div>

            <div className="space-y-4">
              <Label>Social Media Links (Optional)</Label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <Instagram className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    name="instagram"
                    value={newComment.instagram}
                    onChange={handleChange}
                    placeholder="Instagram username"
                    className="pl-9"
                    disabled={isLoading}
                  />
                </div>
                <div className="relative">
                  <Twitter className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    name="twitter"
                    value={newComment.twitter}
                    onChange={handleChange}
                    placeholder="Twitter username"
                    className="pl-9"
                    disabled={isLoading}
                  />
                </div>
                <div className="relative">
                  <Facebook className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    name="facebook"
                    value={newComment.facebook}
                    onChange={handleChange}
                    placeholder="Facebook profile URL"
                    className="pl-9"
                    disabled={isLoading}
                  />
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="comment">Comment</Label>
              <Textarea
                id="comment"
                name="comment"
                value={newComment.comment}
                onChange={handleChange}
                placeholder="Share your thoughts..."
                required
                className="mt-1 min-h-[100px]"
                disabled={isLoading}
              />
            </div>

            <Button 
              type="submit" 
              className="w-full bg-pink-600 hover:bg-pink-700"
              disabled={isLoading}
            >
              {isLoading ? 'Adding Comment...' : 'Add Comment'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Comments List */}
      {comments.length > 0 && (
        <Card className="shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-6">
              <MessageCircle className="w-6 h-6 text-pink-600" />
              <h3 className="text-2xl font-semibold">Comments ({comments.length})</h3>
            </div>
            <div className="space-y-6">
              {comments.map((comment) => (
                <div 
                  key={comment._id.toString()} 
                  className="flex gap-4 border-b border-gray-100 pb-6 last:border-0"
                >
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={getRandomAvatar(comment.name)} alt={comment.name} />
                    <AvatarFallback>{comment.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="font-semibold text-lg">{comment.name}</span>
                      <div className="flex gap-2">
                        {comment.instagram && (
                          <a 
                            href={`https://instagram.com/${comment.instagram}`} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-pink-600 hover:text-pink-700 flex items-center gap-1"
                          >
                            <Instagram className="w-4 h-4" />
                          </a>
                        )}
                        {comment.twitter && (
                          <a 
                            href={`https://twitter.com/${comment.twitter}`} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-pink-600 hover:text-pink-700 flex items-center gap-1"
                          >
                            <Twitter className="w-4 h-4" />
                          </a>
                        )}
                        {comment.facebook && (
                          <a 
                            href={comment.facebook} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-pink-600 hover:text-pink-700 flex items-center gap-1"
                          >
                            <Facebook className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>
                    <p className="text-gray-700 mb-2">{comment.comment}</p>
                    {comment.createdAt && (
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Calendar className="w-4 h-4" />
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CommentSection;