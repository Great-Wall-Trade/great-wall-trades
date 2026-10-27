
// Theme Switcher

const root = document.documentElement; // the <html> tag

const themeSwitcher = document.querySelector('.theme-switcher')

const sun = "<div class=\"theme--light\"><div class=\"sub-sun\"></div><div class=\"sub-sun\"></div><div class=\"sub-sun\"></div><div class=\"sub-sun\"></div><div class=\"sub-sun\"></div><div class=\"sub-sun\"></div></div>"

const moon = "<div class=\"theme--dark\"><img src=\"./assets/icons/vector/crescent-moon.svg\" alt=\"cresent\" class=\"moon\"></div>"

function iconSwitch(theme) {
    if (theme == 'light') {
        themeSwitcher.innerHTML  = moon;
    } else {
        themeSwitcher.innerHTML = sun;
    };
};


function setTheme(theme) {
    root.setAttribute("data-theme", theme);
    iconSwitch(theme);
    localStorage.setItem("theme", theme); // remember the choice
}


themeSwitcher.addEventListener("click", () => {
    const current = root.getAttribute("data-theme");
    setTheme(current === "dark" ? "light" : "dark");
});

// On page load: use saved choice, else follow the user's system setting
const saved = localStorage.getItem("theme");
const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

setTheme(saved || (systemDark ? "dark" : "light"));