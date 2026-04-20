/* =========================================
   js/paquetes.js — Paquetes, mensualidades y métodos de pago
   ========================================= */

(function () {
  'use strict';

  const NUMERO_PAGOS = '5212226762422';
  const CLABE = '012345678901234567'; // ← ACTUALIZA con tu CLABE real

  let planActual = '';

  /* -----------------------------------------
     1. MODAL WHATSAPP — abre y cierra
     ----------------------------------------- */
  window.abrirModalPaquete = function (nombreDelPlan) {
    planActual = nombreDelPlan;
    const etiqueta = document.getElementById('paquete-nombre-modal');
    if (etiqueta) etiqueta.textContent = nombreDelPlan;
    const modal = document.getElementById('modal-paquete');
    if (modal) modal.style.display = 'block';
  };

  /* Alias para compatibilidad con index.html */
  window.contratarMensualidad = window.abrirModalPaquete;

  window.cerrarModalPaquete = function () {
    const modal = document.getElementById('modal-paquete');
    if (!modal) return;
    modal.style.display = 'none';
    const input = document.getElementById('nombre-paquete-cliente');
    if (input) input.value = '';
    planActual = '';
  };

  window.enviarWhatsAppPaquete = function () {
    const nombre = document.getElementById('nombre-paquete-cliente').value.trim();
    if (!nombre) { alert('Por favor, ingresa tu nombre completo.'); return; }

    const msg = `¡Hola! Me interesa inscribirme.\n\nPlan: *${planActual}*\nNombre: ${nombre}\n\n¿Me pueden indicar los pasos para realizar el pago?`;
    window.open(`https://wa.me/${NUMERO_PAGOS}?text=${encodeURIComponent(msg)}`, '_blank');
    cerrarModalPaquete();
  };

  /* -----------------------------------------
     2. MERCADOPAGO — redirige al link de pago
     ----------------------------------------- */
  window.pagarMP = function (linkPago, nombrePlan) {
    if (!linkPago || linkPago.includes('TU_LINK')) {
      /* Si el link aún no está configurado, redirige a WhatsApp */
      const msg = `¡Hola! Quiero pagar por MercadoPago el: *${nombrePlan}*\n¿Me pueden enviar el link de pago?`;
      window.open(`https://wa.me/${NUMERO_PAGOS}?text=${encodeURIComponent(msg)}`, '_blank');
      return;
    }
    window.open(linkPago, '_blank');
  };

  /* -----------------------------------------
     3. MODAL SPEI — muestra datos bancarios
     ----------------------------------------- */
  window.abrirSPEI = function (nombrePlan, monto) {
    planActual = nombrePlan;

    const elPlan   = document.getElementById('spei-plan-nombre');
    const elMonto  = document.getElementById('spei-plan-monto');
    const elConc   = document.getElementById('spei-concepto');

    if (elPlan)  elPlan.textContent  = nombrePlan;
    if (elMonto) elMonto.textContent = `$${Number(monto).toLocaleString('es-MX')} MXN`;
    if (elConc)  elConc.textContent  = `PAGO ${nombrePlan.toUpperCase()}`;

    const modal = document.getElementById('modal-spei');
    if (modal) modal.style.display = 'block';
  };

  window.cerrarModalSPEI = function () {
    const modal = document.getElementById('modal-spei');
    if (modal) modal.style.display = 'none';
    planActual = '';
  };

  /* Copia la CLABE al portapapeles */
  window.copiarCLABE = async function () {
    const btn = document.getElementById('btn-copy-clabe');
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(CLABE);
      } else {
        const ta = document.createElement('textarea');
        ta.value = CLABE;
        ta.style.cssText = 'position:fixed;left:-9999px';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }
      if (btn) {
        btn.classList.add('copiado');
        btn.innerHTML = '<i class="fas fa-check"></i> Copiada';
        setTimeout(() => {
          btn.classList.remove('copiado');
          btn.innerHTML = '<i class="fas fa-copy"></i> Copiar';
        }, 2500);
      }
    } catch {
      alert('No se pudo copiar automáticamente. Copia manualmente: ' + CLABE);
    }
  };

  /* -----------------------------------------
     4. CERRAR MODALES AL HACER CLIC FUERA
     ----------------------------------------- */
  window.addEventListener('click', e => {
    const modalPaquete = document.getElementById('modal-paquete');
    const modalSPEI    = document.getElementById('modal-spei');

    if (modalPaquete && e.target === modalPaquete) cerrarModalPaquete();
    if (modalSPEI    && e.target === modalSPEI)    cerrarModalSPEI();
  });
})();
