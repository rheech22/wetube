import axios from 'axios';

const videoPreference = document.querySelector('.video__preference');

const likeNumber = document.getElementById('jsLikeNumber');
const likeBtn = document.querySelector('.jsLikeBtn');

const dislikeNumber = document.getElementById('jsDislikeNumber');
const dislikeBtn = document.querySelector('.jsDislikeBtn');

const alertNotLogin = () => {
    alert('You need to be logged in !');
};

const upDislike = () => {
    dislikeNumber.innerHTML = parseInt(dislikeNumber.innerHTML, 10) + 1;
    dislikeBtn.style.color = '#ff5e57';
};

const downDislike = () => {
    dislikeNumber.innerHTML = parseInt(dislikeNumber.innerHTML, 10) - 1;
    dislikeBtn.style.color = '#485460';
};

const upLike = () => {
    likeNumber.innerHTML = parseInt(likeNumber.innerHTML, 10) + 1;
    likeBtn.style.color = '#ff5e57';
};

const downLike = () => {
    likeNumber.innerHTML = parseInt(likeNumber.innerHTML, 10) - 1;
    likeBtn.style.color = '#485460';
};

const sendLike = async () => {
    try {
        const videoId = window.location.href.split('/videos/')[1];
        const response = await axios({
            url: `/api/${videoId}/like`,
            method: 'POST',
        });
        if (response.status === 200) {
            upLike();
        } else if (response.status === 206) {
            downLike();
        } else if (response.status === 207) {
            downDislike();
            upLike();
        }
    } catch {
        alertNotLogin();
    }
};

const sendDislike = async () => {
    try {
        const videoId = window.location.href.split('/videos/')[1];
        const response = await axios({
            url: `/api/${videoId}/dislike`,
            method: 'POST',
        });
        if (response.status === 200) {
            upDislike();
        } else if (response.status === 206) {
            downDislike();
        } else if (response.status === 207) {
            upDislike();
            downLike();
        }
    } catch (error) {
        alertNotLogin();
    }
};

const handleLike = (event) => {
    event.preventDefault();
    sendLike();
};

const handleDislike = (event) => {
    event.preventDefault();
    sendDislike();
};

function init() {
    likeBtn.addEventListener('click', handleLike);
    dislikeBtn.addEventListener('click', handleDislike);
}

if (videoPreference) {
    init();
}
