/* PORTADA — el estudio.
   Si hay una presentación próxima aparece un aviso que lleva a la
   sección del escenario; si no la hay, el aviso sencillamente no está.
   La portada funciona igual con obra o sin obra. */
window.Hero = function () {
  var D = window.SITE_DATA, inst = D.instituto;

  var destellos = '';
  for (var i = 0; i < 7; i++) {
    destellos += '<span class="destello" style="left:' + (10 + i * 13) + '%;bottom:' +
      (8 + (i % 4) * 11) + '%;animation-delay:' + (i * 1.6) + 's;animation-duration:' +
      (11 + (i % 5) * 2.5) + 's"></span>';
  }

  var proxima = U.proxima();
  var aviso = '';
  if (proxima) {
    var c = U.cuenta(proxima.fechaHoraISO);
    if (c && !c.pasado) {
      aviso =
        '<a class="aviso" href="#escenario">' +
          '<span class="aviso__punto" aria-hidden="true"></span>' +
          '<span class="aviso__obra">' + U.esc(proxima.titulo) + ' en el teatro</span>' +
          '<span class="aviso__falta" id="aviso-falta">' + U.textoFalta(c) + '</span>' +
        '</a>';
    }
  }

  var cifras = (inst.cifras || []).map(function (x) {
    return '<div class="cifra">' +
      '<b>' + U.esc(x.valor) + '</b>' +
      '<span>' + U.esc(x.etiqueta) + '</span>' +
    '</div>';
  }).join('');

  return '' +
  '<section class="hero" id="inicio">' +
    '<div class="hero__fondo" aria-hidden="true"></div>' +

    (inst.imagen
      ? '<img class="hero__foto parallax" data-speed="0.06" src="' + U.esc(inst.imagen) +
        '" alt="" aria-hidden="true" fetchpriority="high" onerror="this.remove()">'
      : '') +

    '<span class="haz haz--1" aria-hidden="true"></span>' +
    '<span class="haz haz--2" aria-hidden="true"></span>' +
    '<span class="haz haz--3" aria-hidden="true"></span>' +
    destellos +

    '<div class="contenedor hero__contenido">' +
      aviso +
      /* El h1 completo es lo que lee Google: "Estudio de Danzas Karen Pintos" */
      '<h1 class="hero__titulo">' +
        '<span class="hero__previo">' + U.esc(inst.previo) + '</span> ' +
        '<span class="hero__nombre script">' + U.esc(inst.titulo) + '</span>' +
      '</h1>' +
      '<p class="hero__lema">' + U.esc(inst.lema) + '</p>' +
      '<p class="hero__bajada">' + U.esc(inst.bajada) + '</p>' +
      '<div class="acciones">' +
        '<a class="btn btn--primario" href="#contacto">' +
          window.icon('sparkle', 17) + 'Consultar por clases</a>' +
        '<a class="btn btn--ghost" href="#disciplinas">Ver las disciplinas</a>' +
      '</div>' +
      (cifras ? '<div class="cifras">' + cifras + '</div>' : '') +
    '</div>' +

    '<a class="scroll-hint" href="#estudio" aria-label="Bajar a la sección El estudio">' +
      '<span>Descubrir</span>' +
      '<span class="scroll-hint__linea" aria-hidden="true"></span>' +
    '</a>' +
  '</section>';
};
