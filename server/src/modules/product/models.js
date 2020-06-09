import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
}, {
  timestamps: true,
});

export const Product = mongoose.model('Product', productSchema, 'product');
