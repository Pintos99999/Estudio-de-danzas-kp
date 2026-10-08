/* PORTADA — el estudio. */
window.Hero = function () {
  var D = window.SITE_DATA, inst = D.instituto;

  var destellos = '';
  for (var i = 0; i < 7; i++) {
    destellos += '<span class="destello" style="left:' + (10 + i * 13) + '%;bottom:' +
      (8 + (i % 4) * 11) + '%;animation-delay:' + (i * 1.6) + 's;animation-duration:' +
      (11 + (i % 5) * 2.5) + 's"></span>';
  }

  /* Aviso de función: sólo si la sección del escenario está activa
     y hay una obra por venir. Si no, la portada no la menciona. */
  var proxima = U.proxima();
  var aviso = '';
  if (proxima) {
    var c = U.cuenta(proxima.fechaHoraISO);
    if (c && !c.pasado) {
      aviso =
        '<a class="aviso" href="#escenario">' +
          '<span class="aviso__punto" aria-hidden="true"></span>' +
          '<span class="aviso__obra">' + U.te(proxima.titulo) + '</span>' +
          '<span class="aviso__falta" id="aviso-falta">' + U.textoFalta(c) + '</span>' +
        '</a>';
    }
  }

  var cifras = (inst.cifras || []).map(function (x) {
    return '<div class="cifra">' +
      '<b>' + U.te(x.valor) + '</b>' +
      '<span>' + U.te(x.etiqueta) + '</span>' +
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
      '<p class="hero__lugar">' + U.te(inst.eyebrow) + '</p>' +
      '<h1 class="hero__titulo">' +
        '<span class="hero__previo">' + U.te(inst.previo) + '</span> ' +
        '<span class="hero__nombre script">' + U.te(inst.titulo) + '</span>' +
      '</h1>' +
      '<p class="hero__lema">' + U.te(inst.lema) + '</p>' +
      '<p class="hero__bajada">' + U.te(inst.bajada) + '</p>' +
      '<div class="acciones">' +
        '<a class="btn btn--primario" href="#contacto">' +
          window.icon('sparkle', 17) + U.ui('consultarPorClases') + '</a>' +
        '<a class="btn btn--ghost" href="#disciplinas">' + U.ui('verDisciplinas') + '</a>' +
      '</div>' +
      (cifras ? '<div class="cifras">' + cifras + '</div>' : '') +
    '</div>' +

    '<a class="scroll-hint" href="#estudio" aria-label="' + U.ui('elEstudio') + '">' +
      '<span>' + U.ui('descubrir') + '</span>' +
      '<span class="scroll-hint__linea" aria-hidden="true"></span>' +
    '</a>' +
  '</section>';
};
