import mongoose from 'mongoose'
import fs from 'fs'
import flatten from 'lodash/flatten'
import isEmpty from 'lodash/isEmpty'

export const getValidIds = (arg) => {
  let ids = flatten([arg])
  return ids.filter(id => mongoose.Types.ObjectId.isValid(id))
}

export function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

export const deleteFiles = (files) => {
  return new Promise((resolve, reject) => {
    if (isEmpty(files)) resolve(null)
    let i = files.length;
    files.forEach(file => {
      fs.unlink(`src/uploads/${file}`, function (err) {
        i--;
        if (err) reject(err);
        else if (i <= 0) resolve(null);
      });
    })
  })
}