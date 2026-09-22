/* INSTAGRAM — invitación (sin feed falso) */
window.InstagramSection = function () {
  var c = window.SITE_DATA.contacto;

  return '' +
  '<section class="seccion instagram" aria-labelledby="instagram-titulo">' +
    '<div class="contenedor instagram__contenido reveal">' +
      '<p class="eyebrow" style="justify-content:center">Seguinos</p>' +
      '<h2 class="titulo-seccion" id="instagram-titulo" style="margin-bottom:1rem">En <em>Instagram</em></h2>' +
      '<a class="instagram__usuario" href="' + U.esc(c.instagramUrl) + '" target="_blank" rel="noopener noreferrer">' +
        U.esc(c.instagramUsuario) + '</a>' +
      '<p class="instagram__texto">Ensayos, clases, detrás de escena y novedades de las presentaciones del estudio.</p>' +
      '<div class="acciones">' +
        '<a class="btn btn--ghost" href="' + U.esc(c.instagramUrl) + '" target="_blank" rel="noopener noreferrer">' +
          window.icon('instagram', 17) + 'Ver Instagram' + window.icon('arrowUpRight', 15) + '</a>' +
      '</div>' +
    '</div>' +
  '</section>';
};
