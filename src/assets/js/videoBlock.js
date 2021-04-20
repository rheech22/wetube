const videoBlock = document.querySelectorAll('.videoBlock__thumbnail');
const updatedAt = document.querySelectorAll('.jsFromUpdate');

function changeFormatDate() {
    updatedAt.forEach((video) => {
        const targetVideo = video;
        const originTime = parseInt(video.innerHTML, 10);
        const nowTime = Date.now();
        const timeDiff = nowTime - originTime;
        const dayDiff = timeDiff / 1000 / 60 / 60 / 24;
        let finalDiff;
        if (dayDiff >= 730) {
            finalDiff = `${Math.floor(dayDiff / 365)} years ago`;
        } else if (dayDiff >= 365) {
            finalDiff = `A year ago`;
        } else if (dayDiff >= 60) {
            finalDiff = `${Math.floor(dayDiff / 30)} months ago`;
        } else if (dayDiff >= 30) {
            finalDiff = `A month ago`;
        } else if (dayDiff < 0.084) {
            finalDiff = `A while ago`;
        } else if (dayDiff < 1) {
            finalDiff = `${Math.floor(dayDiff * 24)} hours ago`;
        } else if (dayDiff < 2) {
            finalDiff = `A day ago`;
        } else {
            finalDiff = `${Math.floor(dayDiff)} days ago`;
        }
        targetVideo.innerHTML = finalDiff;
    });
}

const registerView = (event) => {
    const targetContainer = event.target.parentNode;
    const targetLink = targetContainer.parentNode;
    const link = targetLink.getAttribute('href');
    const videoId = link.split('/videos/')[1];
    fetch(`/api/${videoId}/view`, {
        method: 'POST',
    });
};

function playVideo(event) {
    const video = event.target;
    video.play();
}

function resetVideo(event) {
    const video = event.target;
    video.pause();
    video.currentTime = 5.0;
}

function init() {
    changeFormatDate();
    videoBlock.forEach((video) => {
        const targetVideo = video;
        targetVideo.volume = 0;
        targetVideo.addEventListener('mouseover', playVideo);
        targetVideo.addEventListener('mouseout', resetVideo);
        targetVideo.addEventListener('click', registerView);
    });
}

if (videoBlock) {
    init();
}
