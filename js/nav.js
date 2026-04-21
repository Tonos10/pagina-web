/* =========================================
   js/nav.js — Navegación, scroll y link activo
   ========================================= */

(function () {
  'use strict';

  /* -----------------------------------------
     1. MENÚ MÓVIL (toggle / close)
     ----------------------------------------- */
  const navMenu   = document.getElementById('nav-menu');
  const navToggle = document.getElementById('nav-toggle');
  const navClose  = document.getElementById('nav-close');

  if (navToggle) {
    navToggle.addEventListener('click', () => navMenu.classList.add('show-menu'));
  }
  if (navClose) {
    navClose.addEventListener('click', () => navMenu.classList.remove('show-menu'));
  }

  /* Cierra el menú al hacer clic en cualquier enlace */
  document.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => navMenu.classList.remove('show-menu'));
  });

  /* -----------------------------------------
     2. FONDO DEL HEADER AL HACER SCROLL
     ----------------------------------------- */
  const header = document.getElementById('header');

  function onScroll() {
    if (!header) return;
    header.classList.toggle('scroll-header', window.scrollY >= 50);
    highlightActiveSection();
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  /* -----------------------------------------
     3. LINK ACTIVO SEGÚN SECCIÓN VISIBLE
     Solo aplica en index.html (donde existen <section id="">)
     ----------------------------------------- */
  const sections = document.querySelectorAll('section[id]');

  function highlightActiveSection() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const top    = section.offsetTop - 58;
      const height = section.offsetHeight;
      const id     = section.getAttribute('id');
      const link   = document.querySelector(`.nav__link[href*="#${id}"]`);

      if (!link) return;

      if (scrollY > top && scrollY <= top + height) {
        link.classList.add('active-link');
      } else {
        link.classList.remove('active-link');
      }
    });
  }
})();

/* =========================================
   PARALLAX DEL LOGO EN SECCIÓN HERO
   ========================================= */
document.addEventListener('DOMContentLoaded', () => {
    const seccionHero = document.querySelector('.hero');
    const elementoGuerrero = document.querySelector('.warrior-wrap');
    const elementoResplandor = document.querySelector('.glow-wrap');
    
    // Solo ejecuta si estamos en la página que tiene esta sección
    if (seccionHero && elementoGuerrero && elementoResplandor) {
        
        const esDispositivoMovil = () => window.innerWidth < 768;
        
        window.addEventListener('scroll', () => {
            const rectangulo = seccionHero.getBoundingClientRect();
            const alturaHero = seccionHero.offsetHeight;
            
            /* % de cuánto se ha scrolleado dentro del hero */
            const progreso = -rectangulo.top / alturaHero;
            const limite = Math.max(0, Math.min(1, progreso));
            
            if (esDispositivoMovil()) {
                /* Móvil: se mueve hacia arriba para despejar el texto */
                const offsetY = limite * -100;
                elementoGuerrero.style.transform = `translateX(-50%) translateY(calc(-50% + ${offsetY}px))`;
                elementoResplandor.style.transform = `translateX(-50%) translateY(calc(-50% + ${offsetY * 0.5}px))`;
            } else {
                /* Desktop: se mueve hacia la derecha escondiéndose gradualmente */
                const offsetX = limite * 150; 
                elementoGuerrero.style.transform = `translateY(-50%) translateX(${offsetX}px)`;
                elementoResplandor.style.transform = `translateY(-50%) translateX(${offsetX * 0.6}px)`;
            }
        }, { passive: true });
    }
});
