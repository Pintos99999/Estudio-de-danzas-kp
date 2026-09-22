/* GALERÍA editorial + lightbox */
window.Gallery = function () {
  var D = window.SITE_DATA;

  var piezas = D.galeria.map(function (g, i) {
    return '<button type="button" class="pieza pieza--' + U.esc(g.alto) + ' reveal" ' +
      'data-galeria="' + i + '" style="--d:' + ((i % 3) * 90) + 'ms" ' +
      'aria-label="Ampliar imagen: ' + U.esc(g.alt) + '">' +
      (g.src ? '' : '<span class="pieza__placeholder" aria-hidden="true">' + window.icon('image', 22) +
        '<small>Espacio para foto real</small></span>') +
      U.imgOpcional(g.src, g.alt) +
      '<span class="pieza__velo" aria-hidden="true"><span>' + U.esc(g.alt) + '</span></span>' +
    '</button>';
  }).join('');

  return '' +
  '<section class="seccion seccion--linea" id="galeria" aria-labelledby="galeria-titulo">' +
    '<div class="contenedor">' +
      '<div class="reveal">' +
        '<p class="eyebrow">Imágenes</p>' +
        '<h2 class="titulo-seccion" id="galeria-titulo">Galería</h2>' +
        '<p class="lead">La campaña visual de Giselle.</p>' +
      '</div>' +
      '<div class="galeria__masonry">' + piezas + '</div>' +
      (D.galeriaNota ? '<p class="nota reveal">' + window.icon('image', 18) +
        '<span>' + U.esc(D.galeriaNota) + '</span></p>' : '') +
    '</div>' +
  '</section>' +

  '<div class="lightbox" id="lightbox" role="dialog" aria-modal="true" aria-label="Imagen ampliada" hidden>' +
    '<button type="button" class="lightbox__btn lightbox__cerrar" data-lb="cerrar" aria-label="Cerrar">' +
      window.icon('close', 20) + '</button>' +
    '<button type="button" class="lightbox__btn lightbox__prev" data-lb="prev" aria-label="Imagen anterior">' +
      window.icon('chevronLeft', 20) + '</button>' +
    '<button type="button" class="lightbox__btn lightbox__next" data-lb="next" aria-label="Imagen siguiente">' +
      window.icon('chevronRight', 20) + '</button>' +
    '<figure class="lightbox__fig">' +
      '<div id="lightbox-medio"></div>' +
      '<figcaption class="lightbox__pie" id="lightbox-pie"></figcaption>' +
    '</figure>' +
  '</div>';
};
