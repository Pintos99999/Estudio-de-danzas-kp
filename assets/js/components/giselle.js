/* SECCIÓN GISELLE + agenda de presentaciones */
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
      '<div class="giselle__grid">' +

        '<div class="reveal">' +
          '<p class="eyebrow">Ballet · ' + U.esc(e.etiqueta) + '</p>' +
          '<h2 class="titulo-seccion giselle__titulo script" id="giselle-titulo">' + U.esc(e.titulo) + '</h2>' +
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
