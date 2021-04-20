import passport from 'passport';
// import FacebookStrategy from 'passport-facebook';
import {
    githubLoginCallback,
    kakaoLoginCallback,
    // facebookLoginCallback,
} from './controllers/userController';
import User from './models/User';

// console.log(process.env.GH_CLIENT_ID);
// console.log(process.env.GH_CLIENT_SECRET);
// console.log(process.env.FB_CLIENT_ID);
// console.log(process.env.FB_CLIENT_SECRET);

const GithubStrategy = require('passport-github').Strategy;
const KakaoStrategy = require('passport-kakao').Strategy;

passport.use(User.createStrategy());

passport.use(
    new GithubStrategy(
        {
            clientID: process.env.GH_CLIENT_ID,
            clientSecret: process.env.GH_CLIENT_SECRET,
            callbackURL: 'https://wetube22.herokuapp.com/auth/github/callback',
            scope: 'user.email',
        },
        githubLoginCallback,
    ),
);

passport.use(
    new KakaoStrategy(
        {
            clientID: process.env.KT_CLIENT_ID,
            clientSecret: '', // clientSecret을 사용하지 않는다면 넘기지 말거나 빈 스트링을 넘길 것
            callbackURL: 'https://wetube22.herokuapp.com/auth/kakao/callback',
        },
        kakaoLoginCallback,
    ),
);

// passport.use(
//     new FacebookStrategy(
//         {
//             clientID: process.env.FB_CLIENT_ID,
//             clientSecret: process.env.FB_CLIENT_SECRET,
//             callbackURL: `https://c51104133224.ngrok.io/auth/facebook/callback`,
//             //ngrok끄면 안됨...
//             profileFields: ['id', 'displayName', 'photos', 'email'],
//             scope: ['public_profile', 'email'],
//         },
//         facebookLoginCallback,
//     ),
// );

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// 카카오 로그인 시 serialized 오류로 인해 아래 코드를 썼지만,
// 아래 코드로 하면 bookmark, like, dislike, upload 다 오류남
// 카카오에서 넘어온 계정에 email정보가 없는 것을 보고 다시 받아오니
// 위 코드로 실행되는 것을 확인
// passport.serializeUser(function (user, cb) {
//     console.log('serialized');
//     cb(null, user.id);
// });
// passport.deserializeUser(function (id, cb) {
//     console.log('deserialized');
//     cb(null, id);
// });
