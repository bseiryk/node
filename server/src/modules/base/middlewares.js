import multer from 'multer';
import { getRandomInt } from './utils';

export const isAuth = (req, res, next) => {
  if (req.user) next();
  else res.status(401).json({ error: 'User is unauthorized' })
}

export const AEH = (fn) => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (error) {
    next(error)
  }
};



export const getMulterMiddleware = ({
  uploadFolder,
}) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, uploadFolder)
    },
    filename: function (req, file, cb) {
      const type = file.mimetype.slice(file.mimetype.lastIndexOf('/') + 1)
      const name = `:${req.body.moduleName}:${getRandomInt(Date.now())}${Date.now()}.${type}`
      cb(null, name)
    }
  })
  return multer({ storage });
}