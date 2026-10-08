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
      window.AboutSection(),
      window.ClassesSection(),
      window.EscenarioSection(),
      window.Gallery(),
      window.InstagramSection(),
      window.LocationSection(),
      window.ContactSection(),
    '</main>',
    window.Footer(),
    window.WhatsappFab()
  ].join('');

  /* ---------- Navbar: fondo al hacer scroll ---------- */
  var nav = document.getElementById('nav');
  function onScrollNav() { nav.classList.toggle('is-scrolled', window.scrollY > 40); }
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
    capas.forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.bottom < -200 || r.top > window.innerHeight + 200) return;
      var s = parseFloat(el.dataset.speed || '0.08');
      var centro = r.top + r.height / 2 - window.innerHeight / 2;
      el.style.transform = 'translate3d(0,' + (-centro * s).toFixed(2) + 'px,0)';
    });
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; window.requestAnimationFrame(pintar); }
  }, { passive: true });
  window.addEventListener('resize', pintar, { passive: true });
  pintar();

  /* ---------- Cuenta regresiva ----------
     Cuando llega a cero no "apaga" nada: vuelve a dibujar la sección
     del escenario. La obra pasa sola a "Ya las presentamos" y, si hay
     otra más adelante, esa toma su lugar. Sin tocar el sitio. */
  var reloj = document.getElementById('reloj');
  if (reloj && reloj.dataset.fecha) {
    var avisoFalta = document.getElementById('aviso-falta');
    var relojTexto = document.getElementById('reloj-texto');
    var cajas = {};
    Array.prototype.forEach.call(reloj.querySelectorAll('[data-cuenta]'), function (el) {
      cajas[el.dataset.cuenta] = el;
    });

    var tic = window.setInterval(function () {
      var c = U.cuenta(reloj.dataset.fecha);
      if (!c) { window.clearInterval(tic); return; }

      if (c.pasado) {
        window.clearInterval(tic);
        var seccion = document.getElementById('escenario');
        if (seccion) seccion.outerHTML = window.EscenarioSection();
        var av = document.querySelector('.aviso');
        if (av) av.remove();
        return;
      }

      ['d', 'h', 'm', 's'].forEach(function (k) {
        if (!cajas[k]) return;
        var v = c[k] < 10 ? '0' + c[k] : String(c[k]);
        if (cajas[k].textContent !== v) {
          cajas[k].textContent = v;
          cajas[k].classList.remove('late');
          void cajas[k].offsetWidth;        // reinicia la animación
          cajas[k].classList.add('late');
        }
      });

      if (relojTexto) {
        relojTexto.textContent = 'La primera función ' + U.textoFalta(c) + '.';
      }
      if (avisoFalta) {
        avisoFalta.textContent = U.textoFalta(c);
      }
    }, 1000);
  }

  /* ---------- Mapa: cambiar de sede ---------- */
  var mapaIframe = document.getElementById('mapa-iframe');
  Array.prototype.forEach.call(document.querySelectorAll('.mapa__tab'), function (tab) {
    tab.addEventListener('click', function () {
      var sede = U.sucursal(tab.dataset.mapa);
      if (!sede || !mapaIframe) return;
      mapaIframe.src = U.mapsEmbed(sede);
      mapaIframe.title = 'Mapa con la ubicación de la sede ' + sede.nombre;
      Array.prototype.forEach.call(document.querySelectorAll('.mapa__tab'), function (t) {
        var activo = t === tab;
        t.classList.toggle('is-active', activo);
        t.setAttribute('aria-pressed', activo ? 'true' : 'false');
      });
    });
  });

  /* ---------- Botón flotante de WhatsApp ---------- */
  var waFab = document.getElementById('wa-fab');
  var waMenu = document.getElementById('wa-menu');
  if (waFab && waMenu) {
    var waAbierto = false;
    function wa(estado) {
      waAbierto = estado;
      waMenu.hidden = !estado;
      waFab.setAttribute('aria-expanded', estado ? 'true' : 'false');
      waFab.classList.toggle('is-open', estado);
      waFab.innerHTML = window.icon(estado ? 'close' : 'whatsapp', estado ? 22 : 26);
    }
    waFab.addEventListener('click', function (ev) { ev.stopPropagation(); wa(!waAbierto); });
    document.addEventListener('click', function (ev) {
      if (waAbierto && !ev.target.closest('.wa-wrap')) wa(false);
    });
    document.addEventListener('keydown', function (ev) {
      if (ev.key === 'Escape' && waAbierto) { wa(false); waFab.focus(); }
    });
  }

  /* ---------- Lightbox de la galería ---------- */
  var lb = document.getElementById('lightbox');
  var medio = document.getElementById('lightbox-medio');
  var pie = document.getElementById('lightbox-pie');
  var indice = 0;
  var ultimoFoco = null;
  var pedido = 0;        // descarta cargas que quedaron viejas al pasar rápido

  function mostrar(i) {
    var total = D.galeria.length;
    indice = (i + total) % total;
    var g = D.galeria[indice];
    var mio = ++pedido;
    pie.textContent = g.alt + '  ·  ' + (indice + 1) + ' / ' + total;

    if (!g.src) {
      medio.innerHTML = '<div class="lightbox__vacio">Espacio reservado para una foto real' +
        '<span style="text-transform:none;letter-spacing:0">Agregala en siteData.js → galeria</span></div>';
      return;
    }

    var img = new Image();
    img.alt = g.alt;
    img.onload = function () {
      if (mio !== pedido) return;           // ya se pidió otra imagen
      medio.innerHTML = ''; medio.appendChild(img);
    };
    img.onerror = function () {
      if (mio !== pedido) return;
      medio.innerHTML = '<div class="lightbox__vacio">No se encontró la imagen<span>' +
        U.esc(g.src) + '</span></div>';
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
     Envía por FormSubmit (sin backend propio). Si no hay endpoint
     configurado, lo dice claramente en vez de simular un envío. */
  var form = document.getElementById('form-contacto');
  var aviso = document.getElementById('form-aviso');
  var endpoint = (D.formulario.endpoint || '').trim();

  function decir(html, ok) {
    aviso.innerHTML = html;
    aviso.hidden = false;
    aviso.classList.toggle('form__aviso--ok', !!ok);
  }

  function viasAlternativas() {
    var vias = [];
    U.conWhatsapp().forEach(function (s) {
      vias.push('<a href="' + U.whatsapp(s) + '" target="_blank" rel="noopener noreferrer">' +
        'WhatsApp ' + s.nombre + '</a>');
    });
    vias.push('<a href="' + D.contacto.instagramUrl + '" target="_blank" rel="noopener noreferrer">Instagram</a>');
    if (U.email()) vias.push('<a href="mailto:' + U.email() + '">' + U.email() + '</a>');
    if (vias.length === 1) return vias[0];
    return vias.slice(0, -1).join(', ') + ' o ' + vias[vias.length - 1];
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
      decir('Este formulario todavía <strong>no está conectado</strong>, así que el mensaje no se envía. ' +
        'Escribinos por ' + viasAlternativas() + '.', false);
      return;
    }

    var btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    decir('Enviando…', false);

    var datos = new FormData(form);
    datos.append('_subject', D.formulario.asunto || 'Consulta desde la web');
    datos.append('_template', 'table');
    datos.append('_captcha', 'false');

    fetch(endpoint, {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: datos
    }).then(function (r) {
      return r.json().catch(function () { return {}; }).then(function (j) {
        if (!r.ok || j.success === 'false' || j.success === false) {
          throw new Error(j.message || ('respuesta ' + r.status));
        }
        return j;
      });
    }).then(function () {
      form.reset();
      decir('¡Gracias! Recibimos tu mensaje y te respondemos a la brevedad.', true);
    }).catch(function (err) {
      decir('No pudimos enviar el mensaje (' + U.esc(err.message) + '). ' +
        'Probá de nuevo o escribinos por ' + viasAlternativas() + '.', false);
    }).then(function () { btn.disabled = false; });
  });

  /* ---------- Datos estructurados del evento (para Google) ----------
     Se arman desde la próxima presentación. Si no hay ninguna próxima,
     no se publica ningún evento: así Google nunca muestra en el
     buscador una función que ya pasó. */
  (function () {
    var p = U.proxima();
    if (!p) return;

    var ld = {
      '@context': 'https://schema.org',
      '@type': 'TheaterEvent',
      name: p.titulo + ' — ' + D.estudio.nombre,
      startDate: p.fechaHoraISO,
      eventStatus: 'https://schema.org/EventScheduled',
      eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
      organizer: { '@type': 'DanceSchool', name: D.estudio.nombre },
      location: {
        '@type': 'PerformingArtsTheater',
        name: p.lugar,
        address: {
          '@type': 'PostalAddress',
          addressLocality: p.ciudad,
          addressCountry: 'UY'
        }
      }
    };
    if (p.subtitulo) ld.description = p.subtitulo;
    if (p.entradasUrl) ld.offers = { '@type': 'Offer', url: p.entradasUrl };

    var s = document.createElement('script');
    s.type = 'application/ld+json';
    s.textContent = JSON.stringify(ld);
    document.head.appendChild(s);
  })();

  /* ---------- Título de la pestaña ----------
     Se arma con las sedes cargadas, para no dejar ninguna afuera. */
  var ciudades = U.sucursales().map(function (s) { return s.nombre; });
  document.title = D.estudio.nombre + (ciudades.length ? ' | ' + ciudades.join(' y ') : '');
})();
