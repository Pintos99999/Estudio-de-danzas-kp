/* HERO — portada del estudio.
   El protagonista es el instituto; Giselle aparece como un aviso
   con la cuenta regresiva, que lleva a su sección. */
window.Hero = function () {
  var D = window.SITE_DATA, inst = D.instituto, e = D.evento;

  var destellos = '';
  for (var i = 0; i < 7; i++) {
    destellos += '<span class="destello" style="left:' + (10 + i * 13) + '%;bottom:' +
      (8 + (i % 4) * 11) + '%;animation-delay:' + (i * 1.6) + 's;animation-duration:' +
      (11 + (i % 5) * 2.5) + 's"></span>';
  }

  /* Aviso del evento con los días que faltan (se refresca desde main.js) */
  var c = U.cuenta(e.fechaHoraISO);
  var aviso = '';
  if (c && !c.pasado) {
    aviso =
      '<a class="aviso" href="#giselle">' +
        '<span class="aviso__punto" aria-hidden="true"></span>' +
        '<span class="aviso__obra">' + U.esc(e.titulo) + '</span>' +
        '<span class="aviso__sep" aria-hidden="true"></span>' +
        '<span class="aviso__falta" id="aviso-falta">' +
          U.textoFalta(c) +
        '</span>' +
        window.icon('arrowRight', 14) +
      '</a>';
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

    (e.imagenHero
      ? '<img class="hero__foto parallax" data-speed="0.06" src="' + U.esc(e.imagenHero) +
        '" alt="" aria-hidden="true" fetchpriority="high" onerror="this.remove()">'
      : '') +

    '<span class="haz haz--1" aria-hidden="true"></span>' +
    '<span class="haz haz--2" aria-hidden="true"></span>' +
    '<span class="haz haz--3" aria-hidden="true"></span>' +
    destellos +

    '<div class="contenedor hero__contenido">' +
      aviso +
      '<p class="hero__lugar">' + U.esc(inst.eyebrow) + '</p>' +
      '<p class="hero__previo">' + U.esc(inst.previo) + '</p>' +
      '<h1 class="hero__titulo script">' + U.esc(inst.titulo) + '</h1>' +
      '<p class="hero__lema">' + U.esc(inst.lema) + '</p>' +
      '<p class="hero__bajada">' + U.esc(inst.bajada) + '</p>' +
      '<div class="acciones">' +
        '<a class="btn btn--primario" href="#disciplinas">' +
          window.icon('sparkle', 17) + 'Quiero tomar clases</a>' +
        '<a class="btn btn--ghost" href="#estudio">Conocé el estudio' +
          window.icon('arrowRight', 17) + '</a>' +
      '</div>' +
      (cifras ? '<div class="cifras">' + cifras + '</div>' : '') +
    '</div>' +

    '<a class="scroll-hint" href="#estudio" aria-label="Bajar a la sección El estudio">' +
      '<span>Descubrir</span>' +
      '<span class="scroll-hint__linea" aria-hidden="true"></span>' +
    '</a>' +
  '</section>';
};
