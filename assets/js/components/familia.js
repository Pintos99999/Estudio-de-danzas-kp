/* SÉ PARTE — la foto del grupo y la invitación a sumarse. */
window.FamiliaSection = function () {
  var f = window.SITE_DATA.familia;
  if (!f) return '';

  var parrafos = (f.parrafos || []).map(function (p) {
    return '<p>' + U.esc(p) + '</p>';
  }).join('');

  /* Botón de WhatsApp: toma la primera sede que lo tenga cargada. */
  var sedes = U.conWhatsapp();
  var wa = sedes.length ? U.whatsapp(sedes[0]) : null;

  return '' +
  '<section class="seccion familia" id="familia" aria-labelledby="familia-titulo">' +
    '<div class="contenedor familia__grid">' +

      '<figure class="familia__foto">' +
        U.imgOpcional(f.imagen, f.imagenAlt) +
        (f.pieFoto ? '<figcaption>' + U.esc(f.pieFoto) + '</figcaption>' : '') +
      '</figure>' +

      '<div class="familia__texto">' +
        '<h2 class="familia__titulo" id="familia-titulo">' + U.esc(f.titulo) + '</h2>' +
        '<div class="familia__cuerpo">' + parrafos + '</div>' +
        '<div class="acciones">' +
          '<a class="btn btn--primario" href="#contacto">' + U.esc(f.boton) + '</a>' +
          (wa ? '<a class="btn btn--wa" href="' + U.esc(wa) + '" ' +
            'target="_blank" rel="noopener noreferrer">' +
            window.icon('whatsapp', 16) + 'Escribinos</a>' : '') +
        '</div>' +
      '</div>' +

    '</div>' +
  '</section>';
};
