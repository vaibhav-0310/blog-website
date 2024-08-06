const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/blog', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

// Blog Post Schema
const PostSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: String,
  date: { type: Date, default: Date.now }
});

const Post = mongoose.model('Post', PostSchema);

// Routes
app.get('/posts', async (req, res) => {
  const posts = await Post.find();
  res.json(posts);
});

app.post('/posts', async (req, res) => {
  const newPost = new Post(req.body);
  await newPost.save();
  res.json(newPost);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
