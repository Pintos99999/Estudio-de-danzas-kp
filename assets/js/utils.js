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

    /* Enlace de entradas: si no hay URL real, lleva a contacto */
    entradas: function () {
      var e = D.evento;
      var hay = !!(e.entradasUrl && e.entradasUrl.trim());
      return {
        hay: hay,
        href: hay ? e.entradasUrl : '#contacto',
        texto: hay ? e.entradasTextoActivo : e.entradasTextoInactivo,
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

    /* <img> que sólo se dibuja si hay ruta, y se quita sola si el archivo falta */
    imgOpcional: function (src, alt, clase) {
      if (!src || !String(src).trim()) return '';
      return '<img src="' + U.esc(src) + '" alt="' + U.esc(alt) + '" loading="lazy" decoding="async"' +
        ' class="' + (clase || '') + '"' +
        ' onerror="this.remove()">';
    }
  };
})();
