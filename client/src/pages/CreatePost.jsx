import { useState } from 'react';

import axios from '../axios'; // adjust the path as per your file structure


export default function CreatePost() {
  const [form, setForm] = useState({ title: '', content: '' });

  const handleSubmit = async e => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.post('/api/posts', form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Post created!');
      setForm({ title: '', content: '' });
    } catch (err) {
      alert('Failed to create post.');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Create New Post</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input className="w-full p-2 border rounded" placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
        <textarea className="w-full p-2 border rounded h-40" placeholder="Content" value={form.content} onChange={e => setForm({ ...form, content: e.target.value })}></textarea>
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Publish</button>
      </form>
    </div>
  );
}
