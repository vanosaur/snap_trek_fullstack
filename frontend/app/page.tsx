"use client"; // Use a client component to fetch data

import { useEffect, useState } from 'react';
import api from '../utils/api'; // Import the api instance
import PostCard from '../src/components/PostCard'; // Import your new component

// Define the Post type again (or share it from a types file)
interface Post {
  id: number;
  imageUrl: string;
  caption: string | null;
  location: string | null;
  author: {
    name: string | null;
  };
}

export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Use the api instance to make the GET request
        const response = await api.get('/posts'); 
        setPosts(response.data);
      } catch (err) {
        console.error("Error fetching posts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []); // Empty array means this runs once on page load

  if (loading) {
    return <div>Loading posts...</div>;
  }

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>SnapTrek Feed</h1>
      {posts.length > 0 ? (
        <div>
          {posts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <p style={{ textAlign: 'center' }}>No posts yet. Be the first!</p>
      )}
    </div>
  );
}