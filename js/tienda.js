/* =========================================
   js/tienda.js — Modal de tienda y mini galería
   ========================================= */

(function () {
  'use strict';

  const NUMERO_TIENDA = '5212211787979';
  let productoActual = '';

  /* -----------------------------------------
     HELPERS
     ----------------------------------------- */
  const esGuante   = n => n.toLowerCase().includes('guante');
  const esPlayera  = n => n.toLowerCase().includes('playera');
  const necesitaTalla = n => ['playera', 'sudadera'].some(p => n.toLowerCase().includes(p));

  /* -----------------------------------------
     ABRIR MODAL
     ----------------------------------------- */
  window.abrirModal = function (nombreProducto) {
    productoActual = nombreProducto;
    document.getElementById('producto-nombre-modal').textContent = nombreProducto;

    const ids = ['talla', 'onzas', 'modelo', 'color'];
    ids.forEach(id => {
      const wrap   = document.getElementById(`opcion-${id}`);
      const select = document.getElementById(id);
      if (wrap)   wrap.style.display = 'none';
      if (select) select.removeAttribute('required');
    });

    const show = (id) => {
      const wrap   = document.getElementById(`opcion-${id}`);
      const select = document.getElementById(id);
      if (wrap)   wrap.style.display = 'block';
      if (select) select.setAttribute('required', 'required');
    };

    if (esGuante(nombreProducto)) {
      show('onzas');
      show('modelo');
    } else if (esPlayera(nombreProducto)) {
      show('talla');
      show('color');
    } else if (necesitaTalla(nombreProducto)) {
      show('talla');
    } else {
      show('color');
    }

    document.getElementById('modal-pedido').style.display = 'block';
  };

  /* -----------------------------------------
     CERRAR MODAL
     ----------------------------------------- */
  window.cerrarModal = function () {
    const modal = document.getElementById('modal-pedido');
    if (!modal) return;
    modal.style.display = 'none';
    ['talla', 'onzas', 'modelo', 'color', 'nombre'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.value = '';
    });
    productoActual = '';
  };

  /* -----------------------------------------
     ENVIAR WHATSAPP TIENDA
     ----------------------------------------- */
  window.enviarWhatsApp = function () {
    const nombreCliente = document.getElementById('nombre').value.trim();
    let detalles = [];

    if (esGuante(productoActual)) {
      const onzas  = document.getElementById('onzas').value;
      const modelo = document.getElementById('modelo').value;
      if (!onzas || !modelo) { alert('Por favor, selecciona Onzas y Modelo.'); return; }
      detalles.push(`Modelo: ${modelo}`, `Onzas: ${onzas}`);

    } else if (esPlayera(productoActual)) {
      const talla = document.getElementById('talla').value;
      const color = document.getElementById('color').value;
      if (!talla || !color) { alert('Selecciona Talla y Color.'); return; }
      detalles.push(`Talla: ${talla}`, `Color: ${color}`);

    } else if (necesitaTalla(productoActual)) {
      const talla = document.getElementById('talla').value;
      if (!talla) { alert('Selecciona una Talla.'); return; }
      detalles.push(`Talla: ${talla}`);

    } else {
      const color = document.getElementById('color').value;
      if (!color) { alert('Selecciona un Color.'); return; }
      detalles.push(`Color: ${color}`);
    }

    if (!nombreCliente) { alert('Ingresa tu nombre.'); return; }

    const msg = `¡Hola! Me gustaría comprar: ${productoActual}\nDetalles: ${detalles.join(', ')}\nCliente: ${nombreCliente}`;
    window.open(`https://wa.me/${NUMERO_TIENDA}?text=${encodeURIComponent(msg)}`, '_blank');
    cerrarModal();
  };

  /* -----------------------------------------
     CERRAR AL HACER CLIC FUERA DEL MODAL
     ----------------------------------------- */
  window.addEventListener('click', e => {
    const modal = document.getElementById('modal-pedido');
    if (modal && e.target === modal) cerrarModal();
  });

  /* -----------------------------------------
     MINI GALERÍA DE PRODUCTOS
     ----------------------------------------- */
  function iniciarMiniGalerias() {
    document.querySelectorAll('.js-mini-galeria').forEach(galeria => {
      const track       = galeria.querySelector('.mini-galeria__track');
      const slides      = Array.from(track.children);
      const btnDer      = galeria.querySelector('.mini-galeria__btn--der');
      const btnIzq      = galeria.querySelector('.mini-galeria__btn--izq');
      const slideWidth  = galeria.getBoundingClientRect().width;

      slides.forEach((slide, i) => { slide.style.left = slideWidth * i + 'px'; });

      function moverA(actual, destino) {
        track.style.transform = `translateX(-${destino.style.left})`;
        actual.classList.remove('activo');
        destino.classList.add('activo');
      }

      function actualizarFlechas(indice) {
        btnIzq.classList.toggle('oculto', indice === 0);
        btnDer.classList.toggle('oculto', indice === slides.length - 1);
      }

      btnDer.addEventListener('click', () => {
        const actual   = track.querySelector('.activo') || slides[0];
        const siguiente = actual.nextElementSibling;
        if (!siguiente) return;
        moverA(actual, siguiente);
        actualizarFlechas(slides.indexOf(siguiente));
      });

      btnIzq.addEventListener('click', () => {
        const actual    = track.querySelector('.activo') || slides[0];
        const anterior  = actual.previousElementSibling;
        if (!anterior) return;
        moverA(actual, anterior);
        actualizarFlechas(slides.indexOf(anterior));
      });
    });
  }

  window.addEventListener('load', iniciarMiniGalerias);
})();
