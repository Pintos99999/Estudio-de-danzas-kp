/* EL ESCENARIO — sección permanente del estudio.
   No está dedicada a ninguna obra: muestra la próxima presentación
   (la que venga) y las que ya se hicieron. Cuando una función pasa,
   baja sola a "Ya las presentamos". No hay nada que borrar. */
window.EscenarioSection = function () {
  var D = window.SITE_DATA, t = D.escenario;
  var proxima = U.proxima();
  var anteriores = U.anteriores();

  /* ---- Bloque de la próxima obra ---- */
  var bloqueProxima = '';

  if (proxima) {
    var ent = U.entradas(proxima);
    var c = U.cuenta(proxima.fechaHoraISO);

    var funciones = (proxima.funciones || []).map(function (f) {
      return '<div class="funcion">' +
        '<b>' + U.esc(f.hora) + '</b>' +
        '<span>' + U.esc(f.nombre) + '</span>' +
      '</div>';
    }).join('');

    var parrafos = (proxima.descripcion || []).map(function (p) {
      return '<p>' + U.esc(p) + '</p>';
    }).join('');

    var reloj = '';
    if (c && !c.pasado) {
      var cajas = [
        { k: 'd', t: 'días' }, { k: 'h', t: 'horas' },
        { k: 'm', t: 'minutos' }, { k: 's', t: 'segundos' }
      ].map(function (x) {
        var v = c[x.k];
        return '<div class="reloj__caja">' +
          '<b class="reloj__num" data-cuenta="' + x.k + '">' + (v < 10 ? '0' + v : v) + '</b>' +
          '<span class="reloj__t">' + x.t + '</span>' +
        '</div>';
      }).join('');

      reloj =
        '<div class="reloj" id="reloj" data-fecha="' + U.esc(proxima.fechaHoraISO) + '">' +
          '<p class="reloj__titulo">' + U.esc(t.tituloReloj) + '</p>' +
          '<div class="reloj__cajas">' + cajas + '</div>' +
          '<p class="sr-only" id="reloj-texto">La primera función ' + U.textoFalta(c) + '.</p>' +
        '</div>';
    }

    bloqueProxima =
      '<article class="obra">' +
        '<div class="obra__texto">' +
          '<p class="obra__cuando">' + U.esc(t.etiquetaProxima) + '</p>' +
          '<h3 class="obra__titulo">' + U.esc(proxima.titulo) + '</h3>' +
          (proxima.subtitulo ? '<p class="obra__sub">' + U.esc(proxima.subtitulo) + '</p>' : '') +
          '<div class="obra__cuerpo">' + parrafos + '</div>' +
        '</div>' +

        '<div class="obra__datos">' +
          '<p class="obra__fecha">' + U.esc(proxima.fechaLegible) + '</p>' +
          '<div class="funciones">' + funciones + '</div>' +
          '<p class="obra__lugar">' + U.esc(proxima.lugar) + ', ' + U.esc(proxima.ciudad) + '</p>' +
          '<a class="btn btn--primario" href="' + U.esc(ent.href) + '"' + ent.attrs + '>' +
            window.icon('ticket', 17) + U.esc(ent.texto) + '</a>' +
          (proxima.entradasNota
            ? '<p class="obra__nota">' + U.esc(proxima.entradasNota) + '</p>' : '') +
        '</div>' +
      '</article>' +
      reloj;

  } else {
    bloqueProxima = '<p class="escenario__vacio">' + U.esc(t.sinProxima) + '</p>';
  }

  /* ---- Las que ya se hicieron ---- */
  var bloqueAnteriores = '';
  if (anteriores.length) {
    var filas = anteriores.map(function (p) {
      return '<li class="hecha">' +
        '<span class="hecha__anio">' + U.esc(p.anio) + '</span>' +
        '<span class="hecha__obra">' + U.esc(p.titulo) + '</span>' +
        '<span class="hecha__lugar">' + U.esc(p.lugar) + ', ' + U.esc(p.ciudad) + '</span>' +
      '</li>';
    }).join('');

    bloqueAnteriores =
      '<div class="hechas">' +
        '<h3 class="hechas__titulo">' + U.esc(t.etiquetaAnteriores) + '</h3>' +
        '<ul class="hechas__lista">' + filas + '</ul>' +
      '</div>';
  }

  return '' +
  '<section class="seccion seccion--linea escenario" id="escenario" aria-labelledby="escenario-titulo">' +
    '<div class="contenedor">' +
      '<div class="escenario__intro">' +
        '<h2 class="titulo-seccion" id="escenario-titulo">' + U.esc(t.titulo) + '</h2>' +
        '<p class="lead">' + U.esc(t.lead) + '</p>' +
      '</div>' +
      bloqueProxima +
      bloqueAnteriores +
    '</div>' +
  '</section>';
};
