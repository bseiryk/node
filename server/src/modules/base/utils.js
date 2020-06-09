import mongoose from 'mongoose'
import flatten from 'lodash/flatten'

export const getValidIds = (arg) => {
  let ids = flatten([arg])
  return ids.filter(id => mongoose.Types.ObjectId.isValid(id))
}