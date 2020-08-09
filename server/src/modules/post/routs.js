import express from 'express';

import {
  addPost,
  getPosts,
  deletePost,
} from './controllers';

import { AEH, getMulterMiddleware } from '../base/middlewares'

const router = express.Router();

router.post(
  '/add',
  getMulterMiddleware({
    uploadFolder: "src/uploads",
  }).array('photos'),
  addPost,
);

router.get('/get', getPosts);
router.delete('/delete', AEH(deletePost));


export default router;