import passport from 'passport';
import FacebookStrategy from 'passport-facebook';
import {
    githubLoginCallback,
    facebookLoginCallback,
} from './controllers/userController';
import User from './models/User';

const GithubStrategy = require('passport-github').Strategy;

passport.use(User.createStrategy());

passport.use(
    new GithubStrategy(
        {
            clientID: process.env.GH_CLIENT_ID,
            clientSecret: process.env.GH_CLIENT_SECRET,
            callbackURL: 'http://localhost:3000/auth/github/callback',
            scope: 'user.email',
        },
        githubLoginCallback,
    ),
);

passport.use(
    new FacebookStrategy(
        {
            clientID: process.env.FB_CLIENT_ID,
            clientSecret: process.env.FB_CLIENT_ECRET,
            callbackURL: `https://c51104133224.ngrok.io/auth/facebook/callback`,
            //ngrok끄면 안됨...
            profileFields: ['id', 'displayName', 'photos', 'email'],
            scope: ['public_profile', 'email'],
        },
        facebookLoginCallback,
    ),
);

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
