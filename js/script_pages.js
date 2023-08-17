//LOADER
onload = () => {
    const load = document.getElementById('load')

    setTimeout(() => {
        load.style.display = 'none'
    }, 1000)
}

const darkModeToggle = document.getElementById("dark-mode-toggle");
const body = document.body;
const icon = darkModeToggle.querySelector("img");

darkModeToggle.addEventListener("click", () => {
    if (body.getAttribute("data-theme") === "dark") {
        body.setAttribute("data-theme", "light");
        icon.setAttribute("src", "../assets/icons/icon-dark.png");
        icon.setAttribute("alt", "Modo Claro");
    } else {
        body.setAttribute("data-theme", "dark");
        icon.setAttribute("src", "../assets/icons/icon-light.png");
        icon.setAttribute("alt", "Modo Oscuro");
    }
});