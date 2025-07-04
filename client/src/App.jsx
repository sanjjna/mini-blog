import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CreatePost from './pages/CreatePost';
import EditPost from './pages/EditPost';           // ✅ New import
import PostDetails from './pages/PostDetails';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';

export default function App() {
  return (
    <Router>
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/create"
            element={
              <PrivateRoute>
                <CreatePost />
              </PrivateRoute>
            }
          />
          <Route
            path="/edit/:id"
            element={
              <PrivateRoute>
                <EditPost />
              </PrivateRoute>
            }
          />
          <Route path="/posts/:id" element={<PostDetails />} />
        </Routes>
      </div>
    </Router>
  );
}
