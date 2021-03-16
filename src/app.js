import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import passport from 'passport';
// import mongoose from 'mongoose';
import session from 'express-session';
import path from 'path';
import { localMiddleware } from './middlewares';
import routes from './routes';
import userRouter from './routers/userRouter';
import videoRouter from './routers/videoRouter';
import globalRouter from './routers/globalRouter';
import apiRouter from './routers/apiRouter';

import './passport';

const app = express();

const MongoStore = require('connect-mongo').default;

app.use(helmet()); //보안 담당 미들웨어
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use('/static', express.static(path.join(__dirname, 'static')));
app.use(cookieParser()); //쿠키를 전달받아서 사용할 수 있도록 해주는 미들웨어
app.use(bodyParser.json()); //사용자가 웹사이트로 전달하는 정보를 전달하는 미들웨어
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev')); //로깅 미들웨어
app.use(function (req, res, next) {
    res.setHeader(
        'Content-Security-Policy',
        "script-src 'self' https://archive.org",
    );
    return next();
});
app.use(
    session({
        secret: process.env.COOKIE_SECRET,
        resave: true,
        saveUninitialized: false,
        store: MongoStore.create({ mongoUrl: process.env.MONGO_URL }),
    }),
);

app.use(passport.initialize());
app.use(passport.session());

app.use(localMiddleware);

app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);
app.use(routes.api, apiRouter);

export default app;
