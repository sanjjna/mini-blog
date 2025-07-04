const Post = require('../models/Post');

exports.createPost = async (req, res) => {
  try {
    const post = new Post({ ...req.body, author: req.user.id });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create post' });
  }
};

exports.getPosts = async (req, res) => {
  const posts = await Post.find().populate('author', 'username').sort({ createdAt: -1 });
  res.json(posts);
};

exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('author', 'username');
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
  } catch (err) {
    res.status(400).json({ error: 'Invalid post ID' });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post || post.author.toString() !== req.user.id)
      return res.status(403).json({ error: 'Unauthorized' });

    Object.assign(post, req.body);
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update post' });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post || post.author.toString() !== req.user.id)
      return res.status(403).json({ error: 'Unauthorized' });

    /*await post.remove();*/
     await post.deleteOne(); 
     res.json({ message: 'Post deleted' });
  } catch (err) {
     console.error('Error deleting post:', err);
    res.status(400).json({ error: 'Failed to delete post' });
  }
};
