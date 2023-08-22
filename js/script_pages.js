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

// Funcion para que el icono tenga un efecto automatico cada intervalo de tiempo
function addJumpEffect() {
    const toggleImage = document.querySelector('#message img');
    toggleImage.classList.add('jump');
    setTimeout(() => {
        toggleImage.classList.remove('jump');
    }, 200); // Remueve la clase de salto después de 300 ms (0.3 segundos)
}

setInterval(addJumpEffect, 5000); // Ejecuta la función cada 30000 ms (30 segundos)

// Funcion para que el icono tenga un efecto automatico cada intervalo de tiempo
function addJumpEffect() {
    const toggleImage = document.querySelector('#dark-mode-toggle img');
    toggleImage.classList.add('jump');
    setTimeout(() => {
        toggleImage.classList.remove('jump');
    }, 300); // Remueve la clase de salto después de 300 ms (0.3 segundos)
}

setInterval(addJumpEffect, 5000); // Ejecuta la función cada 30000 ms (30 segundos)