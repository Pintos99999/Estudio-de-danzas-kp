/* HERO — portada a pantalla completa */
window.Hero = function () {
  var D = window.SITE_DATA, e = D.evento, s = D.estudio, t = U.entradas();

  var destellos = '';
  for (var i = 0; i < 7; i++) {
    destellos += '<span class="destello" style="left:' + (10 + i * 13) + '%;bottom:' +
      (8 + (i % 4) * 11) + '%;animation-delay:' + (i * 1.6) + 's;animation-duration:' +
      (11 + (i % 5) * 2.5) + 's"></span>';
  }

  return '' +
  '<section class="hero" id="inicio">' +
    '<div class="hero__fondo" aria-hidden="true"></div>' +

    /* FOTO DE PORTADA: se activa con evento.imagenHero en siteData.js */
    (e.imagenHero
      ? '<img class="hero__foto parallax" data-speed="0.06" src="' + U.esc(e.imagenHero) +
        '" alt="" aria-hidden="true" fetchpriority="high" onerror="this.remove()">'
      : '') +

    '<span class="haz haz--1" aria-hidden="true"></span>' +
    '<span class="haz haz--2" aria-hidden="true"></span>' +
    '<span class="haz haz--3" aria-hidden="true"></span>' +
    destellos +

    '<div class="contenedor hero__contenido">' +
      '<p class="hero__estudio">' + U.esc(s.logoLinea1) + '<span>' + U.esc(s.logoLinea2) + '</span></p>' +
      '<p class="hero__etiqueta">' + U.esc(e.etiqueta) + '</p>' +
      '<h1 class="hero__titulo script">' + U.esc(e.titulo) + '</h1>' +
      '<p class="hero__sub">' + e.subtitulo + '</p>' +
      '<p class="hero__datos">' +
        '<b>' + U.esc(e.fechaCorta) + '</b>' +
        '<span class="hero__sep" aria-hidden="true"></span>' +
        U.esc(e.teatro) +
        '<span class="hero__sep" aria-hidden="true"></span>' +
        U.esc(e.teatroCiudad) +
      '</p>' +
      '<div class="acciones">' +
        '<a class="btn btn--primario" href="' + U.esc(t.href) + '"' + t.attrs + '>' +
          window.icon('ticket', 17) + 'Ver entradas</a>' +
        '<a class="btn btn--ghost" href="#giselle">Conocé Giselle' + window.icon('arrowRight', 17) + '</a>' +
      '</div>' +
    '</div>' +

    '<a class="scroll-hint" href="#giselle" aria-label="Bajar a la sección Giselle">' +
      '<span>Descubrir</span>' +
      '<span class="scroll-hint__linea" aria-hidden="true"></span>' +
    '</a>' +
  '</section>';
};
