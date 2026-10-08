/* DISCIPLINAS
   El nombre de cada disciplina es TEXTO (no una imagen), así lo lee
   Google. El bloque de color y el "+" se dibujan con CSS, tomando el
   color de la disciplina desde 01-variables.css. */
window.ClassesSection = function () {
  var D = window.SITE_DATA;

  var tarjetas = D.disciplinas.map(function (d) {
    var clase = 'tarjeta' + (d.textoOscuro ? ' tarjeta--claro' : '');
    var color = d.color ? ' style="--color-disc: var(--disc-' + U.esc(d.color) + ');' +
      ' --color-mas: var(--disc-' + U.esc(d.color) + '-mas)"' : '';

    return '<article class="' + clase + '"' + color + '>' +
      '<div class="tarjeta__chapa">' +
        '<span class="tarjeta__mas" aria-hidden="true"></span>' +
        '<h3 class="tarjeta__nombre">' + U.te(d.nombre) + '<span aria-hidden="true">.</span></h3>' +
      '</div>' +
      '<div class="tarjeta__cuerpo">' +
        '<p>' + U.te(d.descripcion) + '</p>' +
        (d.nivel ? '<span class="tarjeta__nivel">' + U.te(d.nivel) + '</span>' : '') +
      '</div>' +
    '</article>';
  }).join('');

  return '' +
  '<section class="seccion disciplinas" id="disciplinas" aria-labelledby="disciplinas-titulo">' +
    '<div class="contenedor">' +
      '<div class="reveal">' +
        '<p class="eyebrow">' + U.ui('formacion') + '</p>' +
        '<h2 class="titulo-seccion" id="disciplinas-titulo">' + U.ui('disciplinas') + '</h2>' +
        '<p class="lead">' + U.ui('disciplinasLead') + '</p>' +
      '</div>' +
      '<div class="disciplinas__grid">' + tarjetas + '</div>' +
      '<p class="nota reveal">' + window.icon('sparkle', 18) +
        '<span>' + U.te(D.disciplinasNota) + '</span></p>' +
    '</div>' +
  '</section>';
};
