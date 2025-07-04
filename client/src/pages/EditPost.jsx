import { useEffect, useState } from 'react';

import axios from '../axios';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditPost() {
  const [form, setForm] = useState({ title: '', content: '' });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/api/posts/${id}`)
      .then(res => setForm({ title: res.data.title, content: res.data.content }))
      .catch(err => alert('Failed to fetch post.'));
  }, [id]);

  const handleSubmit = async e => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.put(`http://localhost:5000/api/posts/${id}`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Post updated!');
      navigate(`/posts/${id}`);
    } catch (err) {
      alert('Failed to update post.');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Edit Post</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full p-2 border rounded"
          placeholder="Title"
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
        />
        <textarea
          className="w-full p-2 border rounded h-40"
          placeholder="Content"
          value={form.content}
          onChange={e => setForm({ ...form, content: e.target.value })}
        ></textarea>
        <button className="bg-green-600 text-white px-4 py-2 rounded">Update</button>
      </form>
    </div>
  );
}
