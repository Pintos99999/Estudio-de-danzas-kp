/* INSTAGRAM — invitación (sin feed falso) */
window.InstagramSection = function () {
  var c = window.SITE_DATA.contacto;
  var es = U.idioma() === 'es';

  return '' +
  '<section class="seccion instagram" aria-labelledby="instagram-titulo">' +
    '<div class="contenedor instagram__contenido reveal">' +
      '<p class="eyebrow" style="justify-content:center">' + (es ? 'Seguinos' : 'Follow us') + '</p>' +
      '<h2 class="titulo-seccion" id="instagram-titulo" style="margin-bottom:1rem">' +
        (es ? 'En <em>Instagram</em>' : 'On <em>Instagram</em>') + '</h2>' +
      '<a class="instagram__usuario" href="' + U.esc(c.instagramUrl) + '" target="_blank" rel="noopener noreferrer">' +
        U.esc(c.instagramUsuario) + '</a>' +
      '<p class="instagram__texto">' +
        (es ? 'Ensayos, clases, detrás de escena y novedades del estudio.'
            : 'Rehearsals, classes, behind the scenes and studio news.') + '</p>' +
      '<div class="acciones">' +
        '<a class="btn btn--ghost" href="' + U.esc(c.instagramUrl) + '" target="_blank" rel="noopener noreferrer">' +
          window.icon('instagram', 17) + (es ? 'Ver Instagram' : 'Open Instagram') + '</a>' +
      '</div>' +
    '</div>' +
  '</section>';
};
