import express from 'express';
import mongoose from 'mongoose';
import expressSession from 'express-session';
import connectMongo from 'connect-mongo';
import cors from 'cors';
import configureApp from '../app';

import {
  port,
  NODE_ENV,
  DB_USERNAME,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
  DB_NAME,
  SESSION_SECRET,
} from '../config.js';

const MongoStore = connectMongo(expressSession);


(async () => {
  try {
    await mongoose.connect(
      `mongodb://localhost:27017/mydb`,
      { useNewUrlParser: true, useUnifiedTopology: true },
    );
    // await mongoose.connect(
    //   `mongodb://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
    //   { useNewUrlParser: true, useUnifiedTopology: true },
    // );
    const app = express();

    app.use(cors({
      origin: ["http://localhost:3000", "http://localhost:2222"],
      methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTION'],
      allowedHeaders: ['Content-Type'],
      credentials: true,
      optionsSuccessStatus: 200,
    }));

    app.use(expressSession({
      secret: SESSION_SECRET,
      httpOnly: false,
      saveUninitialized: false,
      resave: false,
      rolling: true,
      cookie: {
        maxAge: 1000 * 60 * 20,
      },
      store: new MongoStore({
        mongooseConnection: mongoose.connection,
      })
    }));

    configureApp(app);

    app.listen(
      { port },
      () => console.log(`🚀 Server ready at http://localhost:${port}`),
    );
  } catch (error) {
    console.log(`db connection unsuccessful ended with error ${error}`);
  }
})();
