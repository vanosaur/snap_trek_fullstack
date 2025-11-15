import React from 'react';

// Define the shape of your Post data
interface Post {
  id: number;
  imageUrl: string;
  caption: string | null;
  location: string | null;
  author: {
    name: string | null;
  };
  // We'll add itinerary later
}

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <div style={{ 
      border: '1px solid #ccc', 
      borderRadius: '8px', 
      maxWidth: '400px', 
      margin: '20px auto',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      {/* Post Header */}
      <div style={{ padding: '10px 15px', fontWeight: 'bold' }}>
        {post.author.name || 'Anonymous'}
      </div>
      
      {/* Post Image */}
      <img 
        src={post.imageUrl} 
        alt={post.caption || 'Travel post'} 
        style={{ width: '100%', height: 'auto' }} 
      />
      
      {/* Post Content */}
      <div style={{ padding: '10px 15px' }}>
        <p><strong>{post.author.name || 'Anonymous'}</strong> {post.caption}</p>
        {post.location && (
          <p style={{ fontSize: '0.8rem', color: '#888' }}>
            {post.location}
          </p>
        )}
      </div>
    </div>
  );
};

export default PostCard;