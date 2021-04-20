import axios from 'axios';

const subscriptionBtn = document.getElementById('jsSubscriptionBtn');
const canNotSubscriptionBtn = document.getElementById('jsCantSubscriptionBtn');

function subscribe() {
    subscriptionBtn.style.color = '#485460';
    subscriptionBtn.innerHTML = 'SUBSCRIBED';
}

function unsubscribe() {
    subscriptionBtn.style.color = 'white';
    subscriptionBtn.innerHTML = 'SUBSCRIBE';
}

const sendSubscription = async () => {
    if (window.location.href.includes('videos')) {
        const videoId = window.location.href.split('/videos/')[1];
        const response = await axios({
            url: `/api/${videoId}/subscription-from-video`,
            method: 'POST',
        });
        console.log('from Videos!');
        if (response.status === 200) {
            console.log('subscribe');
            subscribe();
        }
        if (response.status === 206) {
            console.log('unsubscribe');
            unsubscribe();
        }
    } else if (window.location.href.includes('users')) {
        const channelId = window.location.href.split('/users/')[1];
        const response = await axios({
            url: `/api/${channelId}/subscription-from-profile`,
            method: 'POST',
        });
        console.log('from Profile!');
        if (response.status === 200) {
            console.log('subscribe');
            subscribe();
        }
        if (response.status === 206) {
            console.log('unsubscribe');
            unsubscribe();
        }
    }
};

const handleClickSubscription = (event) => {
    event.preventDefault();
    sendSubscription();
};

const alertNotLogin = (event) => {
    event.preventDefault();
    alert('You need to log in to subscribe it!');
};

function init() {
    subscriptionBtn.addEventListener('click', handleClickSubscription);
    canNotSubscriptionBtn.addEventListener('click', alertNotLogin);
}

init();
