import express from 'express';
import {
  getProduct,
  getProducts,
  addProduct,
  updateProduct,
  deleteProducts,
} from './controllers';

import { AEH } from '../base/middlewares'

const router = express.Router();

router.get('/:id', AEH(getProduct));
router.get('/', AEH(getProducts));
router.post('/', AEH(addProduct));
router.put('/:id', AEH(updateProduct));
router.delete('/', AEH(deleteProducts));


export default router;