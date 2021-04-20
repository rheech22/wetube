import getBlobDuration from 'get-blob-duration';

const videoContainer = document.getElementById('jsVideoPlayer');
const videoPlayer = document.querySelector('video');
const controlbar = document.querySelector('.videoPlayer__controls');
const playBtn = document.getElementById('jsPlayButton');
const volumeBtn = document.getElementById('jsVolumeBtn');
const fullScrnBtn = document.getElementById('jsFullScreen');
const currentTime = document.getElementById('currentTime');
const totalTime = document.getElementById('totalTime');
const volumeRange = document.getElementById('jsVolume');
const progress = document.querySelector('.videoPlayer__progress');
const progressBar = document.querySelector('.videoPlayer__progress--filled');
const inputComment = document.getElementById('jsInputComment');

let isChanging = false;
let previousVol = 50;
let mousedown = false;

function downControlbar() {
    controlbar.style.opacity = '0';
    videoContainer.style.cursor = 'none';
    videoContainer.addEventListener('mousemove', upControlbar);
}

function upControlbar() {
    videoContainer.removeEventListener('mousemove', upControlbar);
    controlbar.style.opacity = '1';
    videoContainer.style.cursor = 'auto';
    setTimeout(downControlbar, 5000);
}

function handleProgress() {
    const percent = (videoPlayer.currentTime / videoPlayer.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
    e.preventDefault();
    const scrubTime = (e.offsetX / progress.offsetWidth) * videoPlayer.duration;
    videoPlayer.currentTime = scrubTime;
}

function handlePlayClick() {
    if (videoPlayer.paused) {
        videoPlayer.play();
        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
        videoPlayer.pause();
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
    }
}

function handleSpaceKey(event) {
    const shortCut = event.keyCode;
    if (shortCut === 32) {
        event.preventDefault();
        handlePlayClick();
    }
}

function handleInputBlur() {
    console.log('hi');
    window.addEventListener('keydown', handleSpaceKey);
}

function handleInputFocus() {
    console.log('hi');
    window.removeEventListener('keydown', handleSpaceKey);
}

function handleVolumeClick() {
    if (videoPlayer.volume === 0) {
        videoPlayer.volume = previousVol;
        volumeRange.value = videoPlayer.volume;
        if (previousVol >= 0.6) {
            volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
        } else if (previousVol >= 0.1) {
            volumeBtn.innerHTML = '<i class="fas fa-volume-down"></i>';
        }
    } else {
        previousVol = videoPlayer.volume;
        videoPlayer.volume = 0;
        volumeRange.value = videoPlayer.volume;

        volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
    }
    const percent =
        ((volumeRange.value - volumeRange.min) /
            (volumeRange.max - volumeRange.min)) *
        100;
    volumeRange.style.setProperty('--webkitProgressPercent', `${percent}%`);
}

function exitFullScreen() {
    fullScrnBtn.innerHTML = '<i class="fas fa-expand"></i>';
    fullScrnBtn.addEventListener('click', goFullScreen);
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
}

function goFullScreen() {
    if (videoContainer.requestFullscreen) {
        videoContainer.requestFullscreen();
    } else if (videoContainer.mozRequestFullScreen) {
        videoContainer.mozRequestFullScreen();
    } else if (videoContainer.webkitRequestFullscreen) {
        videoContainer.webkitRequestFullscreen();
    } else if (videoContainer.msRequestFullscreen) {
        videoContainer.msRequestFullscreen();
    }
    fullScrnBtn.innerHTML = '<i class="fas fa-compress"></i>';
    fullScrnBtn.removeEventListener('click', goFullScreen);
    fullScrnBtn.addEventListener('click', exitFullScreen);
}

const formatDate = (seconds) => {
    const secondsNumber = parseInt(seconds, 10);
    let hours = Math.floor(secondsNumber / 3600);
    let minutes = Math.floor((secondsNumber - hours * 3600) / 60);
    let totalSeconds = secondsNumber - hours * 3600 - minutes * 60;

    if (hours < 10) {
        hours = `0${hours}`;
    }
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    if (totalSeconds < 10) {
        totalSeconds = `0${totalSeconds}`;
    }

    if (hours === '00') {
        return `${minutes}:${totalSeconds}`;
    } else {
        return `${hours}:${minutes}:${totalSeconds}`;
    }
};

function setCurrentTime() {
    currentTime.innerHTML = formatDate(Math.floor(videoPlayer.currentTime));
    // console.log(videoPlayer.currentTime);
    handleProgress();
}

async function setTotalTime() {
    const blob = await fetch(videoPlayer.src).then((response) =>
        response.blob(),
    );
    const duration = await getBlobDuration(blob);
    const totalTimeString = formatDate(duration);
    totalTime.innerHTML = totalTimeString;
}

function handleEnded() {
    videoPlayer.currentTime = 0;
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
}

function handleDrag(event) {
    event.preventDefault();
    const {
        target: { value },
    } = event;
    videoPlayer.volume = value;

    if (value >= 0.6) {
        volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
    } else if (value >= 0.1) {
        volumeBtn.innerHTML = '<i class="fas fa-volume-down"></i>';
    } else {
        volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
    }
}

//range custom
const setCSSProperty = () => {
    const percent =
        ((volumeRange.value - volumeRange.min) /
            (volumeRange.max - volumeRange.min)) *
        100;
    volumeRange.style.setProperty('--webkitProgressPercent', `${percent}%`);
};

const handleMove = () => {
    if (!isChanging) return;
    setCSSProperty();
};

const handleUpAndLeave = () => {
    isChanging = false;
};

const handleDown = () => {
    isChanging = true;
};

function init() {
    videoPlayer.volume = 0.5;
    playBtn.addEventListener('click', handlePlayClick);
    volumeBtn.addEventListener('click', handleVolumeClick);
    fullScrnBtn.addEventListener('click', goFullScreen);
    window.addEventListener('keydown', handleSpaceKey);

    videoPlayer.addEventListener('loadedmetadata', setTotalTime);
    videoPlayer.addEventListener('timeupdate', setCurrentTime);
    videoPlayer.addEventListener('ended', handleEnded);
    videoPlayer.addEventListener('mousemove', upControlbar);

    //range custom
    volumeRange.addEventListener('input', handleDrag);
    volumeRange.addEventListener('mousemove', handleMove);
    volumeRange.addEventListener('mousedown', handleDown);
    volumeRange.addEventListener('mouseup', handleUpAndLeave);
    volumeRange.addEventListener('mouseleave', handleUpAndLeave);
    volumeRange.addEventListener('click', setCSSProperty);

    //progress custom
    progress.addEventListener('click', scrub);
    progress.addEventListener('mousemove', (e) => {
        mousedown && scrub(e);
    });
    progress.addEventListener('mousedown', () => (mousedown = true));
    progress.addEventListener('mouseup', () => (mousedown = false));

    //this is for using a space key for comments
    inputComment.addEventListener('focus', handleInputFocus);
    inputComment.addEventListener('blur', handleInputBlur);
}

if (videoContainer) {
    setCSSProperty();
    init();
}
