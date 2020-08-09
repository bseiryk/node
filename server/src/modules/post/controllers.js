import mongoose from 'mongoose'
import { Post } from './models'
import { deleteFiles, getValidIds } from '../base/utils'


export const addPost = async (req, res, next) => {
  const itemForSave = new Post({
    name: req.body.name,
    files: req.files.map(file => file.filename)
  });
  const savedItem = await itemForSave.save()
  res.json(savedItem);
};

export const getPosts = async (req, res, next) => {
  const posts = await Post.find();
  res.json(posts);
};


export const deletePost = async (req, res, next) => {
  const ids = getValidIds(req.body.ids)
  const result = await Post.find({ _id: { $in: ids } })
  const files = result.reduce((acc, el) => {
    acc = acc.concat(el.files)
    return acc
  }, [])
  await Post.deleteMany({ _id: { $in: ids } })
  await deleteFiles(files)
  res.json('deleteed')
};