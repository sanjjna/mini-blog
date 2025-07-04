const express = require('express');
const {
  createPost, getPosts, getPostById, updatePost, deletePost
} = require('../controllers/postController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

router.get('/', getPosts);
router.get('/:id', getPostById);
router.post('/', requireAuth, createPost);
router.put('/:id', requireAuth, updatePost);
router.delete('/:id', requireAuth, deletePost);

module.exports = router;
