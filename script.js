/* =========================================
   [ 1 ] NAV MENU & SCROLL LOGIC
   ========================================= */
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

/* Quitar menú al hacer clic en enlace */
const navLink = document.querySelectorAll('.nav__link');
function linkAction(){
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.remove('show-menu');
}
navLink.forEach(n => n.addEventListener('click', linkAction));

/* Cambiar color header al scroll */
function scrollHeader(){
    const header = document.getElementById('header');
    if(this.scrollY >= 50) header.classList.add('scroll-header'); else header.classList.remove('scroll-header');
}
window.addEventListener('scroll', scrollHeader);

/* Sección activa link */
const sections = document.querySelectorAll('section[id]');
const navLinks = {};
sections.forEach(section => {
    const sectionId = section.getAttribute('id');
    const link = document.querySelector(`.nav__menu a[href*=${sectionId}]`);
    if (link) {
        navLinks[sectionId] = link;
    }
});

function scrollActive(){
    const scrollY = window.pageYOffset;
    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 58,
              sectionId = current.getAttribute('id');
        const link = navLinks[sectionId];
        if(link && scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            link.classList.add('active-link');
        } else if (link) {
            link.classList.remove('active-link');
        }
    });
}
window.addEventListener('scroll', scrollActive);


/* =========================================
   [ 2 ] LÓGICA DEL MODAL DE TIENDA (PRODUCTOS)
   ========================================= */
let productoActual = '';
const NUMERO_TIENDA = '5212211787979'; // Número para pedidos de tienda

// Helpers
function esGuante(nombre) {
    return nombre.toLowerCase().includes('guante'); 
}
function necesitaTalla(nombre) {
    const nombreLower = nombre.toLowerCase();
    return nombreLower.includes('playera') || nombreLower.includes('sudadera');
}

// Abrir Modal
function abrirModal(nombreProducto) {
    productoActual = nombreProducto;
    document.getElementById('producto-nombre-modal').textContent = nombreProducto;
    
    // Obtener elementos
    const opcionTalla = document.getElementById('opcion-talla');
    const opcionOnzas = document.getElementById('opcion-onzas'); 
    const opcionModelo = document.getElementById('opcion-modelo'); 
    const opcionColor = document.getElementById('opcion-color');
    
    const selectTalla = document.getElementById('talla');
    const selectOnzas = document.getElementById('onzas');
    const selectModelo = document.getElementById('modelo'); 
    const selectColor = document.getElementById('color');
    
    // Resetear todo (ocultar y quitar required)
    const elementosOpcion = [opcionTalla, opcionOnzas, opcionModelo, opcionColor];
    const elementosSelect = [selectTalla, selectOnzas, selectModelo, selectColor];
    
    elementosOpcion.forEach(el => { if (el) el.style.display = 'none'; });
    elementosSelect.forEach(el => { if (el) el.removeAttribute('required'); });
    
    // Lógica condicional
    const esTipoGuantes = esGuante(nombreProducto);
    const esTipoTalla = necesitaTalla(nombreProducto);
    const esTipoPlayera = nombreProducto.toLowerCase().includes('playera');

    if (esTipoGuantes) {
        // GUANTES: Onzas y Modelo (SIN Color)
        if (opcionOnzas) opcionOnzas.style.display = 'block';
        if (selectOnzas) selectOnzas.setAttribute('required', 'required');

        if (opcionModelo) opcionModelo.style.display = 'block';
        if (selectModelo) selectModelo.setAttribute('required', 'required');
        
    } else if (esTipoPlayera) {
        // PLAYERA: Talla + Color
        if (opcionTalla) opcionTalla.style.display = 'block';
        if (selectTalla) selectTalla.setAttribute('required', 'required');

        if (opcionColor) opcionColor.style.display = 'block';
        if (selectColor) selectColor.setAttribute('required', 'required');

    } else if (esTipoTalla) {
        // Otras prendas: solo Talla
        if (opcionTalla) opcionTalla.style.display = 'block';
        if (selectTalla) selectTalla.setAttribute('required', 'required');
        
    } else {
        // OTROS (Vendas, Bucales): Color
        if (opcionColor) opcionColor.style.display = 'block';
        if (selectColor) selectColor.setAttribute('required', 'required');
    }
    
    const modal = document.getElementById('modal-pedido');
    if (modal) modal.style.display = 'block';
}

// Cerrar Modal
function cerrarModal() {
    const modal = document.getElementById('modal-pedido');
    if (modal) {
        modal.style.display = 'none';
        
        // Limpiar
        const ids = ['talla', 'onzas', 'modelo', 'color', 'nombre'];
        ids.forEach(id => {
            const el = document.getElementById(id);
            if(el) el.value = '';
        });
        productoActual = '';
    }
}

// Enviar WhatsApp Tienda
function enviarWhatsApp() {
    const nombreCliente = document.getElementById('nombre').value.trim();
    const esTipoGuantes = esGuante(productoActual);
    const esTipoTalla = necesitaTalla(productoActual);
    let detalles = []; 

    // Validar según tipo
    if (esTipoGuantes) {
        const onzas = document.getElementById('onzas').value;
        const modelo = document.getElementById('modelo').value; 
        if (!onzas || !modelo) { 
            alert('Por favor, selecciona Onzas y Modelo.'); return; 
        }
        detalles.push(`Modelo: ${modelo}`, `Onzas: ${onzas}`);
        
    } else if (esTipoTalla) {
        const talla = document.getElementById('talla').value;
        if (!talla) { alert('Selecciona una Talla.'); return; }
        detalles.push(`Talla: ${talla}`);

    } else {
        const color = document.getElementById('color').value;
        if (!color) { alert('Selecciona un Color.'); return; }
        detalles.push(`Color: ${color}`);
    }

    if (!nombreCliente) {
        alert('Ingresa tu nombre.');
        return; 
    }

    // Construir URL
    let mensaje = `¡Hola! Me gustaría comprar: ${productoActual}`;
    if (detalles.length > 0) mensaje += `\nDetalles: ${detalles.join(', ')}`;
    mensaje += `\nCliente: ${nombreCliente}`;
    
    const url = `https://wa.me/${NUMERO_TIENDA}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
    cerrarModal(); 
}

// Click fuera del modal para cerrar
window.onclick = function(event) {
    const modal = document.getElementById('modal-pedido');
    if (modal && event.target == modal) cerrarModal();
};


/* =========================================
   [ 3 ] LÓGICA DE PAQUETES Y MENSUALIDADES (ACTUALIZADO CON MODAL)
   ========================================= */
let planActual = ''; // Variable para guardar qué plan seleccionó
const NUMERO_PAGOS = '5212226762422'; // Número para inscripciones

// 1. Función que se llama desde los botones de HTML
function contratarMensualidad(nombreDelPlan) {
    planActual = nombreDelPlan;
    
    // Poner el nombre del plan en el título del modal
    const etiquetaNombre = document.getElementById('paquete-nombre-modal');
    if(etiquetaNombre) etiquetaNombre.textContent = nombreDelPlan;
    
    // Mostrar el modal
    const modal = document.getElementById('modal-paquete');
    if(modal) modal.style.display = 'block';
}

// 2. Función para cerrar el modal de paquetes
function cerrarModalPaquete() {
    const modal = document.getElementById('modal-paquete');
    if (modal) {
        modal.style.display = 'none';
        // Limpiar el input de nombre
        document.getElementById('nombre-paquete-cliente').value = '';
        planActual = '';
    }
}

// 3. Función para enviar el WhatsApp desde el nuevo modal
function enviarWhatsAppPaquete() {
    const nombreCliente = document.getElementById('nombre-paquete-cliente').value.trim();
    
    if (!nombreCliente) {
        alert('Por favor, ingresa tu nombre completo.');
        return;
    }
    
    let mensaje = `¡Hola! Me interesa inscribirme o agendar.`;
    mensaje += `\n\nPlan seleccionado: *${planActual}*`;
    mensaje += `\nMi nombre es: ${nombreCliente}`;
    mensaje += `\n\n¿Me podrían indicar los pasos para realizar el pago?`;
    
    const url = `https://wa.me/${NUMERO_PAGOS}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
    
    cerrarModalPaquete();
}

// Click fuera del modal para cerrar (ACTUALIZADO PARA CERRAR AMBOS MODALES)
window.onclick = function(event) {
    const modalTienda = document.getElementById('modal-pedido');
    const modalPaquete = document.getElementById('modal-paquete');
    
    if (modalTienda && event.target == modalTienda) {
        cerrarModal();
    }
    if (modalPaquete && event.target == modalPaquete) {
        cerrarModalPaquete();
    }
};

    /* =========================================
   [ 4 ] LÓGICA DE LA MINI GALERÍA (CARRUSEL)
   ========================================= */

function iniciarMiniGalerias() {
    console.log("Iniciando sistema de galerías..."); // Esto nos dirá si el código arranca

    // 1. Buscamos todas las galerías en la página
    const galeriasProductos = document.querySelectorAll('.js-mini-galeria');

    if (galeriasProductos.length === 0) {
        console.warn("No se encontraron galerías con la clase .js-mini-galeria");
        return;
    }

    galeriasProductos.forEach(galeria => {
        // 2. Seleccionamos los elementos DENTRO de esta galería específica
        const track = galeria.querySelector('.mini-galeria__track');
        // Convertimos los hijos (li) en un Array real para poder usarlos
        const slides = Array.from(track.children);
        const btnDerecha = galeria.querySelector('.mini-galeria__btn--der');
        const btnIzquierda = galeria.querySelector('.mini-galeria__btn--izq');

        // 3. Calculamos el ancho de la primera imagen para saber cuánto mover
        // Usamos el ancho del contenedor por si la imagen no ha cargado al 100%
        const slideWidth = galeria.getBoundingClientRect().width;
        console.log("Ancho detectado para el carrusel: " + slideWidth + "px");

        // 4. Acomodamos las imágenes una al lado de la otra
        // Slide 0: 0px, Slide 1: 300px, Slide 2: 600px...
        slides.forEach((slide, index) => {
            slide.style.left = slideWidth * index + 'px';
        });

        // Función para mover el riel
        const moverSlide = (track, slideActual, slideDestino) => {
            // Movemos todo el track hacia la izquierda la cantidad necesaria
            track.style.transform = 'translateX(-' + slideDestino.style.left + ')';
            
            // Actualizamos la clase 'activo'
            slideActual.classList.remove('activo');
            slideDestino.classList.add('activo');
        };

        // Función para ocultar flechas si estamos en el inicio o final
        const gestionarFlechas = (slides, btnIzq, btnDer, indiceDestino) => {
            if (indiceDestino === 0) {
                btnIzq.classList.add('oculto');
                btnDer.classList.remove('oculto');
            } else if (indiceDestino === slides.length - 1) {
                btnIzq.classList.remove('oculto');
                btnDer.classList.add('oculto');
            } else {
                btnIzq.classList.remove('oculto');
                btnDer.classList.remove('oculto');
            }
        };

        // --- EVENT LISTENER: BOTÓN DERECHA ---
        btnDerecha.addEventListener('click', e => {
            console.log("Click en derecha"); // Debug
            const slideActual = track.querySelector('.activo');
            // Si no hay clase activo, asumimos que es el primero
            const actual = slideActual || slides[0]; 
            const slideSiguiente = actual.nextElementSibling;
            
            if (slideSiguiente) {
                const siguienteIndice = slides.findIndex(slide => slide === slideSiguiente);
                moverSlide(track, actual, slideSiguiente);
                gestionarFlechas(slides, btnIzquierda, btnDerecha, siguienteIndice);
            }
        });

        // --- EVENT LISTENER: BOTÓN IZQUIERDA ---
        btnIzquierda.addEventListener('click', e => {
            console.log("Click en izquierda"); // Debug
            const slideActual = track.querySelector('.activo');
            const actual = slideActual || slides[0];
            const slideAnterior = actual.previousElementSibling;
            
            if (slideAnterior) {
                const anteriorIndice = slides.findIndex(slide => slide === slideAnterior);
                moverSlide(track, actual, slideAnterior);
                gestionarFlechas(slides, btnIzquierda, btnDerecha, anteriorIndice);
            }
        });
    });
}

// Ejecutar cuando toda la página (imágenes incluidas) haya cargado
window.addEventListener('load', iniciarMiniGalerias);
