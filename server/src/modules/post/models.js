import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  name: String,
  files: [String],
}, {
  timestamps: true,
});

export const Post = mongoose.model('Post', postSchema, 'post');
