/* FOOTER */
window.Footer = function () {
  var D = window.SITE_DATA, c = D.contacto, s = D.estudio;
  var email = U.email();

  var nav = U.navegacion().map(function (n) {
    return '<li><a href="' + n.href + '">' + U.te(n.etiqueta) + '</a></li>';
  }).join('');

  var sedes = U.sucursales().map(function (x) {
    var wa = U.whatsapp(x);
    var lineas = '<li><strong>' + U.esc(x.nombre) + '</strong></li>' +
      '<li><a href="' + U.esc(U.mapsUrl(x)) + '" target="_blank" rel="noopener noreferrer">' +
        U.esc(x.direccion) + '</a></li>';
    if (x.telefono) {
      lineas += '<li><a href="tel:' + U.esc(x.telefonoLink) + '">' + U.esc(x.telefono) + '</a></li>';
    }
    if (x.celular) {
      lineas += '<li>' + (wa
        ? '<a href="' + U.esc(wa) + '" target="_blank" rel="noopener noreferrer">' + U.esc(x.celular) + '</a>'
        : '<span>' + U.esc(x.celular) + '</span>') + '</li>';
    }
    return '<ul class="footer__lista footer__sede">' + lineas + '</ul>';
  }).join('');

  return '' +
  '<footer class="footer">' +
    '<div class="contenedor">' +
      '<div class="footer__grid">' +

        '<div class="footer__marca">' +
          '<img class="footer__logo" src="assets/img/logo-k.png" alt="" width="56" height="56" loading="lazy" onerror="this.remove()">' +
          '<span class="marca__sup">' + U.te(s.logoLinea1) + '</span>' +
          '<span class="marca__nombre">' + U.te(s.logoLinea2) + '</span>' +
          '<p class="footer__lema">' + U.ui('lemaPie') + '</p>' +
        '</div>' +

        '<div>' +
          '<p class="footer__t">' + U.ui('secciones') + '</p>' +
          '<ul class="footer__lista">' + nav + '</ul>' +
        '</div>' +

        '<div>' +
          '<p class="footer__t">' + U.ui('sedes') + '</p>' + sedes +
        '</div>' +

        '<div>' +
          '<p class="footer__t">' + U.ui('contacto') + '</p>' +
          '<ul class="footer__lista">' +
            '<li><a href="' + U.esc(c.instagramUrl) + '" target="_blank" rel="noopener noreferrer">Instagram</a></li>' +
            (c.facebookUrl
              ? '<li><a href="' + U.esc(c.facebookUrl) + '" target="_blank" rel="noopener noreferrer">Facebook</a></li>'
              : '') +
            (email ? '<li><a href="mailto:' + U.esc(email) + '">' + U.esc(email) + '</a></li>' : '') +
          '</ul>' +
        '</div>' +

      '</div>' +

      '<div class="footer__base">' +
        '<span>© ' + U.esc(s.anio) + ' ' + U.esc(s.nombre) + '</span>' +
        '<a class="footer__arriba" href="#inicio">' + U.ui('volverArriba') + '</a>' +
      '</div>' +
    '</div>' +
  '</footer>';
};
