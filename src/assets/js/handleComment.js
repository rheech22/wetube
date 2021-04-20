import axios from 'axios';

const commentContainer = document.querySelector('.video__comments');
const addCommentForm = document.getElementById('jsAddComment');
const commentList = document.getElementById('jsCommentList');
const commentNumber = document.getElementById('jsCommentNumber');
const commentText = document.getElementById('jsCommentText');
const delBtns = document.querySelectorAll('.jsDelBtn');

const decreaseNumber = () => {
    commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) - 1;
    if (commentNumber.innerHTML === '1') {
        commentText.innerHTML = ' comment';
    } else {
        commentText.innerHTML = ' comments';
    }
};

const increaseNumber = () => {
    commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) + 1;
    if (commentNumber.innerHTML === '1') {
        commentText.innerHTML = ' comment';
    } else {
        commentText.innerHTML = ' comments';
    }
};

const deleteComment = (index) => {
    console.log(`${index}-third`);
    const li = commentList.childNodes[index];
    commentList.removeChild(li);
    for (let i = 0; i < commentList.children.length; i++) {
        commentList.children[i].setAttribute('data-index', i);
    }
    decreaseNumber();
};

const addComment = (comment) => {
    const li = document.createElement('li');
    const span = document.createElement('span');
    const btn = document.createElement('button');
    btn.innerHTML = 'Delete';
    span.innerHTML = comment;
    li.appendChild(span);
    li.appendChild(btn);
    commentList.prepend(li);
    console.log(commentList.children.length);
    btn.classList.add('video__comments-delete', 'jsDelBtn');
    btn.addEventListener('click', handleClick);
    for (let i = 0; i < commentList.children.length; i++) {
        commentList.children[i].setAttribute('data-index', i);
    }
    increaseNumber();
};

const sendComment = async (comment) => {
    const videoId = window.location.href.split('/videos/')[1];
    const response = await axios({
        url: `/api/${videoId}/comment`,
        method: 'POST',
        data: {
            comment,
        },
    });
    if (response.status === 200) {
        addComment(comment);
    }
};

const sendIndex = async (index) => {
    const videoId = window.location.href.split('/videos/')[1];
    const response = await axios({
        url: `/api/${videoId}/delete-comment`,
        method: 'POST',
        data: {
            index,
        },
    });
    if (response.status === 200) {
        console.log(`${index}-second`);
        deleteComment(index);
    }
};

const handleSubmit = (event) => {
    event.preventDefault();
    const commentInput = addCommentForm.querySelector('input');
    const comment = commentInput.value;
    sendComment(comment);
    commentInput.value = '';
};

const handleClick = (event) => {
    event.preventDefault();
    const btn = event.target;
    const li = btn.parentNode;
    const index = li.getAttribute('data-index');
    console.log(`${index}-first`);
    const confirmDel = confirm('do you really wanna delete this comment?');
    if (confirmDel) {
        sendIndex(index);
    }
};

function init() {
    addCommentForm.addEventListener('submit', handleSubmit);
    delBtns.forEach((delBtn) => {
        delBtn.addEventListener('click', handleClick);
    });
}

if (commentContainer) {
    init();
}
