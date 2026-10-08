/* REDES — Instagram, Facebook y correo, cada uno con su apartado. */
window.RedesSection = function () {
  var D = window.SITE_DATA, c = D.contacto, r = D.redes;
  if (!r || !r.canales || !r.canales.length) return '';

  /* Cada tipo sabe de dónde sacar su enlace y su nombre de usuario */
  function datos(tipo) {
    if (tipo === 'instagram') {
      return { url: c.instagramUrl, usuario: c.instagramUsuario, externo: true };
    }
    if (tipo === 'facebook') {
      return { url: c.facebookUrl, usuario: c.facebookUsuario, externo: true };
    }
    if (tipo === 'email') {
      var e = U.email();
      return e ? { url: 'mailto:' + e, usuario: e, externo: false } : null;
    }
    return null;
  }

  var tarjetas = r.canales.map(function (x, i) {
    var d = datos(x.tipo);
    if (!d || !d.url) return '';

    return '<a class="red red--' + U.esc(x.tipo) + ' reveal" style="--d:' + (i * 90) + 'ms" ' +
      'href="' + U.esc(d.url) + '"' +
      (d.externo ? ' target="_blank" rel="noopener noreferrer"' : '') + '>' +
      '<span class="red__ico">' + window.icon(x.tipo === 'email' ? 'mail' : x.tipo, 26) + '</span>' +
      '<span class="red__nombre">' + U.te(x.nombre) + '</span>' +
      '<span class="red__usuario">' + U.esc(d.usuario) + '</span>' +
      '<span class="red__detalle">' + U.te(x.detalle) + '</span>' +
      '<span class="red__accion">' + U.te(x.accion) + '</span>' +
    '</a>';
  }).join('');

  return '' +
  '<section class="seccion redes" id="redes" aria-labelledby="redes-titulo">' +
    '<div class="contenedor">' +
      '<div class="reveal redes__intro">' +
        '<h2 class="titulo-seccion" id="redes-titulo">' + U.te(r.titulo) + '</h2>' +
        '<p class="lead">' + U.te(r.lead) + '</p>' +
      '</div>' +
      '<div class="redes__grid">' + tarjetas + '</div>' +
    '</div>' +
  '</section>';
};
