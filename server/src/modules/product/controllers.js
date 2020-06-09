import mongoose from 'mongoose'
import { Product } from './models'
import { getValidIds } from '../base/utils'


export const getProduct = async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.json([])
  const product = await Product.findById(req.params.id);
  res.json(product)
};

export const getProducts = async (req, res, next) => {
  const ids = getValidIds(req.body.ids)
  const result = await Product.find({ _id: { $in: ids } })
  res.json(result)
};

export const addProduct = async (req, res, next) => {
  const itemForSave = new Product(req.body);
  const savedItem = await itemForSave.save()
  res.json(savedItem);
};

export const updateProduct = async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) return res.json([])
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(product)
};

export const deleteProducts = async (req, res, next) => {
  const ids = getValidIds(req.body.ids)
  const result = await Product.deleteMany({ _id: { $in: ids } })
  res.json(result)
};

// {
//   filter: {
//     ids: [],
//     contains
//   },
//   count: 10,
//   skip: 10,
//   quantity: true
// }