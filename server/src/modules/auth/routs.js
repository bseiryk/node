import express from 'express';
import passport from 'passport';

import { logout } from './controllers';

import {
  REDIRECT_URL,
} from '../../config.js';

const router = express.Router();

router.get(
  '/google',
  passport.authenticate('google', { session: true, scope: ['profile', 'email'] }),
);
router.get(
  '/google/cb',
  passport.authenticate('google', {
    successRedirect: REDIRECT_URL
  }),
);
router.get('/logout', logout);


export default router;