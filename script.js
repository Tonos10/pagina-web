/* MOSTRAR/OCULTAR MENÚ */
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close');

/* Mostrar menú */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu');
    });
}

/* Ocultar menú */
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu');
    });
}

/* QUITAR MENÚ AL HACER CLIC EN UN ENLACE (MÓVIL) */
const navLink = document.querySelectorAll('.nav__link');

function linkAction(){
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.remove('show-menu');
}
navLink.forEach(n => n.addEventListener('click', linkAction));


/* CAMBIAR COLOR DEL HEADER AL HACER SCROLL */
function scrollHeader(){
    const header = document.getElementById('header');
    if(this.scrollY >= 50) header.classList.add('scroll-header'); else header.classList.remove('scroll-header');
}
window.addEventListener('scroll', scrollHeader);


/* SECCIÓN ACTIVA EN EL MENÚ SEGÚN SCROLL */
const sections = document.querySelectorAll('section[id]');

function scrollActive(){
    const scrollY = window.pageYOffset;

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 58,
              sectionId = current.getAttribute('id');

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link');
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link');
        }
    });
}
window.addEventListener('scroll', scrollActive);


/* SIMULACIÓN DE CARRITO DE COMPRAS */
const cartButtons = document.querySelectorAll('.producto__card .button');

cartButtons.forEach(button => {
    button.addEventListener('click', () => {
        alert('Producto añadido al carrito (simulación). ¡Necesitarás una pasarela de pago real para procesar la compra!');
    });
});

/* SIMULACIÓN DE BOTONES DE PAGO */
const paymentButtons = document.querySelectorAll('.pago__card .button');

paymentButtons.forEach(button => {
    button.addEventListener('click', () => {
        alert('Redirigiendo a pasarela de pago segura (simulación). Aquí se integraría Stripe, MercadoPago, etc.');
    });
});
