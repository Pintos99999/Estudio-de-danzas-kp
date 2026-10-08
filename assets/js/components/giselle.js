/* GISELLE — el evento del estudio, con cuenta regresiva */
window.GiselleSection = function () {
  var D = window.SITE_DATA, e = D.evento, t = U.entradas();

  var funciones = e.funciones.map(function (f) {
    return '<div class="ficha__funcion">' +
      '<span class="ficha__hora">' + U.esc(f.hora) + '</span>' +
      '<span class="ficha__etiqueta">' + U.esc(f.nombre) + '</span>' +
    '</div>';
  }).join('');

  var parrafos = e.descripcion.map(function (p) {
    return '<p>' + U.esc(p) + '</p>';
  }).join('');

  var partes = e.fechaLarga.split(' ');           // "16 Octubre 2026"
  var diaNum = partes[0], mes = partes[1] || '', anio = partes[2] || '';

  /* ---- Cuenta regresiva ---- */
  var c = U.cuenta(e.fechaHoraISO);
  var reloj = '';

  if (c && !c.pasado) {
    var casillas = [
      { k: 'd', t: 'días' },
      { k: 'h', t: 'horas' },
      { k: 'm', t: 'minutos' },
      { k: 's', t: 'segundos' }
    ].map(function (x) {
      var v = c[x.k];
      return '<div class="reloj__caja">' +
        '<b class="reloj__num" data-cuenta="' + x.k + '">' + (v < 10 ? '0' + v : v) + '</b>' +
        '<span class="reloj__t">' + x.t + '</span>' +
      '</div>';
    }).join('<span class="reloj__sep" aria-hidden="true">:</span>');

    reloj =
      '<div class="reloj reveal" id="reloj" data-fecha="' + U.esc(e.fechaHoraISO) + '">' +
        '<p class="reloj__titulo">' + window.icon('sparkle', 16) + 'Falta para la primera función</p>' +
        '<div class="reloj__cajas" role="timer" aria-live="off">' + casillas + '</div>' +
        /* Texto equivalente para lectores de pantalla, sin el tic-tac */
        '<p class="sr-only" id="reloj-texto">La primera función ' + U.textoFalta(c) + '.</p>' +
      '</div>';
  } else if (c && c.pasado) {
    reloj =
      '<div class="reloj reloj--pasado reveal" id="reloj">' +
        '<p class="reloj__fin">' + U.esc(e.funcionRealizada || 'Función realizada.') + '</p>' +
      '</div>';
  }

  var agenda = D.presentaciones.map(function (p) {
    var clase = p.estado === 'confirmado' ? 'chip chip--confirmado' : 'chip';
    var etiqueta = p.estado === 'confirmado' ? 'Fecha confirmada'
                 : p.estado === 'en-preparacion' ? 'En preparación' : 'Próximamente';
    return '<div class="agenda__item">' +
      '<div class="agenda__obra">' + U.esc(p.titulo) + '</div>' +
      '<div class="agenda__meta"><b>' + U.esc(p.fecha) + '</b>' +
        U.esc(p.lugar) + (p.detalle ? ' · ' + U.esc(p.detalle) : '') + '</div>' +
      '<span class="' + clase + '">' + etiqueta + '</span>' +
    '</div>';
  }).join('');

  var nota = e.entradasNota
    ? '<p class="ficha__nota">' + U.esc(e.entradasNota) + '</p>'
    : '';

  return '' +
  '<section class="seccion giselle" id="giselle" aria-labelledby="giselle-titulo">' +
    '<div class="contenedor">' +

      '<div class="giselle__encabezado reveal">' +
        '<p class="eyebrow">' + U.esc(e.etiqueta) + '</p>' +
        '<h2 class="titulo-seccion" id="giselle-titulo">' +
          'Este año subimos <em>Giselle</em> al escenario</h2>' +
        '<p class="lead">El trabajo de todo un año, en dos funciones.</p>' +
      '</div>' +

      reloj +

      '<div class="giselle__grid">' +

        '<div class="reveal">' +
          '<p class="giselle__obra script">' + U.esc(e.titulo) + '</p>' +
          '<blockquote class="giselle__cita">' + U.esc(e.subtituloPlano) + '</blockquote>' +
          '<div class="texto-tenue">' + parrafos + '</div>' +
        '</div>' +

        '<div class="ficha reveal" style="--d:140ms">' +
          '<div class="ficha__fecha">' +
            '<p class="ficha__dia">' + U.esc(e.diaSemana) + '</p>' +
            '<p class="ficha__num">' + U.esc(diaNum) + ' ' + U.esc(mes) + '</p>' +
            '<p class="ficha__anio">' + U.esc(anio) + '</p>' +
          '</div>' +
          '<div class="ficha__funciones">' + funciones + '</div>' +
          '<div class="ficha__lugar">' + window.icon('mapPin', 20) +
            '<div><strong>' + U.esc(e.teatro) + '</strong>' +
            '<span>' + U.esc(e.teatroCiudad) + ' · ' + U.esc(D.estudio.pais) + '</span></div>' +
          '</div>' +
          '<a class="btn btn--primario" href="' + U.esc(t.href) + '"' + t.attrs + '>' +
            window.icon('ticket', 17) + U.esc(t.texto) + '</a>' +
          nota +
        '</div>' +

      '</div>' +

      '<div class="agenda reveal">' +
        '<h3 class="agenda__titulo">Próximas presentaciones</h3>' +
        agenda +
      '</div>' +
    '</div>' +
  '</section>';
};
