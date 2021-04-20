import axios from 'axios';

const videoPreference = document.querySelector('.video__preference');
const bookmarkBtn = document.getElementById('jsBookmarkBtn');

function addBookmark() {
    bookmarkBtn.style.color = '#ff5e57';
}

function deleteBookmark() {
    bookmarkBtn.style.color = '#485460';
}

const sendBookmark = async () => {
    const videoId = window.location.href.split('/videos/')[1];
    const response = await axios({
        url: `/api/${videoId}/bookmark`,
        method: 'POST',
    });
    if (response.status === 200) {
        console.log('add bookmark');
        addBookmark();
    }
    if (response.status === 206) {
        console.log('delete bookmark');
        deleteBookmark();
    }
};

const handleClick = (event) => {
    event.preventDefault();
    sendBookmark();
};

function init() {
    bookmarkBtn.addEventListener('click', handleClick);
}

if (videoPreference) {
    init();
}
