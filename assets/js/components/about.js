/* SOBRE EL ESTUDIO */
window.AboutSection = function () {
  var D = window.SITE_DATA, s = D.sobre;

  var parrafos = s.parrafos.map(function (p) { return '<p>' + U.esc(p) + '</p>'; }).join('');

  var pilares = s.pilares.map(function (p) {
    return '<article class="pilar">' +
      '<h3>' + U.esc(p.titulo) + '</h3>' +
      '<p>' + U.esc(p.texto) + '</p>' +
    '</article>';
  }).join('');

  var manifiesto = (D.instituto && D.instituto.manifiesto)
    ? '<p class="manifiesto reveal">' + U.esc(D.instituto.manifiesto) + '</p>'
    : '';

  return '' +
  '<section class="seccion seccion--linea" id="estudio" aria-labelledby="estudio-titulo">' +
    '<div class="contenedor">' +

      manifiesto +

      '<div class="sobre__grid">' +

        '<div class="reveal">' +
          /* FOTO: se activa poniendo sobre.imagen en siteData.js */
          '<div class="retrato parallax" data-speed="0.05">' +
            U.imgOpcional(s.imagen, s.imagenAlt || 'Estudio de Danzas Karen Pintos') +
            (s.imagen ? '' : '<span class="retrato__vacio">' + window.icon('image', 24) +
              '<small>Espacio para una foto del estudio</small></span>') +
            '<span class="retrato__marca">Paysandú · Young</span>' +
          '</div>' +
        '</div>' +

        '<div class="reveal" style="--d:120ms">' +
          '<p class="eyebrow">El estudio</p>' +
          '<h2 class="titulo-seccion" id="estudio-titulo">' + U.esc(s.titulo) + '</h2>' +
          '<p class="lead">' + U.esc(s.lead) + '</p>' +
          '<div class="texto-tenue" style="margin-top:1.6rem">' + parrafos + '</div>' +
          '<div class="pilares">' + pilares + '</div>' +
        '</div>' +

      '</div>' +
    '</div>' +
  '</section>';
};
