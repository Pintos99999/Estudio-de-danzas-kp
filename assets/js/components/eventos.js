/* EVENTOS — la sección que anuncia lo que viene.

   Se dibuja sólo si eventos.activo es true (se prende desde el panel).
   Cada evento decide cuánto se muestra de él con su campo "modo":
     contador -> la cuenta regresiva y los datos
     fotos    -> lo anterior + las fotos
     completo -> lo anterior + los videos y la descripción            */
window.EventosSection = function () {
  if (!U.activo('eventos')) return '';

  var D = window.SITE_DATA, t = D.eventos;
  var ev = U.proxima();
  var anteriores = U.anteriores();
  var es = U.idioma() === 'es';

  /* ---------- Cuenta regresiva ---------- */
  function reloj(evento) {
    var c = U.cuenta(evento.fechaHoraISO);
    if (!c || c.pasado) return '';

    var etiquetas = es
      ? { d: 'días', h: 'horas', m: 'minutos', s: 'segundos' }
      : { d: 'days', h: 'hours', m: 'minutes', s: 'seconds' };

    var cajas = ['d', 'h', 'm', 's'].map(function (k) {
      var v = c[k];
      return '<div class="reloj__caja">' +
        '<b class="reloj__num" data-cuenta="' + k + '">' + (v < 10 ? '0' + v : v) + '</b>' +
        '<span class="reloj__t">' + etiquetas[k] + '</span>' +
      '</div>';
    }).join('');

    return '<div class="reloj" id="reloj" data-fecha="' + U.esc(evento.fechaHoraISO) + '">' +
      '<p class="reloj__titulo">' + U.te(t.tituloReloj) + '</p>' +
      '<div class="reloj__cajas">' + cajas + '</div>' +
      '<p class="sr-only" id="reloj-texto">' + U.textoFalta(c) + '</p>' +
    '</div>';
  }

  /* ---------- Dónde y cuándo + entradas ---------- */
  function ficha(evento) {
    var ent = U.entradas(evento);

    var funciones = (evento.funciones || []).map(function (f) {
      return '<div class="funcion"><b>' + U.esc(f.hora) + '</b>' +
        '<span>' + U.te(f.nombre) + '</span></div>';
    }).join('');

    var lugar = '<p class="obra__lugar">' + window.icon('mapPin', 17) +
      '<span><strong>' + U.esc(evento.lugar) + '</strong>' +
      (evento.direccion ? '<br>' + U.esc(evento.direccion) : '') +
      (evento.ciudad ? '<br>' + U.esc(evento.ciudad) : '') + '</span></p>';

    var llegar = evento.coordenadas
      ? '<a class="btn btn--ghost btn--peq" target="_blank" rel="noopener noreferrer" ' +
        'href="https://www.google.com/maps/dir/?api=1&destination=' +
        encodeURIComponent(evento.coordenadas) + '">' +
        window.icon('mapPin', 15) + U.ui('comoLlegar') + '</a>'
      : '';

    var precio = evento.entradas && evento.entradas.precio
      ? '<p class="obra__precio">' + U.esc(evento.entradas.precio) + '</p>' : '';

    var nota = evento.entradas && evento.entradas.nota
      ? '<p class="obra__nota">' + U.te(evento.entradas.nota) + '</p>' : '';

    return '<div class="obra__datos">' +
      '<p class="obra__fecha">' + U.te(evento.fechaLegible) + '</p>' +
      (funciones ? '<div class="funciones">' + funciones + '</div>' : '') +
      lugar + precio +
      '<a class="btn btn--primario" href="' + U.esc(ent.href) + '"' + ent.attrs + '>' +
        window.icon('ticket', 17) + U.esc(ent.texto) + '</a>' +
      (llegar ? '<div class="obra__extra">' + llegar + '</div>' : '') +
      nota +
    '</div>';
  }

  /* ---------- Fotos del evento ---------- */
  function fotos(evento) {
    var ims = evento.imagenes || [];
    if (!ims.length) return '';

    var piezas = ims.map(function (im, i) {
      return '<button type="button" class="evento__foto" data-evento-foto="' + i + '" ' +
        'aria-label="' + U.ui('verImagen') + '">' +
        U.imgOpcional(im.src, im.alt) +
      '</button>';
    }).join('');

    return '<div class="evento__fotos">' + piezas + '</div>';
  }

  /* ---------- Videos (se cargan recién al tocarlos) ---------- */
  function videos(evento) {
    var vs = (evento.videos || []).map(function (v) {
      var yt = U.youtube(v.url);
      if (!yt) return '';
      return '<div class="video" data-embed="' + U.esc(yt.embed) + '">' +
        '<img src="' + U.esc(yt.miniatura) + '" alt="" loading="lazy" decoding="async">' +
        '<button type="button" class="video__play" aria-label="' +
          (es ? 'Reproducir video' : 'Play video') + '">' +
          '<span></span></button>' +
        (U.t(v.titulo) ? '<span class="video__titulo">' + U.te(v.titulo) + '</span>' : '') +
      '</div>';
    }).filter(Boolean).join('');

    return vs ? '<div class="evento__videos">' + vs + '</div>' : '';
  }

  /* ---------- El evento que viene ---------- */
  var bloque = '';

  if (ev) {
    var modo = ev.modo || 'contador';
    var conFotos = modo === 'fotos' || modo === 'completo';
    var conTodo = modo === 'completo';

    var parrafos = conTodo
      ? (ev.descripcion || []).map(function (p) { return '<p>' + U.te(p) + '</p>'; }).join('')
      : '';

    bloque =
      '<article class="obra">' +
        '<div class="obra__texto">' +
          '<h3 class="obra__titulo">' + U.te(ev.titulo) + '</h3>' +
          (ev.subtitulo ? '<p class="obra__sub">' + U.te(ev.subtitulo) + '</p>' : '') +
          (parrafos ? '<div class="obra__cuerpo">' + parrafos + '</div>' : '') +
        '</div>' +
        ficha(ev) +
      '</article>' +
      reloj(ev) +
      (conFotos ? fotos(ev) : '') +
      (conTodo ? videos(ev) : '');

  } else {
    bloque = '<p class="escenario__vacio">' + U.te(t.sinProximo) + '</p>';
  }

  /* ---------- Los que ya pasaron ---------- */
  var hechos = '';
  if (anteriores.length) {
    var filas = anteriores.map(function (p) {
      return '<li class="hecha">' +
        '<span class="hecha__anio">' + U.esc(p.anio) + '</span>' +
        '<span class="hecha__obra">' + U.te(p.titulo) + '</span>' +
        '<span class="hecha__lugar">' + U.esc(p.lugar) +
          (p.ciudad ? ', ' + U.esc(p.ciudad) : '') + '</span>' +
      '</li>';
    }).join('');
    hechos = '<div class="hechas">' +
      '<h3 class="hechas__titulo">' + U.te(t.etiquetaAnteriores) + '</h3>' +
      '<ul class="hechas__lista">' + filas + '</ul>' +
    '</div>';
  }

  return '' +
  '<section class="seccion seccion--linea escenario" id="eventos" aria-labelledby="eventos-titulo">' +
    '<div class="contenedor">' +
      '<div class="escenario__intro">' +
        '<p class="eyebrow">' + U.te(t.etiqueta) + '</p>' +
        '<h2 class="titulo-seccion" id="eventos-titulo">' + U.te(t.titulo) + '</h2>' +
        '<p class="lead">' + U.te(t.lead) + '</p>' +
      '</div>' +
      bloque + hechos +
    '</div>' +
  '</section>';
};
