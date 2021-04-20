const toggleBtn = document.querySelector('.toggleHeaderBtn');
const userMenu = document.querySelector('.header__wrapper__toggled');

function activeToggle() {
    userMenu.classList.toggle('active');
}

function init() {
    toggleBtn.addEventListener('click', activeToggle);
}

if (toggleBtn) {
    init();
}
