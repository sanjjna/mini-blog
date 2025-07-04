import { useEffect, useState } from 'react';
import axios from '../axios';
import PostCard from '../components/PostCard';

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('/api/posts')
      .then(res => setPosts(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Latest Posts</h1>
      {posts.length ? (
        posts.map(post => <PostCard key={post._id} post={post} />)
      ) : (
        <p>No posts found.</p>
      )}
    </div>
  );
}
