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

    /* Google Maps */
    mapsUrl: function () {
      return 'https://www.google.com/maps/search/?api=1&query=' +
        encodeURIComponent(D.contacto.mapsBusqueda);
    },
    mapsEmbed: function () {
      return 'https://maps.google.com/maps?q=' +
        encodeURIComponent(D.contacto.mapsBusqueda) +
        '&t=&z=16&ie=UTF8&iwloc=&output=embed';
    },

    /* WhatsApp (sólo si está configurado en siteData) */
    whatsapp: function () {
      var w = (D.contacto.whatsapp || '').replace(/\D/g, '');
      if (!w) return null;
      return 'https://wa.me/' + w + '?text=' +
        encodeURIComponent('Hola! Quiero consultar por las clases del Estudio de Danzas Karen Pintos.');
    },

    direccionCompleta: function () {
      var c = D.contacto;
      return c.direccion + ', ' + c.codigoPostal + ' ' + c.localidad + ', ' + c.pais;
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
