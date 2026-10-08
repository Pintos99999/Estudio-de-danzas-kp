/* Utilidades compartidas por los componentes. */
(function () {
  var D = window.SITE_DATA;

  window.U = {

    /* Escape básico para textos que vienen de siteData */
    esc: function (s) {
      return String(s == null ? '' : s)
        .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    },

    /* --- Presentaciones ---
       La fecha decide todo: no hay que marcar nada a mano. */

    /* La próxima que todavía no pasó (la más cercana), o null. */
    proxima: function () {
      var ahora = Date.now();
      return (D.presentaciones || [])
        .filter(function (p) {
          var t = new Date(p.fechaHoraISO).getTime();
          return !isNaN(t) && t > ahora;
        })
        .sort(function (a, b) {
          return new Date(a.fechaHoraISO) - new Date(b.fechaHoraISO);
        })[0] || null;
    },

    /* Las que ya pasaron, de la más reciente a la más vieja. */
    anteriores: function () {
      var ahora = Date.now();
      return (D.presentaciones || [])
        .filter(function (p) {
          var t = new Date(p.fechaHoraISO).getTime();
          return !isNaN(t) && t <= ahora;
        })
        .sort(function (a, b) {
          return new Date(b.fechaHoraISO) - new Date(a.fechaHoraISO);
        });
    },

    /* Enlace de entradas de una obra. Sin URL real, lleva a contacto. */
    entradas: function (p) {
      if (!p) return null;
      var hay = !!(p.entradasUrl && p.entradasUrl.trim());
      return {
        hay: hay,
        href: hay ? p.entradasUrl : '#contacto',
        texto: hay ? 'Comprar entradas' : 'Consultar entradas',
        attrs: hay ? ' target="_blank" rel="noopener noreferrer"' : ''
      };
    },

    /* --- Sucursales --- */
    sucursales: function () { return D.sucursales || []; },

    sucursal: function (id) {
      return (D.sucursales || []).filter(function (s) { return s.id === id; })[0];
    },

    /* Dirección en una línea */
    direccion: function (s) {
      var p = [s.direccion];
      if (s.referencia) p.push(s.referencia);
      return p.join(', ');
    },

    /* Google Maps por sucursal */
    mapsUrl: function (s) {
      return 'https://www.google.com/maps/search/?api=1&query=' +
        encodeURIComponent(s.mapsBusqueda);
    },
    mapsEmbed: function (s) {
      return 'https://maps.google.com/maps?q=' + encodeURIComponent(s.mapsBusqueda) +
        '&t=&z=16&ie=UTF8&iwloc=&output=embed';
    },

    /* WhatsApp de una sucursal (null si no tiene) */
    whatsapp: function (s, texto) {
      var w = (s && s.whatsapp || '').replace(/\D/g, '');
      if (!w) return null;
      var msg = texto || ('Hola! Quiero consultar por las clases del Estudio de Danzas Karen Pintos (sede ' + s.nombre + ').');
      return 'https://wa.me/' + w + '?text=' + encodeURIComponent(msg);
    },

    /* Sucursales que tienen WhatsApp configurado */
    conWhatsapp: function () {
      return (D.sucursales || []).filter(function (s) { return !!(s.whatsapp || '').trim(); });
    },

    email: function () { return (D.contacto.email || '').trim(); },

    /* Cuenta regresiva: devuelve null si la fecha es inválida,
       {pasado:true} si ya ocurrió, o los días/horas/min/seg que faltan. */
    cuenta: function (iso) {
      var destino = new Date(iso).getTime();
      if (isNaN(destino)) return null;
      var falta = destino - Date.now();
      if (falta <= 0) return { pasado: true };
      var seg = Math.floor(falta / 1000);

      /* "d" son bloques de 24 horas: sirve para el reloj, pero NO para decir
         de qué día se trata. A las 21:00 del día anterior faltan 20 horas y
         "d" vale 0, aunque la función sea mañana. Por eso calculamos aparte
         la diferencia en días de calendario. */
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

    /* Texto corto del aviso: "faltan 8 días", "es mañana", "es hoy". */
    textoFalta: function (c) {
      if (!c || c.pasado) return '';
      var n = c.diasCalendario;
      if (n > 1) return 'faltan ' + n + ' días';
      if (n === 1) return 'es mañana';
      return 'es hoy';
    },

    /* <img> que sólo se dibuja si hay ruta, y se quita sola si el archivo falta */
    imgOpcional: function (src, alt, clase) {
      if (!src || !String(src).trim()) return '';
      return '<img src="' + U.esc(src) + '" alt="' + U.esc(alt) + '" loading="lazy" decoding="async"' +
        ' class="' + (clase || '') + '"' +
        ' onerror="this.remove()">';
    }
  };
})();
