/* =============================================================
   ASISTENTE DEL SITIO
   -------------------------------------------------------------
   Una burbuja abajo a la izquierda que contesta preguntas sobre
   el estudio.

   No habla con Google directamente: le habla a NUESTRO ayudante
   (ia.url), que es el único que tiene la clave. Acá no hay
   ninguna clave, y por eso se puede publicar sin riesgo.

   Si ia.url está vacío, esta función devuelve '' y en el sitio
   no aparece absolutamente nada. El resto de la página sigue
   funcionando igual.
   ============================================================= */
window.ChatAsistente = function () {
  var cfg = (window.SITE_DATA.ia) || {};
  if (!cfg.activo || !(cfg.url || '').trim()) return '';

  var sugerencias = (U.t(cfg.sugerencias) || []).map(function (s) {
    return '<button type="button" class="chat__sugerencia">' + U.esc(s) + '</button>';
  }).join('');

  return '' +
  '<div class="chat" id="chat">' +
    '<button type="button" class="chat__burbuja" id="chat-abrir" ' +
      'aria-expanded="false" aria-controls="chat-caja">' +
      window.icon('sparkle', 20) +
      '<span class="chat__burbuja-texto">' + U.te(cfg.titulo) + '</span>' +
    '</button>' +

    '<section class="chat__caja" id="chat-caja" hidden aria-label="' + U.te(cfg.titulo) + '">' +
      '<header class="chat__cabecera">' +
        '<div>' +
          '<strong>' + U.te(cfg.titulo) + '</strong>' +
          '<span>' + U.te(window.SITE_DATA.estudio.nombre) + '</span>' +
        '</div>' +
        '<button type="button" class="chat__cerrar" id="chat-cerrar" aria-label="Cerrar">' +
          window.icon('close', 18) +
        '</button>' +
      '</header>' +

      '<div class="chat__hilo" id="chat-hilo" role="log" aria-live="polite">' +
        '<div class="chat__msj chat__msj--bot">' + U.te(cfg.saludo) + '</div>' +
        (sugerencias ? '<div class="chat__sugerencias">' + sugerencias + '</div>' : '') +
      '</div>' +

      '<form class="chat__pie" id="chat-form">' +
        '<input type="text" id="chat-campo" autocomplete="off" ' +
          'placeholder="' + U.te(cfg.marcador) + '" aria-label="' + U.te(cfg.marcador) + '">' +
        '<button type="submit" class="chat__enviar" aria-label="Enviar">' +
          window.icon('arrowRight', 18) +
        '</button>' +
      '</form>' +
      '<p class="chat__nota">' + U.te(cfg.aviso) + '</p>' +
    '</section>' +
  '</div>';
};

/* Lógica del chat. Se engancha una sola vez y sobrevive a los
   redibujados por cambio de idioma (delegación de eventos). */
(function () {
  'use strict';

  var historial = [];   /* [{ rol:'usuario'|'asistente', texto:'…' }] */
  var esperando = false;

  function cfg() { return (window.SITE_DATA.ia) || {}; }
  function hilo() { return document.getElementById('chat-hilo'); }

  function abajo() {
    var h = hilo();
    if (h) h.scrollTop = h.scrollHeight;
  }

  function burbuja(texto, quien, clase) {
    var h = hilo();
    if (!h) return null;
    var d = document.createElement('div');
    d.className = 'chat__msj chat__msj--' + quien + (clase ? ' ' + clase : '');
    d.textContent = texto;
    h.appendChild(d);
    abajo();
    return d;
  }

  function abrir(si) {
    var caja = document.getElementById('chat-caja');
    var btn = document.getElementById('chat-abrir');
    if (!caja || !btn) return;
    caja.hidden = !si;
    btn.setAttribute('aria-expanded', si ? 'true' : 'false');
    document.getElementById('chat').classList.toggle('chat--abierto', si);
    if (si) {
      var c = document.getElementById('chat-campo');
      if (c) c.focus();
      abajo();
    }
  }

  async function preguntar(texto) {
    if (esperando || !texto.trim()) return;
    esperando = true;

    var sug = document.querySelector('.chat__sugerencias');
    if (sug) sug.remove();

    burbuja(texto, 'yo');
    historial.push({ rol: 'usuario', texto: texto });

    var pensando = burbuja(U.t(cfg().escribiendo) || '…', 'bot', 'chat__msj--pensando');

    try {
      var r = await fetch(cfg().url.replace(/\/$/, '') + '/preguntar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idioma: U.idioma(), mensajes: historial.slice(-10) })
      });

      var j = await r.json().catch(function () { return {}; });
      if (!r.ok || !j.respuesta) throw new Error(j.error || 'sin respuesta');

      pensando.classList.remove('chat__msj--pensando');
      pensando.textContent = j.respuesta;
      historial.push({ rol: 'asistente', texto: j.respuesta });
    } catch (e) {
      pensando.classList.remove('chat__msj--pensando');
      pensando.classList.add('chat__msj--falla');
      pensando.textContent = U.t(cfg().sinServicio) ||
        'No pude responder ahora. Escribinos por WhatsApp.';
    }

    esperando = false;
    abajo();
  }

  document.addEventListener('click', function (ev) {
    if (ev.target.closest('#chat-abrir')) {
      abrir(document.getElementById('chat-caja').hidden);
      return;
    }
    if (ev.target.closest('#chat-cerrar')) { abrir(false); return; }

    var s = ev.target.closest('.chat__sugerencia');
    if (s) { preguntar(s.textContent); return; }
  });

  document.addEventListener('submit', function (ev) {
    if (!ev.target.matches('#chat-form')) return;
    ev.preventDefault();
    var campo = document.getElementById('chat-campo');
    var t = campo.value;
    campo.value = '';
    preguntar(t);
  });

  document.addEventListener('keydown', function (ev) {
    if (ev.key === 'Escape') abrir(false);
  });
})();
