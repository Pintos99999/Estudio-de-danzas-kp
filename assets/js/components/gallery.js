/* GALERÍA editorial + lightbox */
window.Gallery = function () {
  var D = window.SITE_DATA;

  var piezas = D.galeria.map(function (g, i) {
    return '<button type="button" class="pieza pieza--' + U.esc(g.alto) + ' reveal" ' +
      'data-galeria="' + i + '" style="--d:' + ((i % 3) * 90) + 'ms" ' +
      'aria-label="' + U.ui('verImagen') + ': ' + U.te(g.alt) + '">' +
      U.imgOpcional(g.src, g.alt) +
      '<span class="pieza__velo" aria-hidden="true"><span>' + U.te(g.alt) + '</span></span>' +
    '</button>';
  }).join('');

  return '' +
  '<section class="seccion seccion--linea" id="galeria" aria-labelledby="galeria-titulo">' +
    '<div class="contenedor">' +
      '<div class="reveal">' +
        '<p class="eyebrow">' + U.ui('imagenes') + '</p>' +
        '<h2 class="titulo-seccion" id="galeria-titulo">' + U.ui('galeria') + '</h2>' +
        '<p class="lead">' + U.te(D.galeriaLead) + '</p>' +
      '</div>' +
      '<div class="galeria__masonry">' + piezas + '</div>' +
      (D.galeriaNota ? '<p class="nota reveal">' + window.icon('image', 18) +
        '<span>' + U.te(D.galeriaNota) + '</span></p>' : '') +
    '</div>' +
  '</section>' +

  '<div class="lightbox" id="lightbox" role="dialog" aria-modal="true" ' +
    'aria-label="' + U.ui('imagenAmpliada') + '" hidden>' +
    '<button type="button" class="lightbox__btn lightbox__cerrar" data-lb="cerrar" ' +
      'aria-label="' + U.ui('cerrar') + '">' + window.icon('close', 20) + '</button>' +
    '<button type="button" class="lightbox__btn lightbox__prev" data-lb="prev" ' +
      'aria-label="' + U.ui('anterior') + '">' + window.icon('chevronLeft', 20) + '</button>' +
    '<button type="button" class="lightbox__btn lightbox__next" data-lb="next" ' +
      'aria-label="' + U.ui('siguiente') + '">' + window.icon('chevronRight', 20) + '</button>' +
    '<figure class="lightbox__fig">' +
      '<div id="lightbox-medio"></div>' +
      '<figcaption class="lightbox__pie" id="lightbox-pie"></figcaption>' +
    '</figure>' +
  '</div>';
};
