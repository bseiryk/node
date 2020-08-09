
import passport from 'passport';
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';

import {
  authRouter,
  productRouter,
  postRouter,
} from './modules/routs';
import authConfigInit from './modules/auth/config-init';
import { isAuth } from './modules/base/middlewares';
import {
  syncErrorHandler,
  defaultRouter,
} from './modules/base/controllers';

export default (app) => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  authConfigInit();
  app.use(passport.initialize());
  app.use(passport.session());


  app.use('/auth', authRouter);
  app.use('/post', postRouter);
  app.use('/session', (req, res, next) => {
    console.log(req.headers)
    res.json()
  });
  app.use('/product', isAuth, productRouter);

  app.use('/resources', express.static(path.resolve(__dirname) + "/build"));
  app.use(express.static(path.resolve(__dirname) + "/uploads"));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname) + "/build/index.html");
  });

  app.use(defaultRouter);
  app.use(syncErrorHandler);
}