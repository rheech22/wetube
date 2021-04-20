import routes from '../routes';
import Video from '../models/Videos';
import Comment from '../models/Comment';
import User from '../models/User';

export const home = async (req, res) => {
    try {
        const videos = await Video.find({}).sort({ _id: -1 });

        res.render('home', { pageTitle: 'Home', videos });
    } catch (error) {
        console.log(error);
        res.render('home', { pageTitle: 'Home', videos: [] });
    }
};

export const search = async (req, res) => {
    const {
        query: { term: searchingBy },
    } = req;
    // 위 코드는 const searchyingBy = req.query.term 과 같음
    let videos = [];
    try {
        videos = await Video.find({
            title: { $regex: searchingBy, $options: 'i' },
        });
    } catch (error) {
        console.log(error);
    }
    res.render('search', { pageTitle: 'Search', searchingBy, videos });
};

export const getUpload = (req, res) =>
    res.render('upload', { pageTitle: 'Upload' });

export const postUpload = async (req, res) => {
    const {
        body: { title, description },
        file: { location },
        createdAt = Date.now(),
    } = req;
    const newVideo = await Video.create({
        fileUrl: location,
        title,
        description,
        createdAt,
        creator: req.user.id,
    });
    req.user.videos.push(newVideo.id);
    req.user.save();
    res.redirect(routes.videoDetail(newVideo.id));
};

export const videoDetail = async (req, res) => {
    const {
        params: { id },
    } = req;
    try {
        const video = await Video.findById(id)
            .populate('creator')
            .populate('comments');

        //other videos
        const videos = await Video.find({}).sort({ _id: -1 });
        const otherVideos = videos.filter(
            (element) => element.id.toString() !== id.toString(),
        );
        const shuffle = (array) => {
            for (let i = array.length - 1; i > 0; i -= 1) {
                let j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
        };
        shuffle(otherVideos);

        //date
        const videoDate = video.createdAt;
        const getFormattedDate = (date) => {
            const year = date.getFullYear();
            const month = (1 + date.getMonth()).toString().padStart(2, '0');
            const day = date.getDate().toString().padStart(2, '0');
            return `${year}.${month}.${day}`;
        };
        const uploadDate = getFormattedDate(videoDate);

        // //how long
        // const timeNow = Date.now();
        // const timeUpload = videoDate.getTime();
        // const timeDiff = timeNow - timeUpload;
        // const dayDiff = timeDiff / 1000 / 60 / 60 / 24;
        // let finalDiff;
        // // console.log(Math.floor(dayDiff));
        // if (dayDiff >= 730) {
        //     finalDiff = `${Math.floor(dayDiff / 365)} years ago`;
        // } else if (dayDiff >= 365) {
        //     finalDiff = `a year ago`;
        // } else if (dayDiff >= 60) {
        //     finalDiff = `${Math.floor(dayDiff / 30)} months ago`;
        // } else if (dayDiff >= 30) {
        //     finalDiff = `a month ago`;
        // } else if (dayDiff < 1) {
        //     finalDiff = `${Math.floor(dayDiff * 24)} hours ago`;
        // } else if (dayDiff < 2) {
        //     finalDiff = `a day ago`;
        // } else {
        //     finalDiff = `${Math.floor(dayDiff)} days ago`;
        // }
        // console.log(finalDiff);
        res.render('videoDetail', {
            pageTitle: video.title,
            video,
            otherVideos,
            uploadDate,
        });
    } catch (error) {
        res.redirect(routes.home);
    }
};

export const getEditVideo = async (req, res) => {
    const {
        params: { id },
    } = req;
    try {
        const video = await Video.findById(id);
        if (video.creator.toString() !== req.user.id) {
            throw Error();
        } else {
            res.render('editVideo', {
                pageTitle: `Edit ${video.title}`,
                video,
            });
        }
    } catch (error) {
        res.redirect(routes.home);
    }
};

export const postEditVideo = async (req, res) => {
    const {
        params: { id },
        body: { title, description },
    } = req;
    try {
        await Video.findOneAndUpdate({ _id: id }, { title, description });
        res.redirect(routes.videoDetail(id));
    } catch (error) {
        res.redirect(routes.home);
    }
};

export const deleteVideo = async (req, res) => {
    const {
        params: { id },
    } = req;
    try {
        const video = await Video.findById(id);
        const user = await User.findById(req.user.id);
        if (video.creator.toString() !== req.user.id) {
            throw Error();
        } else {
            await Video.findOneAndRemove({ _id: id });
            const filteredVideos = user.videos.filter(
                (element) => element.toString() !== id.toString(),
            );
            user.videos = filteredVideos;
            user.save();
        }
    } catch (error) {
        console.log(error);
    } finally {
        res.end();
    }
    res.redirect(routes.home);
};

// Register Video View

export const postRegisterView = async (req, res) => {
    const {
        params: { id },
    } = req;
    try {
        const video = await Video.findById(id);
        video.views += 1;
        video.save();
        res.status(200);
    } catch (error) {
        res.status(400);
    } finally {
        res.end();
    }
};

//Handle Comment

export const postAddComment = async (req, res) => {
    const {
        params: { id },
        body: { comment },
        user,
    } = req;
    try {
        const video = await Video.findById(id);
        const newComment = await Comment.create({
            text: comment,
            creator: user.id,
            videos: id,
            // creator: req.user.id,
        });
        console.log(user.id);
        console.log(id);
        console.log(newComment.id);
        video.comments.push(newComment.id);
        video.save();
    } catch (error) {
        res.status(400);
    } finally {
        res.end();
    }
};

export const deleteComment = async (req, res) => {
    const {
        params: { id },
        body: { index },
    } = req;
    try {
        const video = await Video.findById(id);
        const commentList = video.comments.reverse();
        console.log(`${index}-fourth`);
        console.log(commentList);
        // const deleteCommentId = video.comments.reverse()[index];
        commentList.splice(index, 1);
        console.log(commentList);
        video.comments.reverse();
        video.save();
        // await Comment.findOneAndRemove({ _id: deleteCommentId });
    } catch (error) {
        console.log('error');
        res.status(400);
    } finally {
        res.end();
    }
};

//like and dislike
//해당 array에 null 값이 들어가서 bad request 400 이 나오는 오류 수정
//db에서 직접 null값을 제거해주니 정상작동.. 어떻게 null 값이 들어갔는지는 모르겠음

export const likeVideo = async (req, res) => {
    const {
        params: { id },
        user,
    } = req;
    try {
        const video = await Video.findById(id);

        if (video.likes.includes(user.id)) {
            const filteredLikes = video.likes.filter(
                (element) => element.toString() !== user.id.toString(),
            );

            video.likes = filteredLikes;
            // console.log('this guy has been already here!');
            res.status(206);
        } else if (video.dislikes.includes(user.id)) {
            const filteredDislikes = video.dislikes.filter(
                (element) => element.toString() !== user.id.toString(),
            );
            video.dislikes = filteredDislikes;
            video.likes.push(user.id);
            // console.log('this guy had disliked this video!');
            res.status(207);
        } else {
            video.likes.push(user.id);
            // console.log('this guy is Newbie!');
            res.status(200);
        }
        video.save();
    } catch (error) {
        res.status(400);
    } finally {
        res.end();
    }
};

export const dislikeVideo = async (req, res) => {
    const {
        params: { id },
        user,
    } = req;
    try {
        const video = await Video.findById(id);

        if (video.dislikes.includes(user.id)) {
            const filteredDislikes = video.dislikes.filter(
                (element) => element.toString() !== user.id.toString(),
            );

            video.dislikes = filteredDislikes;
            // console.log('this guy has been already here!');
            res.status(206);
        } else if (video.likes.includes(user.id)) {
            const filteredLikes = video.likes.filter(
                (element) => element.toString() !== user.id.toString(),
            );
            video.likes = filteredLikes;
            video.dislikes.push(user.id);
            // console.log('this guy had liked this video!');
            res.status(207);
        } else {
            video.dislikes.push(user.id);
            // console.log('this guy is Newbie!');
            res.status(200);
        }
        video.save();
    } catch (error) {
        res.status(400);
    } finally {
        res.end();
    }
};

//Bookmark

export const addBookmark = async (req, res) => {
    const {
        params: { id },
        user,
    } = req;
    try {
        const video = await Video.findById(id);
        const bookmarkUser = await User.findById(user.id);
        console.log(video.bookmarkUsers);
        console.log(bookmarkUser.bookmarkVideos);

        if (video.bookmarkUsers.includes(user.id)) {
            const filteredBookmarkUsers = video.bookmarkUsers.filter(
                (element) => element.toString() !== user.id.toString(),
            );
            video.bookmarkUsers = filteredBookmarkUsers;

            const filteredBookmarkVideos = bookmarkUser.bookmarkVideos.filter(
                (element) => element.toString() !== id.toString(),
            );
            bookmarkUser.bookmarkVideos = filteredBookmarkVideos;
            // console.log('this guy has been already here!');
            res.status(206);
        } else {
            video.bookmarkUsers.push(user.id);
            bookmarkUser.bookmarkVideos.push(id);
            // console.log('this guy is Newbie!');
            res.status(200);
        }
        video.save();
        bookmarkUser.save();
        console.log(video.bookmarkUsers);
        console.log(bookmarkUser.bookmarkVideos);
    } catch (error) {
        res.status(400);
    } finally {
        res.end();
    }
};
