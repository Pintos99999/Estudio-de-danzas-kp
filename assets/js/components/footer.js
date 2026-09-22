/* FOOTER */
window.Footer = function () {
  var D = window.SITE_DATA, c = D.contacto, s = D.estudio;
  var wa = U.whatsapp();

  var nav = D.navegacion.map(function (n) {
    return '<li><a href="' + n.href + '">' + U.esc(n.etiqueta) + '</a></li>';
  }).join('');

  return '' +
  '<footer class="footer">' +
    '<div class="contenedor">' +
      '<div class="footer__grid">' +

        '<div class="footer__marca">' +
          '<span class="marca__sup">Estudio de Danzas</span>' +
          '<span class="marca__nombre">Karen Pintos</span>' +
          '<p class="footer__lema">Formación y expresión artística a través de la danza en ' +
            U.esc(s.ciudad) + ', ' + U.esc(s.pais) + '.</p>' +
        '</div>' +

        '<div>' +
          '<p class="footer__t">Secciones</p>' +
          '<ul class="footer__lista">' + nav + '</ul>' +
        '</div>' +

        '<div>' +
          '<p class="footer__t">Contacto</p>' +
          '<ul class="footer__lista">' +
            '<li><a href="' + U.esc(c.instagramUrl) + '" target="_blank" rel="noopener noreferrer">' +
              U.esc(c.instagramUsuario) + '</a></li>' +
            '<li><a href="tel:' + U.esc(c.telefonoLink) + '">' + U.esc(c.telefono) + '</a></li>' +
            (wa ? '<li><a href="' + U.esc(wa) + '" target="_blank" rel="noopener noreferrer">WhatsApp</a></li>' : '') +
            '<li><a href="' + U.esc(U.mapsUrl()) + '" target="_blank" rel="noopener noreferrer">' +
              U.esc(c.direccion) + '</a></li>' +
            '<li><span>' + U.esc(c.localidad) + ', ' + U.esc(c.pais) + '</span></li>' +
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
