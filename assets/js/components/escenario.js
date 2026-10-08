/* EL ESCENARIO — anuncio de funciones.
   Se dibuja sólo si escenario.activo es true en siteData.js.
   Mientras esté apagado, el sitio no menciona ninguna función. */
window.EscenarioSection = function () {
  if (!U.activo('escenario')) return '';

  var D = window.SITE_DATA, t = D.escenario;
  var proxima = U.proxima();
  var anteriores = U.anteriores();

  var bloqueProxima = '';

  if (proxima) {
    var ent = U.entradas(proxima);
    var c = U.cuenta(proxima.fechaHoraISO);

    var funciones = (proxima.funciones || []).map(function (f) {
      return '<div class="funcion"><b>' + U.esc(f.hora) + '</b>' +
        '<span>' + U.te(f.nombre) + '</span></div>';
    }).join('');

    var parrafos = (proxima.descripcion || []).map(function (p) {
      return '<p>' + U.te(p) + '</p>';
    }).join('');

    var reloj = '';
    if (c && !c.pasado) {
      var etiquetas = U.idioma() === 'es'
        ? { d: 'días', h: 'horas', m: 'minutos', s: 'segundos' }
        : { d: 'days', h: 'hours', m: 'minutes', s: 'seconds' };

      var cajas = ['d', 'h', 'm', 's'].map(function (k) {
        var v = c[k];
        return '<div class="reloj__caja">' +
          '<b class="reloj__num" data-cuenta="' + k + '">' + (v < 10 ? '0' + v : v) + '</b>' +
          '<span class="reloj__t">' + etiquetas[k] + '</span>' +
        '</div>';
      }).join('');

      reloj =
        '<div class="reloj" id="reloj" data-fecha="' + U.esc(proxima.fechaHoraISO) + '">' +
          '<p class="reloj__titulo">' + U.te(t.tituloReloj) + '</p>' +
          '<div class="reloj__cajas">' + cajas + '</div>' +
          '<p class="sr-only" id="reloj-texto">' + U.textoFalta(c) + '</p>' +
        '</div>';
    }

    bloqueProxima =
      '<article class="obra">' +
        '<div class="obra__texto">' +
          '<p class="obra__cuando">' + U.te(t.etiquetaProxima) + '</p>' +
          '<h3 class="obra__titulo">' + U.te(proxima.titulo) + '</h3>' +
          (proxima.subtitulo ? '<p class="obra__sub">' + U.te(proxima.subtitulo) + '</p>' : '') +
          '<div class="obra__cuerpo">' + parrafos + '</div>' +
        '</div>' +
        '<div class="obra__datos">' +
          '<p class="obra__fecha">' + U.te(proxima.fechaLegible) + '</p>' +
          '<div class="funciones">' + funciones + '</div>' +
          '<p class="obra__lugar">' + U.esc(proxima.lugar) + ', ' + U.esc(proxima.ciudad) + '</p>' +
          '<a class="btn btn--primario" href="' + U.esc(ent.href) + '"' + ent.attrs + '>' +
            window.icon('ticket', 17) + U.esc(ent.texto) + '</a>' +
          (proxima.entradasNota ? '<p class="obra__nota">' + U.te(proxima.entradasNota) + '</p>' : '') +
        '</div>' +
      '</article>' + reloj;

  } else {
    bloqueProxima = '<p class="escenario__vacio">' + U.te(t.sinProxima) + '</p>';
  }

  var bloqueAnteriores = '';
  if (anteriores.length) {
    var filas = anteriores.map(function (p) {
      return '<li class="hecha">' +
        '<span class="hecha__anio">' + U.esc(p.anio) + '</span>' +
        '<span class="hecha__obra">' + U.te(p.titulo) + '</span>' +
        '<span class="hecha__lugar">' + U.esc(p.lugar) + ', ' + U.esc(p.ciudad) + '</span>' +
      '</li>';
    }).join('');
    bloqueAnteriores =
      '<div class="hechas">' +
        '<h3 class="hechas__titulo">' + U.te(t.etiquetaAnteriores) + '</h3>' +
        '<ul class="hechas__lista">' + filas + '</ul>' +
      '</div>';
  }

  return '' +
  '<section class="seccion seccion--linea escenario" id="escenario" aria-labelledby="escenario-titulo">' +
    '<div class="contenedor">' +
      '<div class="escenario__intro">' +
        '<h2 class="titulo-seccion" id="escenario-titulo">' + U.te(t.titulo) + '</h2>' +
        '<p class="lead">' + U.te(t.lead) + '</p>' +
      '</div>' +
      bloqueProxima + bloqueAnteriores +
    '</div>' +
  '</section>';
};
