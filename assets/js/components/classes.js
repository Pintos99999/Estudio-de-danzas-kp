/* DISCIPLINAS / CLASES */
window.ClassesSection = function () {
  var D = window.SITE_DATA;

  var tarjetas = D.disciplinas.map(function (d, i) {
    var n = (i + 1) < 10 ? '0' + (i + 1) : String(i + 1);
    return '<article class="tarjeta reveal" style="--d:' + (i * 90) + 'ms">' +
      (d.imagen ? U.imgOpcional(d.imagen, 'Clase de ' + d.nombre + ' en el estudio', 'tarjeta__img') : '') +
      '<span class="tarjeta__n" aria-hidden="true">' + n + '</span>' +
      '<div class="tarjeta__cuerpo">' +
        '<h3>' + U.esc(d.nombre) + '</h3>' +
        '<p>' + U.esc(d.descripcion) + '</p>' +
        (d.nivel ? '<span class="tarjeta__nivel">' + U.esc(d.nivel) + '</span>' : '') +
      '</div>' +
    '</article>';
  }).join('');

  return '' +
  '<section class="seccion disciplinas" id="disciplinas" aria-labelledby="disciplinas-titulo">' +
    '<div class="contenedor">' +
      '<div class="reveal">' +
        '<p class="eyebrow">Formación</p>' +
        '<h2 class="titulo-seccion" id="disciplinas-titulo">Disciplinas</h2>' +
        '<p class="lead">Cada disciplina, su técnica y su lenguaje propio.</p>' +
      '</div>' +
      '<div class="disciplinas__grid">' + tarjetas + '</div>' +
      '<p class="nota reveal">' + window.icon('sparkle', 18) +
        '<span>' + U.esc(D.disciplinasNota) + '</span></p>' +
    '</div>' +
  '</section>';
};
