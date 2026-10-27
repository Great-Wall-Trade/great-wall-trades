
const SUPPORTED = ['en', 'fr'];
const DEFAULT_LANG = 'en';
const STORAGE_KEY = 'lang';

let dict = {};
let currentLang = DEFAULT_LANG;

// 1. Which language should we use? URL > saved choice > browser > default
function detectLanguage() {
    const fromUrl = new URLSearchParams(window.location.search).get('lang');
    if (SUPPORTED.includes(fromUrl)) return fromUrl;

    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (SUPPORTED.includes(saved)) return saved;
    } catch { } // storage can be blocked; just move on

    const browser = navigator.language.slice(0, 2).toLowerCase();
    return SUPPORTED.includes(browser) ? browser : DEFAULT_LANG;
}

// 2. Look up "hero.title" -> dict.hero.title
function t(key) {
    return key.split('.').reduce((obj, k) => obj?.[k], dict);
}

// 3. Fill in the page
function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach((el) => {
        const text = t(el.dataset.i18n);
        if (text !== undefined) el.textContent = text; // missing key = keep fallback
    });

    document.querySelectorAll('[data-i18n-attr]').forEach((el) => {
        el.dataset.i18nAttr.split(',').forEach((pair) => {
            const [attr, key] = pair.split(':').map((s) => s.trim());
            const text = t(key);
            if (text !== undefined) el.setAttribute(attr, text);
        });
    });
}

// 4. The button shows the language you would switch TO
function updateSwitcher() {
    const btn = document.querySelector('.btn__language');
    if (!btn) return;
    const other = SUPPORTED.find((l) => l !== currentLang);
    btn.textContent = other.toUpperCase();
}

// 5. Load a language and apply it
async function setLanguage(lang) {
    try {
        const res = await fetch(`./locales/${lang}.json`);
        if (!res.ok) throw new Error(`Could not load ${lang}.json`);
        dict = await res.json();
    } catch (err) {
        console.error(err);
        if (lang !== DEFAULT_LANG) return setLanguage(DEFAULT_LANG);
        return; // even English failed: leave the HTML fallback text as is
    }

    currentLang = lang;
    document.documentElement.lang = lang;
    try { localStorage.setItem(STORAGE_KEY, lang); } catch { }

    applyTranslations();
    updateSwitcher();
}

// 6. Wire up the button and start
document
    .querySelector('.btn__language')
    ?.addEventListener('click', () => {
        const other = SUPPORTED.find((l) => l !== currentLang);
        setLanguage(other);
    });

window.i18n = { t, setLanguage, getLanguage: () => currentLang };
window.i18nReady = setLanguage(detectLanguage());