import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  googleId: String,
  email: String,
  name: String,
  surname: String,
}, {
  timestamps: true,
});

export const User = mongoose.model('User', userSchema, 'user');
