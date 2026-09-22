/* =============================================================
   MAIN — monta los componentes e inicializa las interacciones
   ============================================================= */
(function () {
  'use strict';

  var D = window.SITE_DATA;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Render ---------- */
  document.getElementById('app').innerHTML = [
    window.Navbar(),
    '<main id="contenido">',
      window.Hero(),
      window.GiselleSection(),
      window.AboutSection(),
      window.ClassesSection(),
      window.Gallery(),
      window.InstagramSection(),
      window.LocationSection(),
      window.ContactSection(),
    '</main>',
    window.Footer()
  ].join('');

  /* ---------- Navbar: fondo al hacer scroll ---------- */
  var nav = document.getElementById('nav');
  var onScrollNav = function () {
    nav.classList.toggle('is-scrolled', window.scrollY > 40);
  };
  onScrollNav();

  /* ---------- Menú móvil ---------- */
  var burger = document.getElementById('burger');
  var panel = document.getElementById('menu-movil');
  var abierto = false;

  function menu(estado) {
    abierto = estado;
    panel.classList.toggle('is-open', abierto);
    panel.setAttribute('aria-hidden', abierto ? 'false' : 'true');
    burger.setAttribute('aria-expanded', abierto ? 'true' : 'false');
    burger.setAttribute('aria-label', abierto ? 'Cerrar menú' : 'Abrir menú');
    burger.innerHTML = window.icon(abierto ? 'close' : 'menu', 20);
    document.body.style.overflow = abierto ? 'hidden' : '';
  }
  burger.addEventListener('click', function () { menu(!abierto); });
  panel.addEventListener('click', function (ev) {
    if (ev.target.closest('a')) menu(false);
  });

  /* ---------- Sección activa en la navegación ---------- */
  var secciones = D.navegacion
    .map(function (n) { return document.querySelector(n.href); })
    .filter(Boolean);
  var enlaces = Array.prototype.slice.call(document.querySelectorAll('.nav__link'));

  var spy = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (e) {
      if (!e.isIntersecting) return;
      enlaces.forEach(function (a) {
        a.classList.toggle('is-active', a.getAttribute('href') === '#' + e.target.id);
      });
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  secciones.forEach(function (s) { spy.observe(s); });

  /* ---------- Reveal al hacer scroll ---------- */
  var reveals = document.querySelectorAll('.reveal');
  if (reduce || !('IntersectionObserver' in window)) {
    reveals.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    var io = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });
    reveals.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Parallax muy sutil ---------- */
  var capas = Array.prototype.slice.call(document.querySelectorAll('.parallax'));
  var ticking = false;

  function pintar() {
    ticking = false;
    onScrollNav();
    if (reduce) return;
    var y = window.scrollY;
    capas.forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.bottom < -200 || r.top > window.innerHeight + 200) return;
      var s = parseFloat(el.dataset.speed || '0.08');
      var centro = r.top + r.height / 2 - window.innerHeight / 2;
      el.style.transform = 'translate3d(0,' + (-centro * s).toFixed(2) + 'px,0)';
    });
    void y;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; window.requestAnimationFrame(pintar); }
  }, { passive: true });
  window.addEventListener('resize', pintar, { passive: true });
  pintar();

  /* ---------- Lightbox de la galería ---------- */
  var lb = document.getElementById('lightbox');
  var medio = document.getElementById('lightbox-medio');
  var pie = document.getElementById('lightbox-pie');
  var indice = 0;
  var ultimoFoco = null;

  function mostrar(i) {
    var total = D.galeria.length;
    indice = (i + total) % total;
    var g = D.galeria[indice];
    pie.textContent = g.alt + '  ·  ' + (indice + 1) + ' / ' + total;

    if (!g.src) {
      medio.innerHTML = '<div class="lightbox__vacio">Espacio reservado para una foto real' +
        '<br><span style="text-transform:none;letter-spacing:0">Agregala en siteData.js → galeria</span></div>';
      return;
    }

    var img = new Image();
    img.alt = g.alt;
    img.onload = function () { medio.innerHTML = ''; medio.appendChild(img); };
    img.onerror = function () {
      medio.innerHTML = '<div class="lightbox__vacio">No se encontró la imagen<br>' + g.src + '</div>';
    };
    img.src = g.src;
  }

  function abrir(i) {
    ultimoFoco = document.activeElement;
    lb.hidden = false;
    requestAnimationFrame(function () { lb.classList.add('is-open'); });
    document.body.style.overflow = 'hidden';
    mostrar(i);
    lb.querySelector('.lightbox__cerrar').focus();
  }

  function cerrar() {
    lb.classList.remove('is-open');
    document.body.style.overflow = '';
    window.setTimeout(function () { lb.hidden = true; medio.innerHTML = ''; }, 400);
    if (ultimoFoco) ultimoFoco.focus();
  }

  document.addEventListener('click', function (ev) {
    var pieza = ev.target.closest('[data-galeria]');
    if (pieza) { abrir(parseInt(pieza.dataset.galeria, 10)); return; }

    var btn = ev.target.closest('[data-lb]');
    if (btn) {
      if (btn.dataset.lb === 'cerrar') cerrar();
      if (btn.dataset.lb === 'prev') mostrar(indice - 1);
      if (btn.dataset.lb === 'next') mostrar(indice + 1);
      return;
    }
    if (!lb.hidden && ev.target === lb) cerrar();
  });

  document.addEventListener('keydown', function (ev) {
    if (lb.hidden) {
      if (ev.key === 'Escape' && abierto) menu(false);
      return;
    }
    if (ev.key === 'Escape') cerrar();
    if (ev.key === 'ArrowLeft') mostrar(indice - 1);
    if (ev.key === 'ArrowRight') mostrar(indice + 1);
    if (ev.key === 'Tab') {                       // foco atrapado dentro del lightbox
      var focos = lb.querySelectorAll('button');
      var primero = focos[0], ultimo = focos[focos.length - 1];
      if (ev.shiftKey && document.activeElement === primero) { ev.preventDefault(); ultimo.focus(); }
      else if (!ev.shiftKey && document.activeElement === ultimo) { ev.preventDefault(); primero.focus(); }
    }
  });

  /* ---------- Formulario de contacto ----------
     Sin endpoint configurado NO simula ningún envío: lo dice claramente
     y ofrece los canales directos. Con endpoint, envía por fetch. */
  var form = document.getElementById('form-contacto');
  var aviso = document.getElementById('form-aviso');
  var endpoint = (D.formulario.endpoint || '').trim();
  var wa = U.whatsapp();

  function decir(html, ok) {
    aviso.innerHTML = html;
    aviso.hidden = false;
    aviso.classList.toggle('form__aviso--ok', !!ok);
  }

  form.addEventListener('submit', function (ev) {
    ev.preventDefault();

    if (!form.checkValidity()) {
      decir('Completá tu nombre, un email válido y el mensaje.', false);
      var malo = form.querySelector(':invalid');
      if (malo) malo.focus();
      return;
    }

    if (!endpoint) {
      var vias = ['<a href="' + D.contacto.instagramUrl + '" target="_blank" rel="noopener noreferrer">Instagram</a>'];
      if (wa) vias.push('<a href="' + wa + '" target="_blank" rel="noopener noreferrer">WhatsApp</a>');
      vias.push('al teléfono <a href="tel:' + D.contacto.telefonoLink + '">' + D.contacto.telefono + '</a>');

      decir('Este formulario todavía <strong>no está conectado</strong> a un servicio de envío, ' +
        'así que el mensaje no se envía. Escribinos por ' +
        vias.slice(0, -1).join(', ') + ' o ' + vias[vias.length - 1] + '.', false);
      return;
    }

    var btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    decir('Enviando…', false);

    fetch(endpoint, {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: new FormData(form)
    }).then(function (r) {
      if (!r.ok) throw new Error('respuesta ' + r.status);
      form.reset();
      decir('¡Gracias! Recibimos tu mensaje y te respondemos a la brevedad.', true);
    }).catch(function () {
      decir('No pudimos enviar el mensaje. Probá de nuevo o escribinos por ' +
        '<a href="' + D.contacto.instagramUrl + '" target="_blank" rel="noopener noreferrer">Instagram</a>.', false);
    }).then(function () { btn.disabled = false; });
  });

  /* ---------- Datos dinámicos en el <head> y el año ---------- */
  document.title = D.estudio.nombre + ' | ' + D.estudio.ciudad;
})();
