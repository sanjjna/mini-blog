import { Link } from 'react-router-dom';

export default function PostCard({ post }) {
  return (
    <div className="bg-white p-4 shadow rounded mb-4">
      <h2 className="text-xl font-semibold text-blue-600">
        <Link to={`/posts/${post._id}`}>{post.title}</Link>
      </h2>
      <p className="text-sm text-gray-500">By {post.author?.username} • {new Date(post.createdAt).toDateString()}</p>
      <p className="mt-2 text-gray-700">{post.content.slice(0, 120)}...</p>
    </div>
  );
}
