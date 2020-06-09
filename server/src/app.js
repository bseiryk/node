
import passport from 'passport';
import express from 'express';
import bodyParser from 'body-parser';

import {
  authRouter,
  productRouter,
} from './modules/routs';
import authConfigInit from './modules/auth/config-init';
import { isAuth } from './modules/base/middlewares';
import {
  syncErrorHandler,
  defaultRouter,
} from './modules/base/controllers';

export default (app) => {
  app.use(bodyParser.json());


  authConfigInit();
  app.use(passport.initialize());
  app.use(passport.session());


  app.use('/auth', authRouter);
  // app.use('/product', productRouter);
  app.use('/product', isAuth, productRouter);

  // app.use('/client', (req, res, next) => {
  //   res.json('as')
  // });
  app.use(express.static('build'));

  app.use(defaultRouter);
  app.use(syncErrorHandler);
}