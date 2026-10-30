
// Loader

const loader = document.getElementById('loader');
const MIN_TIME = 1500;   // loader shows at least 0.5s
const MAX_TIME = 8000;  // loader hides after 8s no matter what

const startTime = Date.now();
let hidden = false;

function hideLoader() {
    if (hidden) return;
    hidden = true;
    loader.classList.add('hidden');
}

// Normal case: hide when the page finishes loading,
// but wait out the minimum time first
window.addEventListener('load', () => {
    const elapsed = Date.now() - startTime;
    const remaining = Math.max(0, MIN_TIME - elapsed);
    setTimeout(hideLoader, remaining);
});

// Safety net: if something hangs, hide anyway
setTimeout(hideLoader, MAX_TIME);

// End Loader


// Hamburger menu toggle

const hamburger = document.querySelector('.hamburger');
// const header__linksBox = document.querySelector(".header__links-box");

hamburger.addEventListener('click', () => {
    // header__linksBox.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// End Hamburger menu toggle
