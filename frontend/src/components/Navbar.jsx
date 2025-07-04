import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X } from 'lucide-react'; // Or replace with SVGs if you're not using lucide

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow mb-4">
      <div className="max-w-4xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-blue-600">
          MyBlog
        </Link>

        {/* Hamburger Toggle */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Menu Items */}
        <div className="hidden md:flex space-x-4">
          <Link to="/" className="hover:text-blue-500">Home</Link>
          <Link to="/create" className="hover:text-blue-500">New Post</Link>
          <Link to="/login" className="hover:text-blue-500">Login</Link>
          <Link to="/register" className="hover:text-blue-500">Register</Link>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          <Link to="/" onClick={() => setIsOpen(false)} className="block hover:text-blue-500">Home</Link>
          <Link to="/create" onClick={() => setIsOpen(false)} className="block hover:text-blue-500">New Post</Link>
          <Link to="/login" onClick={() => setIsOpen(false)} className="block hover:text-blue-500">Login</Link>
          <Link to="/register" onClick={() => setIsOpen(false)} className="block hover:text-blue-500">Register</Link>
        </div>
      )}
    </nav>
  );
}
