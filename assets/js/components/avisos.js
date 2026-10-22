/* AVISOS — la franja de novedades cortas que va arriba de todo.
   Si no hay ninguno publicado y vigente, no se dibuja nada. */
window.AvisosSection = function () {
  var D = window.SITE_DATA;
  var cfg = D.avisos || {};
  if (!cfg.activo) return '';

  var vigentes = U.avisosVigentes();
  if (!vigentes.length) return '';

  var tarjetas = vigentes.map(function (a) {
    var tipo = a.tipo || 'novedad';
    var enlace = (a.enlace && (a.enlace.url || '').trim()) || '';
    var textoEnlace = (a.enlace && a.enlace.texto) || cfg.verMas;

    return '' +
      '<article class="aviso-tarjeta aviso-tarjeta--' + U.esc(tipo) + '">' +
        '<span class="aviso-tarjeta__marca" aria-hidden="true"></span>' +
        '<div class="aviso-tarjeta__cuerpo">' +
          '<h3 class="aviso-tarjeta__titulo">' + U.te(a.titulo) + '</h3>' +
          (a.texto ? '<p class="aviso-tarjeta__texto">' + U.te(a.texto) + '</p>' : '') +
          (enlace
            ? '<a class="btn btn--texto btn--peq" href="' + U.esc(enlace) + '"' +
              (/^https?:/.test(enlace) ? ' target="_blank" rel="noopener noreferrer"' : '') + '>' +
              U.te(textoEnlace) + window.icon('arrowRight', 14) + '</a>'
            : '') +
        '</div>' +
      '</article>';
  }).join('');

  return '' +
  '<section class="seccion seccion--avisos" id="avisos" aria-labelledby="avisos-titulo">' +
    '<div class="contenedor">' +
      '<p class="eyebrow">' + U.te(cfg.etiqueta) + '</p>' +
      '<h2 class="avisos__titulo" id="avisos-titulo">' + U.te(cfg.titulo) + '</h2>' +
      '<div class="avisos__grid">' + tarjetas + '</div>' +
    '</div>' +
  '</section>';
};
