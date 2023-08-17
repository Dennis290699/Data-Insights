//LOADER
onload = () =>{
    const load = document.getElementById('load')

    setTimeout(() =>{
        load.style.display ='none'
    }, 1300)
}
//-------------------------------------------------------------------
// JS PARA EL HEADER
window.addEventListener('scroll', function () {
    var header = document.querySelector('header');
    if (window.scrollY > 0) {
        header.classList.add('sticky', 'scroll-active');
    } else {
        header.classList.remove('sticky', 'scroll-active');
    }
});


// PARA EL ICONO DE HAMBURGUESA
const menuHamburger = document.querySelector(".menu-hamburger")
const navLinks = document.querySelector(".nav-links")

menuHamburger.addEventListener('click', () => {
    navLinks.classList.toggle('mobile-menu')
});

//PARA EL ICONO HAMBURGUESA ANIMADO
function myFunction(x) {
    x.classList.toggle("change");
}

// PARA EL SCROLL SUAVE AL DAR CLIC EN LOS ENLACES DE NAVEGACIÓN
const smoothScrollTo = (target) => {
    const headerHeight = document.querySelector('header').offsetHeight;
    const element = document.querySelector(target);
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition - headerHeight;

    window.scrollBy({
        top: offsetPosition,
        behavior: 'smooth'
    });

    // Cerrar el menú hamburguesa después de hacer clic en un enlace y restaurar el ícono
    navLinks.classList.remove('mobile-menu');
    const menuHamburgerIcon = document.querySelector(".menu-hamburger");
    myFunction(menuHamburgerIcon);
};

const navLinksList = document.querySelectorAll('.nav-links a');
navLinksList.forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault(); // Previene el comportamiento predeterminado del clic en el enlace (salto brusco)
        const target = link.getAttribute('href');
        smoothScrollTo(target);
    });
});

// PARA EL EFECTO ACTIVE DEL HEADER
$(document).ready(function () {
    // Función para agregar/eliminar la clase "active" en la navegación
    function setActiveLink() {
        var scrollPosition = $(window).scrollTop();

        // Itera a través de cada sección y verifica si está visible en la ventana
        $('section').each(function () {
            var topOffset = $(this).offset().top - 100; // Considera un offset de 100px para ajuste
            var bottomOffset = topOffset + $(this).outerHeight();
            var sectionId = $(this).attr('id');

            if (scrollPosition >= topOffset && scrollPosition <= bottomOffset) {
                // Agrega la clase "active" al enlace correspondiente en la navegación
                $('nav ul li a').removeClass('active');
                $('nav ul li a[href="#' + sectionId + '"]').addClass('active');
            }
        });
    }

    // Llama a la función cuando la página se carga y cuando se desplaza
    $(window).on('load scroll', setActiveLink);
});

//-----------------------------------------------------------------------------------------------------------------
// PARA LA SECCION DE INICIO

// Inicializa el carrusel 
var swiper = new Swiper(".swiper-container", {
    loop: true, // Para que el carrusel se reproduzca infinitamente
    autoplay: {
        delay: 2000, // Tiempo de transición entre imágenes (en milisegundos)
        disableOnInteraction: false, // Para que el carrusel no se detenga al interactuar con él
    },
});

//-----------------------------------------------------------------------------------------------------------------
// PARA LA SECCION DE MIEMBROS DEL EQUIPO
const wrapper = document.querySelector(".team-section .wrapper");
const carousel = document.querySelector(".team-section .carousel");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const arrowBtns = document.querySelectorAll(".team-section .wrapper i");
const carouselChildrens = [...carousel.children];

let isDragging = false, startX, startScrollLeft;

// Get the number of cards that can fit in the carousel at once
let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

// Insert copies of the last few cards to beginning of carousel for infinite scrolling
carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});

// Insert copies of the first few cards to end of carousel for infinite scrolling
carouselChildrens.slice(0, cardPerView).forEach(card => {
    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

// Scroll the carousel at appropriate postition to hide first few duplicate cards on Firefox
carousel.classList.add("no-transition");
carousel.scrollLeft = carousel.offsetWidth;
carousel.classList.remove("no-transition");

// Add event listeners for the arrow buttons to scroll the carousel left and right
arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
    });
});

const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add("dragging");
    // Records the initial cursor and scroll position of the carousel
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
    if (!isDragging) return; // if isDragging is false return from here
    // Updates the scroll position of the carousel based on the cursor movement
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}

const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
}

const infiniteScroll = () => {
    // If the carousel is at the beginning, scroll to the end
    if (carousel.scrollLeft === 0) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
        carousel.classList.remove("no-transition");
    }
    // If the carousel is at the end, scroll to the beginning
    else if (Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition");
    }
}

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);

//-----------------------------------------------------------------------------------------------------------------
// PARA LA SECCION DE GRAFICAS

// Obtener el elemento título de la gráfica 1 y establecer su contenido
var grafica1Titulo = document.getElementById("tituloGrafica1");
grafica1Titulo.textContent = "Índice de desempleo en los años 2019 y 2020";

// Obtener el elemento título de la gráfica 2 y establecer su contenido
var grafica2Titulo = document.getElementById("tituloGrafica2");
grafica2Titulo.textContent = "Índice de desempleo por género año 2020";

// Obtener el elemento título de la gráfica 3 y establecer su contenido
var grafica2Titulo = document.getElementById("tituloGrafica3");
grafica2Titulo.textContent = "Índice de desempleo por edad año 2020";

// Obtener el elemento título de la gráfica 4 y establecer su contenido
var grafica2Titulo = document.getElementById("tituloGrafica4");
grafica2Titulo.textContent = "Índice de subempleo por género año 2020";

// Obtener el elemento título de la gráfica 5 y establecer su contenido
var grafica2Titulo = document.getElementById("tituloGrafica5");
grafica2Titulo.textContent = "Índice de subempleo por edad año 2020";

// Datos para la gráfica 1 (pastel)
const data1 = {
    labels: ["2019", "2020"],
    datasets: [{
        label: "% Taza de desempleo 2019-2020",
        data: [4.2, 5.2], // Tasas de desempleo 2019-2020
        backgroundColor: [
            "rgba(255, 99, 132, 0.5)",
            "rgba(54, 162, 235, 0.5)"
        ],
        borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)"
        ],
        borderWidth: 1
    }]
};

// Datos para la gráfica 2 (barras)
const data2 = {
    labels: ["Hombre", "Mujer"],
    datasets: [{
        label: "% Tasa de Desempleo (2019)",
        data: [8.4, 10.0], // Tasas de desempleo por género en 2019
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1
    },
    {
        label: "% Tasa de Desempleo (2020)",
        data: [10.5, 13.3], // Tasas de desempleo por género en 2020
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1
    }]
};

// Datos para la gráfica 3 (barras)
const data3 = {
    labels: ["15-24 años", "25-34 años", "35-44 años", "45-64 años", "+65 años"],
    datasets: [{
        label: "% Tasa de Desempleo (2019)",
        data: [25.1, 10.5, 6.2, 6.0, 3.2], // Tasas de desempleo por edad en 2019
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1
    },
    {
        label: "% Tasa de Desempleo (2020)",
        data: [24.8, 12.7, 9.1, 9.1, 5.2], // Tasas de desempleo por edad en 2020
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1
    }]
};

// Datos para la gráfica 4 (barras)
const data4 = {
    labels: ["Hombre", "Mujer"],
    datasets: [{
        label: "% Tasa de Subempleo (2019)",
        data: [9.9, 13.2], // Tasas de subempleo por género en 2019
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1
    },
    {
        label: "% Tasa de Subempleo (2020)",
        data: [19.7, 23.5], // Tasas de subempleo por género en 2020
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1
    }]
};

// Datos para la gráfica 5 (barras)
const data5 = {
    labels: ["15-24 años", "25-34 años", "35-44 años", "45-64 años", "+65 años"],
    datasets: [{
        label: "% Tasa de Subempleo (2019)",
        data: [10.6, 9.1, 12.2, 13.1, 12.3], // Tasas de subempleo por edad en 2019
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1
    },
    {
        label: "% Tasa de Subempleo (2020)",
        data: [21.7, 20.0, 21.4, 22.7, 22.7], // Tasas de subempleo por edad en 2020
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1
    }]
};

// Opciones para las gráficas
const options = {
    responsive: true,
    maintainAspectRatio: false // Permite mantener el tamaño en pantallas pequeñas
};

// Crear gráficas utilizando Chart.js

// Variables para mantener las instancias de las gráficas
let grafica1, grafica2, grafica3, grafica4, grafica5;

// Función para crear la gráfica 1
function crearGrafica1() {
    if (grafica1) {
        grafica1.destroy();
    }
    grafica1 = new Chart(document.getElementById("grafica1"), {
        type: "pie", // Cambiado a "pie" para la gráfica de pastel
        data: data1,
        options: options
    });
}

// Función para crear la gráfica 2
function crearGrafica2() {
    if (grafica2) {
        grafica2.destroy();
    }
    grafica2 = new Chart(document.getElementById("grafica2"), {
        type: "bar", // Cambiado a "bar" para el diagrama de barras
        data: data2,
        options: options
    });
}

// Función para crear la gráfica 3
function crearGrafica3() {
    if (grafica3) {
        grafica3.destroy();
    }
    grafica3 = new Chart(document.getElementById("grafica3"), {
        type: "bar", // Tipo de gráfica en "bar" (barras)
        data: data3,
        options: options
    });
}

// Función para crear la gráfica 4
function crearGrafica4() {
    if (grafica4) {
        grafica4.destroy();
    }
    grafica4 = new Chart(document.getElementById("grafica4"), {
        type: "bar", // Tipo de gráfica en "bar" (barras)
        data: data4,
        options: options
    });
}

// Función para crear la gráfica 5
function crearGrafica5() {
    if (grafica5) {
        grafica5.destroy();
    }
    grafica5 = new Chart(document.getElementById("grafica5"), {
        type: "bar", // Tipo de gráfica en "bar" (barras)
        data: data5,
        options: options
    });
}

// Variable para controlar si las gráficas ya se han activado
let graficasActivadas = false;

// Función para activar las gráficas si la sección está visible
function activarGraficas() {
    const seccionGraficas = document.querySelector('.graficas-section');
    const seccionRect = seccionGraficas.getBoundingClientRect();

    // Verificar si la sección de gráficas está al menos 50% visible en la ventana
    if (seccionRect.top < window.innerHeight * 0.5 && seccionRect.bottom > window.innerHeight * 0.5) {
        if (!graficasActivadas) {
            crearGrafica1();
            crearGrafica2();
            crearGrafica3();
            crearGrafica4();
            crearGrafica5();
            graficasActivadas = true;
        }
    } else {
        graficasActivadas = false;
    }
}

// Llamar a la función al cargar la página y al desplazarse
document.addEventListener('DOMContentLoaded', activarGraficas);
window.addEventListener('scroll', activarGraficas);


//-----------------------------------------------------------------------------------------------------------------
// PARA EL MODO OSCURO
// Función para cambiar el modo y la imagen del icono
function toggleMode() {
    const body = document.body;
    const currentMode = body.getAttribute("data-theme");
    const newMode = currentMode === "light" ? "dark" : "light";

    // Cambiar el modo
    body.setAttribute("data-theme", newMode);

    // Cambiar la imagen del icono
    const icon = document.querySelector("#dark-mode-toggle img");
    if (newMode === "dark") {
        icon.setAttribute("src", "../assets/icons/icon-light.png");
        icon.setAttribute("alt", "Modo Claro");
    } else {
        icon.setAttribute("src", "../assets/icons/icon-dark.png");
        icon.setAttribute("alt", "Modo Oscuro");
    }
}

// Evento para cambiar el modo y la imagen al hacer clic en el icono
document.getElementById("dark-mode-toggle").addEventListener("click", toggleMode);

// Funcion para que el icono tenga un efecto automatico cada intervalo de tiempo
function addJumpEffect() {
    const toggleImage = document.querySelector('#dark-mode-toggle img');
    toggleImage.classList.add('jump');
    setTimeout(() => {
        toggleImage.classList.remove('jump');
    }, 300); // Remueve la clase de salto después de 300 ms (0.3 segundos)
}

setInterval(addJumpEffect, 5000); // Ejecuta la función cada 30000 ms (30 segundos)
