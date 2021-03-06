// Global

const HOME = '/';
const JOIN = '/join';
const LOGIN = '/login';
const LOGOUT = '/logout';
const SEARCH = '/search';

// Users

const USERS = '/users';
const USER_DETAIL = '/:id';
const EDIT_PROFILE = '/edit-profile';
const CHANGE_PASSWORD = '/change-password';
const ME = '/me';

// Videos

const VIDEOS = '/videos';
const UPLOAD = '/upload';
const VIDEO_DETAIL = '/:id';
const EDIT_VIDEO = '/:id/edit';
const DELETE_VIDEO = '/:id/delete';

// Github

const GITHUB = '/auth/github';
const GITHUB_CALLBACK = '/auth/github/callback';

// Facebook

const FB = '/auth/facebook';
const FB_CALLBACK = '/auth/facebook/callback';

// Kakao

const KT = '/auth/kakao';
const KT_CALLBACK = '/auth/kakao/callback';

// API

const API = '/api';
const REGISTER_VIEW = '/:id/view';
const ADD_COMMENT = '/:id/comment';
const DELETE_COMMENT = '/:id/delete-comment';
const EDIT_COMMENT = '/:id/edit-comment';
const LIKE = '/:id/like';
const DISLIKE = '/:id/dislike';
const BOOKMARK = '/:id/bookmark';
const SUBSCRIPTION_FROM_PROFILE = '/:id/subscription-from-profile';
const SUBSCRIPTION_FROM_VIDEO = '/:id/subscription-from-video';
const GET_USER = '/:id/get-user';

const routes = {
    home: HOME,
    join: JOIN,
    login: LOGIN,
    logout: LOGOUT,
    search: SEARCH,
    users: USERS,
    userDetail: (id) => {
        if (id) {
            return `/users/${id}`;
        } else {
            return USER_DETAIL;
        }
    },
    editProfile: EDIT_PROFILE,
    changePassword: CHANGE_PASSWORD,
    videos: VIDEOS,
    upload: UPLOAD,
    videoDetail: (id) => {
        if (id) {
            return `/videos/${id}`;
        } else {
            return VIDEO_DETAIL;
        }
    },
    editVideo: (id) => {
        if (id) {
            return `/videos/${id}/edit`;
        } else {
            return EDIT_VIDEO;
        }
    },
    deleteVideo: (id) => {
        if (id) {
            return `/videos/${id}/delete`;
        } else {
            return DELETE_VIDEO;
        }
    },
    gitHub: GITHUB,
    githubCallback: GITHUB_CALLBACK,
    me: ME,
    kakao: KT,
    kakaoCallback: KT_CALLBACK,
    facebook: FB,
    facebookCallback: FB_CALLBACK,
    api: API,
    registerView: REGISTER_VIEW,
    addComment: ADD_COMMENT,
    deleteComment: DELETE_COMMENT,
    editComment: EDIT_COMMENT,
    like: LIKE,
    dislike: DISLIKE,
    bookmark: BOOKMARK,
    subscriptionFromProfile: SUBSCRIPTION_FROM_PROFILE,
    subscriptionFromVideo: SUBSCRIPTION_FROM_VIDEO,
    getUser: GET_USER,
};

export default routes;
