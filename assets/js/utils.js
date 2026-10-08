/* Utilidades compartidas por los componentes. */
(function () {
  var D = window.SITE_DATA;

  /* ---------- IDIOMA ----------
     'es' es el idioma por defecto y el que indexa Google.
     La elección del visitante se guarda en su propio navegador. */
  var IDIOMAS = ['es', 'en'];
  var idioma = 'es';

  try {
    var guardado = window.localStorage.getItem('kp-idioma');
    if (IDIOMAS.indexOf(guardado) !== -1) idioma = guardado;
  } catch (e) { /* navegación privada: se queda en español */ }

  window.U = {

    /* --- Idioma --- */
    idioma: function () { return idioma; },
    otroIdioma: function () { return idioma === 'es' ? 'en' : 'es'; },

    cambiarIdioma: function (nuevo) {
      if (IDIOMAS.indexOf(nuevo) === -1) return;
      idioma = nuevo;
      try { window.localStorage.setItem('kp-idioma', nuevo); } catch (e) {}
      document.documentElement.lang = nuevo;
    },

    /* Traduce un valor.
       Si es texto plano lo devuelve tal cual; si es { es, en }
       devuelve el idioma actual, y si falta, el español. */
    t: function (v) {
      if (v == null) return '';
      if (typeof v === 'string') return v;
      return v[idioma] || v.es || v.en || '';
    },

    /* Texto de interfaz por su nombre */
    ui: function (clave) { return U.t(D.ui[clave]); },

    /* Escape básico para textos que vienen de siteData */
    esc: function (s) {
      return String(s == null ? '' : s)
        .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    },

    /* Traduce y escapa de una sola vez (lo más usado) */
    te: function (v) { return U.esc(U.t(v)); },

    /* --- Secciones activables --- */
    activo: function (nombre) {
      var s = D[nombre];
      return !!(s && s.activo);
    },

    /* --- Navegación visible según qué secciones están activas --- */
    navegacion: function () {
      return (D.navegacion || []).filter(function (n) {
        return !n.soloSi || U.activo(n.soloSi);
      });
    },

    /* --- Presentaciones --- */
    proxima: function () {
      if (!U.activo('escenario')) return null;
      var ahora = Date.now();
      return (D.presentaciones || [])
        .filter(function (p) {
          var t = new Date(p.fechaHoraISO).getTime();
          return !isNaN(t) && t > ahora;
        })
        .sort(function (a, b) { return new Date(a.fechaHoraISO) - new Date(b.fechaHoraISO); })[0] || null;
    },

    anteriores: function () {
      if (!U.activo('escenario')) return [];
      var ahora = Date.now();
      return (D.presentaciones || [])
        .filter(function (p) {
          var t = new Date(p.fechaHoraISO).getTime();
          return !isNaN(t) && t <= ahora;
        })
        .sort(function (a, b) { return new Date(b.fechaHoraISO) - new Date(a.fechaHoraISO); });
    },

    entradas: function (p) {
      if (!p) return null;
      var hay = !!(p.entradasUrl && p.entradasUrl.trim());
      return {
        hay: hay,
        href: hay ? p.entradasUrl : '#contacto',
        texto: hay
          ? (idioma === 'es' ? 'Comprar entradas' : 'Buy tickets')
          : (idioma === 'es' ? 'Consultar entradas' : 'Ask about tickets'),
        attrs: hay ? ' target="_blank" rel="noopener noreferrer"' : ''
      };
    },

    /* --- Sucursales --- */
    sucursales: function () { return D.sucursales || []; },

    sucursal: function (id) {
      return (D.sucursales || []).filter(function (s) { return s.id === id; })[0];
    },

    /* Si la sede tiene coordenadas, se usan ésas: el mapa cae en el
       punto exacto y no depende de que Google interprete bien la
       dirección escrita. Si no las tiene, busca por dirección. */
    punto: function (s) {
      return (s.coordenadas && s.coordenadas.trim()) ? s.coordenadas.trim() : s.mapsBusqueda;
    },

    /* "Cómo llegar": abre Google Maps con la ruta hasta la sede */
    mapsUrl: function (s) {
      return 'https://www.google.com/maps/dir/?api=1&destination=' +
        encodeURIComponent(U.punto(s));
    },

    mapsEmbed: function (s) {
      return 'https://maps.google.com/maps?q=' + encodeURIComponent(U.punto(s)) +
        '&t=&z=17&ie=UTF8&iwloc=&output=embed';
    },

    whatsapp: function (s, texto) {
      var w = (s && s.whatsapp || '').replace(/\D/g, '');
      if (!w) return null;
      var msg = texto || (idioma === 'es'
        ? 'Hola! Quiero consultar por las clases del Estudio de Danzas Karen Pintos (sede ' + s.nombre + ').'
        : 'Hi! I would like to ask about classes at Estudio de Danzas Karen Pintos (' + s.nombre + ').');
      return 'https://wa.me/' + w + '?text=' + encodeURIComponent(msg);
    },

    conWhatsapp: function () {
      return (D.sucursales || []).filter(function (s) { return !!(s.whatsapp || '').trim(); });
    },

    email: function () { return (D.contacto.email || '').trim(); },

    /* --- Cuenta regresiva --- */
    cuenta: function (iso) {
      var destino = new Date(iso).getTime();
      if (isNaN(destino)) return null;
      var falta = destino - Date.now();
      if (falta <= 0) return { pasado: true };
      var seg = Math.floor(falta / 1000);

      /* "d" son bloques de 24 horas: sirve para el reloj, pero NO para
         decir de qué día se trata. Por eso calculamos aparte la
         diferencia en días de calendario. */
      var ahora = new Date();
      var dia0 = new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate());
      var evt = new Date(destino);
      var dia1 = new Date(evt.getFullYear(), evt.getMonth(), evt.getDate());

      return {
        pasado: false,
        d: Math.floor(seg / 86400),
        h: Math.floor((seg % 86400) / 3600),
        m: Math.floor((seg % 3600) / 60),
        s: seg % 60,
        diasCalendario: Math.round((dia1 - dia0) / 86400000)
      };
    },

    textoFalta: function (c) {
      if (!c || c.pasado) return '';
      var n = c.diasCalendario;
      if (idioma === 'en') {
        if (n > 1) return n + ' days to go';
        if (n === 1) return 'tomorrow';
        return 'today';
      }
      if (n > 1) return 'faltan ' + n + ' días';
      if (n === 1) return 'es mañana';
      return 'es hoy';
    },

    /* <img> que sólo se dibuja si hay ruta, y se quita sola si falta */
    imgOpcional: function (src, alt, clase) {
      if (!src || !String(src).trim()) return '';
      return '<img src="' + U.esc(src) + '" alt="' + U.te(alt) + '" loading="lazy" decoding="async"' +
        ' class="' + (clase || '') + '"' +
        ' onerror="this.remove()">';
    }
  };
})();
