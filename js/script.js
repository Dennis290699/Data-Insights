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
grafica1Titulo.textContent = "Diagrama de Barras";

// Obtener el elemento título de la gráfica 2 y establecer su contenido
var grafica2Titulo = document.getElementById("tituloGrafica2");
grafica2Titulo.textContent = "Diagrama de pastel";

// Datos para las gráficas (ejemplo)
const data1 = {
    labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo"],
    datasets: [{
        label: "Datos de ejemplo 1",
        data: [12, 19, 3, 5, 2],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1
    }]
};

const data2 = {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple"],
    datasets: [{
        label: "Datos de ejemplo 2",
        data: [12, 19, 3, 5, 2],
        backgroundColor: [
            "rgba(255, 99, 132, 0.5)",
            "rgba(54, 162, 235, 0.5)",
            "rgba(255, 206, 86, 0.5)",
            "rgba(75, 192, 192, 0.5)",
            "rgba(153, 102, 255, 0.5)"
        ],
        borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)"
        ],
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
let grafica1, grafica2;

// Función para crear la gráfica 1
function crearGrafica1() {
    if (grafica1) {
        grafica1.destroy(); // Destruir la instancia anterior si existe
    }
    grafica1 = new Chart(document.getElementById("grafica1"), {
        type: "bar",
        data: data1,
        options: options
    });
}

// Función para crear la gráfica 2
function crearGrafica2() {
    if (grafica2) {
        grafica2.destroy(); // Destruir la instancia anterior si existe
    }
    grafica2 = new Chart(document.getElementById("grafica2"), {
        type: "pie",
        data: data2,
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
