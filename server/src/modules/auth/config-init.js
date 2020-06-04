import passport from 'passport';
import { OAuth2Strategy } from 'passport-google-oauth';
import jwt from 'jsonwebtoken';
import pick from 'lodash/pick';

import { googleAuthCallback } from './middlewares';
import {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
} from '../../config';


export default () => {
  passport.serializeUser((user, done) => {
    const userStr = JSON.stringify(pick(user, ['name', 'surname', 'email', '_id']))
    done(null, userStr);
  });

  passport.deserializeUser(function (userStr = null, done) {
    const user = JSON.parse(userStr);
    if (user) done(null, user);
    else done('invalid user');
  });

  passport.use(new OAuth2Strategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/cb',
    },
    googleAuthCallback,
  ));
};
