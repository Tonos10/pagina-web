/* =========================================
   js/pago-en-linea.js — Copia de tarjeta en pago-en-linea.html
   ========================================= */

(function () {
  'use strict';

  const botonCopiar = document.getElementById('copy-btn');
  const estadoCopiado = document.getElementById('copy-status');
  const elementoNumero = document.querySelector('.number');

  if (!botonCopiar || !estadoCopiado || !elementoNumero) return;

  const numeroTarjeta = elementoNumero.textContent.trim();

  function mostrarEstadoCopiado(texto, color) {
    estadoCopiado.textContent = texto;
    estadoCopiado.style.color = color;
  }

  function copiarConFallback(texto) {
    const areaTemporal = document.createElement('textarea');
    areaTemporal.value = texto;
    areaTemporal.style.cssText = 'position:fixed;left:-9999px';
    document.body.appendChild(areaTemporal);
    areaTemporal.select();
    document.execCommand('copy');
    document.body.removeChild(areaTemporal);
  }

  botonCopiar.addEventListener('click', async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(numeroTarjeta);
      } else {
        copiarConFallback(numeroTarjeta);
      }
      mostrarEstadoCopiado('✓ Numero copiado al portapapeles', '#9fdc90');
    } catch {
      mostrarEstadoCopiado('No se pudo copiar. Usa Ctrl+C.', '#f8a19c');
    }
  });
})();
