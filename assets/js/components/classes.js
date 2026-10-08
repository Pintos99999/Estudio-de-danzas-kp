/* DISCIPLINAS / CLASES */
window.ClassesSection = function () {
  var D = window.SITE_DATA;

  var tarjetas = D.disciplinas.map(function (d) {
    var color = d.color ? ' style="--color-disc: var(--disc-' + U.esc(d.color) + ')"' : '';
    return '<article class="tarjeta reveal"' + color + '>' +
      /* Si hay gráfica oficial, ella muestra el nombre: el título queda
         sólo para Google y los lectores de pantalla, sin repetirlo. */
      (d.imagen
        ? U.imgOpcional(d.imagen, d.nombre, 'tarjeta__img')
        : '<span class="tarjeta__chapa" aria-hidden="true">' + U.esc(d.nombre) + '</span>') +
      '<div class="tarjeta__cuerpo">' +
        /* El nombre ya se ve en la gráfica o en la chapa de color: acá
           queda sólo para Google y los lectores de pantalla. */
        '<h3 class="sr-only">' + U.esc(d.nombre) + '</h3>' +
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
