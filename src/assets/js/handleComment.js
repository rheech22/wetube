import axios from 'axios';

const commentContainer = document.querySelector('.video__comments');
const addCommentForm = document.getElementById('jsAddComment');
const commentList = document.getElementById('jsCommentList');
const commentNumber = document.getElementById('jsCommentNumber');
const commentText = document.getElementById('jsCommentText');
const delBtns = document.querySelectorAll('.jsDelBtn');
const EditBtns = document.querySelectorAll('.jsEditBtn');
const commentDateSet = document.querySelectorAll('.video__comments-date');

// const getUserInfo = async () => {
//     try {
//         const videoId = window.location.href.split('/videos/')[1];
//         const response = await axios({
//             url: `/api/${videoId}/get-user`,
//             method: 'GET',
//         });
//         if (response.status === 200) {
//             console.log(response);
//         }
//     } catch (error) {
//         console.log(error);
//     }
// };

function changeFormatCommentDate() {
    commentDateSet.forEach((comment) => {
        const targetComment = comment;
        const originTime = parseInt(comment.innerHTML, 10);
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
        targetComment.innerHTML = finalDiff;
    });
}

const alertNotLogin = () => {
    alert('You need to be logged in !');
};

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

const EditComment = (event) => {
    const submitBtn = event.target;
    const li = submitBtn.parentNode;
    const div = li.querySelector('.jsCommentsInfo');
    const btns = li.querySelector('.video__comments-btns');
    const span = li.querySelector('.video__comments-text');
    const input = div.querySelector('input');
    const comment = input.value;
    span.innerHTML = comment;
    span.style.display = 'flex';
    btns.style.display = 'flex';
    div.removeChild(input);
    li.removeChild(submitBtn);
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
    // getUserInfo();
    const li = document.createElement('li');
    const firstDiv = document.createElement('div');
    const secondDiv = document.createElement('div');
    const btns = document.createElement('div');

    const avatar = document.createElement('img');
    const infoDiv = document.createElement('div');
    const nameText = document.createElement('span');
    const dateText = document.createElement('span');
    const spanText = document.createElement('span');

    const delBtn = document.createElement('button');
    const editBtn = document.createElement('button');
    editBtn.innerHTML = 'Edit';
    delBtn.innerHTML = 'Delete';
    spanText.innerHTML = comment;
    nameText.innerHTML = 'loading...';
    dateText.innerHTML = 'Now';
    avatar.src = `https://mblogthumb-phinf.pstatic.net/20150403_86/e2voo_14280514283502gas9_JPEG/kakako-00.jpg?type=w2`;

    btns.appendChild(editBtn);
    btns.appendChild(delBtn);

    infoDiv.appendChild(nameText);
    infoDiv.appendChild(dateText);

    secondDiv.appendChild(infoDiv);
    secondDiv.appendChild(spanText);

    firstDiv.appendChild(avatar);

    li.appendChild(firstDiv);
    li.appendChild(secondDiv);
    li.appendChild(btns);

    commentList.prepend(li);

    avatar.classList.add('video__comments-avatar');
    secondDiv.classList.add('jsCommentsInfo');
    infoDiv.classList.add('video__comments-info');
    nameText.classList.add('video__comments-name');
    dateText.classList.add('video__comments-date');
    spanText.classList.add('video__comments-text');

    btns.classList.add('video__comments-btns');
    editBtn.classList.add('video__comments-edit', 'jsEditBtn');
    delBtn.classList.add('video__comments-delete', 'jsDelBtn');

    delBtn.addEventListener('click', handleDelClick);
    editBtn.addEventListener('click', handleEditClick);
    for (let i = 0; i < commentList.children.length; i++) {
        commentList.children[i].setAttribute('data-index', i);
    }
    increaseNumber();
};

const sendComment = async (comment) => {
    try {
        const videoId = window.location.href.split('/videos/')[1];
        const response = await axios({
            url: `/api/${videoId}/comment`,
            method: 'POST',
            data: {
                comment,
            },
        });
        if (response.status === 200) {
            console.log(response.data);
            addComment(comment);
        }
    } catch (error) {
        console.log(error);
        alertNotLogin();
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

const sendIndexEdited = async (event) => {
    const btn = event.target;
    const li = btn.parentNode;
    const index = li.getAttribute('data-index');
    const input = li.querySelector('input');
    const comment = input.value;
    const videoId = window.location.href.split('/videos/')[1];
    const response = await axios({
        url: `/api/${videoId}/edit-comment`,
        method: 'POST',
        data: {
            index,
            comment,
        },
    });
    if (response.status === 200) {
        EditComment(event);
    }
};

const handleSubmit = (event) => {
    event.preventDefault();
    const commentInput = addCommentForm.querySelector('input');
    const comment = commentInput.value;
    sendComment(comment);
    commentInput.value = '';
};

const handleDelClick = (event) => {
    event.preventDefault();
    const btn = event.target;
    const li = btn.parentNode.parentNode;
    const index = li.getAttribute('data-index');
    console.log(`${index}-first`);
    const confirmDel = confirm('do you really wanna delete this comment?');
    if (confirmDel) {
        sendIndex(index);
    }
};

const handleEditClick = (event) => {
    event.preventDefault();
    const btn = event.target;
    const li = btn.parentNode.parentNode;
    const div = li.querySelector('.video__comments-info');
    const span = li.querySelector('.video__comments-text');
    const btns = li.querySelector('.video__comments-btns');
    const comment = span.innerHTML;
    const input = document.createElement('input');
    const submitBtn = document.createElement('button');
    div.after(input);
    li.appendChild(submitBtn);
    input.classList.add('jsEditInput');
    submitBtn.classList.add('jsSubmitBtn');
    submitBtn.innerHTML = 'Submit';
    input.setAttribute('value', comment);
    input.focus();
    input.setSelectionRange(comment.length, comment.length);
    span.style.display = 'none';
    btns.style.display = 'none';
    submitBtn.addEventListener('click', sendIndexEdited);
};

function init() {
    changeFormatCommentDate();
    addCommentForm.addEventListener('submit', handleSubmit);
    delBtns.forEach((delBtn) => {
        delBtn.addEventListener('click', handleDelClick);
    });
    EditBtns.forEach((editBtn) => {
        editBtn.addEventListener('click', handleEditClick);
    });
}

if (commentContainer) {
    init();
}
