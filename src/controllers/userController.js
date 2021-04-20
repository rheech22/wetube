import passport from 'passport';
import routes from '../routes';
import User from '../models/User';
import Video from '../models/Videos';

export const getJoin = (req, res) => {
    res.render('join', { pageTitle: 'Join' });
};

export const postJoin = async (req, res, next) => {
    const {
        body: { name, email, password, password2 },
    } = req;
    if (password !== password2) {
        req.flash('error', "Passwords don't match");
        res.status(400);
        res.render('join', { pageTitle: 'Join' });
    } else {
        try {
            const user = await User({
                name,
                email,
            });
            await User.register(user, password);
            next();
        } catch (error) {
            console.log(error);
            res.redirect(routes.home);
        }
        //To Do: Log user in
    }
};

export const getLogin = (req, res) =>
    res.render('login', { pageTitle: 'Log In' });

export const postLogin = passport.authenticate('local', {
    failureRedirect: routes.login,
    successRedirect: routes.home,
    successFlash: 'Welcome',
    failureFlash: "Can't log in. Check email and/or password",
});

export const githubLogin = passport.authenticate('github', {
    successFlash: 'Welcome',
    failureFlash: "Can't log in. Check email and/or password",
});

export const githubLoginCallback = async (_, __, profile, cb) => {
    const {
        _json: { id, avatar_url: avatarUrl, name, email },
    } = profile;
    try {
        const user = await User.findOne({ email });
        if (user) {
            user.githubId = id;
            user.save();
            return cb(null, user);
        }
        const newUser = await User.create({
            email,
            name,
            githubId: id,
            avatarUrl,
        });
        return cb(null, newUser);
    } catch (error) {
        return cb(error);
    }
};

export const postGithubLogIn = (req, res) => {
    req.flash('success', 'Welcome');
    res.redirect(routes.home);
};

export const kakaoLogin = passport.authenticate('kakao', {
    successFlash: 'Welcome',
    failureFlash: "Can't log in. Check email and/or password",
});

export const kakaoLoginCallback = async (_, __, profile, cb) => {
    const {
        _json: {
            id,
            properties: { nickname: name, profile_image: profileImage },
            kakao_account: { email },
        },
    } = profile;
    console.log(profile);
    try {
        const user = await User.findOne({ email });
        if (user) {
            user.kakaoId = id;
            user.save();
            return cb(null, user);
        }
        const newUser = await User.create({
            email,
            name,
            kakaoId: id,
            avatarUrl: profileImage,
        });
        return cb(null, newUser);
    } catch (error) {
        return cb(error);
    }
};

export const postKakaoLogIn = (req, res) => {
    req.flash('success', 'Welcome');
    res.redirect(routes.home);
};

// export const facebookLogin = passport.authenticate('facebook');

// export const facebookLoginCallback = async (_, __, profile, cb) => {
//     const {
//         _json: { id, name, email },
//     } = profile;
//     try {
//         const user = await User.findOne({ email });
//         if (user) {
//             user.facebookId = id;
//             user.avatarUrl = `https://graph.facebook.com/${id}/picture?type=large`;
//             user.save();
//             return cb(null, user);
//         }
//         const newUser = await User.create({
//             email,
//             name,
//             facebookId: id,
//             avatarUrl: `https://graph.facebook.com/${id}/picture?type=large`,
//         });
//         return cb(null, newUser);
//     } catch (error) {
//         return cb(error);
//     }
// };

// export const postFacebookLogin = (req, res) => {
//     res.redirect(routes.home);
// };

export const logout = (req, res) => {
    req.flash('info', 'Logged out, see you later');
    req.logout();
    res.redirect(routes.home);
    // res.render("logout", { pageTitle: "Log Out" });
};

export const getMe = async (req, res) => {
    const user = await User.findById(req.user.id)
        .populate('videos')
        .populate('bookmarkVideos');
    res.render('userDetail', { pageTitle: 'User Detail', user });
};

// export const users = (req, res) => res.render("users", { pageTitle: "Users" });
export const userDetail = async (req, res) => {
    const {
        params: { id },
    } = req;
    try {
        const user = await User.findById(id)
            .populate('videos')
            .populate('bookmarkVideos');

        res.render('userDetail', { pageTitle: 'User Detail', user });
    } catch (error) {
        req.flash('error', 'User not found');
        res.redirect(routes.home);
    }
};

export const getEditProfile = (req, res) =>
    res.render('editProfile', { pageTitle: 'Edit Profile' });

export const postEditProfile = async (req, res) => {
    const {
        body: { name, email },
        file,
    } = req;
    try {
        await User.findByIdAndUpdate(req.user.id, {
            name,
            email,
            avatarUrl: file ? file.location : req.user.avatarUrl,
        });
        req.flash('success', 'Profile updated');
        res.redirect(routes.me);
    } catch (error) {
        req.flash('error', "Can't update profile");
        res.redirect(routes.editProfile);
    }
};

export const getChangePassword = (req, res) =>
    res.render('changePassword', { pageTitle: 'Change Password' });

export const postChangePassword = async (req, res) => {
    const {
        body: { oldPassword, newPassword, newPassword1 },
    } = req;
    try {
        if (newPassword !== newPassword1) {
            req.flash('error', "Passwords don't match");
            res.status(400);
            res.redirect(`/users/${routes.changePassword}`);
            return;
        }
        await req.user.changePassword(oldPassword, newPassword);
        res.redirect(routes.me);
    } catch (error) {
        req.flash('error', "Can't change password");
        res.status(400);
        res.redirect(`/users/${routes.changePassword}`);
    }
};

export const addSubscriptionFromProfile = async (req, res) => {
    const {
        params: { id },
        user,
    } = req;
    try {
        const subscription = await User.findById(id);
        const subscriber = await User.findById(user.id);

        if (subscriber.subscriptions.includes(id)) {
            const filteredSubscriptions = subscriber.subscriptions.filter(
                (element) => element.toString() !== id.toString(),
            );
            subscriber.subscriptions = filteredSubscriptions;

            const filteredSubscribers = subscription.subscribers.filter(
                (element) => element.toString() !== user.id.toString(),
            );
            subscription.subscribers = filteredSubscribers;
            // console.log('this guy has been already here!');
            res.status(206);
        } else {
            subscriber.subscriptions.push(id);
            subscription.subscribers.push(user.id);
            // console.log('this guy is Newbie!');
            res.status(200);
        }
        subscriber.save();
        subscription.save();
    } catch (error) {
        res.status(400);
    } finally {
        res.end();
    }
};

export const addSubscriptionFromVideo = async (req, res) => {
    const {
        params: { id },
        user,
    } = req;
    try {
        const video = await (await Video.findById(id)).populate('creator');
        const uploader = video.creator;
        const subscription = await User.findById(uploader);
        const subscriber = await User.findById(user.id);

        if (subscriber.subscriptions.includes(subscription.id)) {
            const filteredSubscriptions = subscriber.subscriptions.filter(
                (element) => element.toString() !== subscription.id.toString(),
            );
            subscriber.subscriptions = filteredSubscriptions;

            const filteredSubscribers = subscription.subscribers.filter(
                (element) => element.toString() !== user.id.toString(),
            );
            subscription.subscribers = filteredSubscribers;
            // console.log('this guy has been already here!');
            res.status(206);
        } else {
            subscriber.subscriptions.push(subscription.id);
            subscription.subscribers.push(user.id);
            // console.log('this guy is Newbie!');
            res.status(200);
        }
        subscriber.save();
        subscription.save();
    } catch (error) {
        res.status(400);
    } finally {
        res.end();
    }
};
