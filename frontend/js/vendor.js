
// Loader

const loader = document.getElementById('loader');
const MIN_TIME = 500;   // loader shows at least 0.5s
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