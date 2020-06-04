
import passport from 'passport';
import bodyParser from 'body-parser';


import { authRouter } from './modules/routs';
import authConfigInit from './modules/auth/config-init';
import { isAuth } from './modules/base/middlewares';

export default (app) => {
  app.use(bodyParser.json());


  authConfigInit();
  app.use(passport.initialize());
  app.use(passport.session());


  app.use('/auth', authRouter);
  app.use('/session', isAuth, (req, res, next) => {
    console.log('req.user', req.user);

    res.json('req')
  });
};
