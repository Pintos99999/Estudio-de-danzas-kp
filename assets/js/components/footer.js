/* FOOTER */
window.Footer = function () {
  var D = window.SITE_DATA, c = D.contacto, s = D.estudio;
  var email = U.email();

  var nav = D.navegacion.map(function (n) {
    return '<li><a href="' + n.href + '">' + U.esc(n.etiqueta) + '</a></li>';
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
          '<span class="marca__sup">Estudio de Danzas</span>' +
          '<span class="marca__nombre">Karen Pintos</span>' +
          '<p class="footer__lema">Formación y expresión artística a través de la danza. ' +
            'Sedes en Paysandú y Young, ' + U.esc(s.pais) + '.</p>' +
        '</div>' +

        '<div>' +
          '<p class="footer__t">Secciones</p>' +
          '<ul class="footer__lista">' + nav + '</ul>' +
        '</div>' +

        '<div>' +
          '<p class="footer__t">Sedes</p>' +
          sedes +
        '</div>' +

        '<div>' +
          '<p class="footer__t">Contacto</p>' +
          '<ul class="footer__lista">' +
            '<li><a href="' + U.esc(c.instagramUrl) + '" target="_blank" rel="noopener noreferrer">' +
              U.esc(c.instagramUsuario) + '</a></li>' +
            (email ? '<li><a href="mailto:' + U.esc(email) + '">' + U.esc(email) + '</a></li>' : '') +
          '</ul>' +
        '</div>' +

      '</div>' +

      '<div class="footer__base">' +
        '<span>© ' + U.esc(s.anio) + ' ' + U.esc(s.nombre) + '</span>' +
        '<a class="footer__arriba" href="#inicio">' + window.icon('arrowRight', 14) + 'Volver arriba</a>' +
      '</div>' +
    '</div>' +
  '</footer>';
};
