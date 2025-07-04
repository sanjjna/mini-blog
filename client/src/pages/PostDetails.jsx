import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from '../axios';
import { AuthContext } from '../contexts/AuthContext';

export default function PostDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`/api/posts/${id}`);
        setPost(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPost();
  }, [id]);

 
const handleDelete = async () => {
  const token = localStorage.getItem('token');
  if (!token) return;

  try {
    const res = await axios.delete(`/api/posts/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    // Show backend response
    alert(res.data.message); // Should show: "Post deleted"
    navigate('/');
  } catch (err) {
    console.error('Delete error:', err.response?.data || err.message);
    alert(err.response?.data?.error || 'Error deleting post');
  }
};



  if (!post) return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <div className="bg-white p-6 rounded shadow-md">
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      <p className="text-sm text-gray-500 mb-4">by {post.author?.username}</p>
      <p className="text-gray-700 leading-relaxed">{post.content}</p>

      {user && user._id === post.author?._id && (
        <div className="mt-6 flex gap-4">
          <button
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            Delete
          </button>

          <Link
            to={`/edit/${post._id}`}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
          >
            Edit
          </Link>
        </div>
      )}
    </div>
  );
}
