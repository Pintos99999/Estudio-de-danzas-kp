/* UBICACIÓN — las sedes del estudio */
window.LocationSection = function () {
  var sedes = U.sucursales();

  var tarjetas = sedes.map(function (s, i) {
    var wa = U.whatsapp(s);

    var tels = '';
    if (s.telefono) {
      tels += '<li>' + window.icon('phone', 18) +
        '<a href="tel:' + U.esc(s.telefonoLink) + '">' + U.esc(s.telefono) + '</a></li>';
    }
    if (s.celular) {
      tels += '<li>' + window.icon('whatsapp', 18) +
        (wa ? '<a href="' + U.esc(wa) + '" target="_blank" rel="noopener noreferrer">' +
              U.esc(s.celular) + '</a>'
            : '<span>' + U.esc(s.celular) + '</span>') + '</li>';
    }

    return '<article class="sede reveal" style="--d:' + (i * 110) + 'ms">' +
      '<p class="sede__ciudad">' + U.esc(s.nombre) + '</p>' +
      '<p class="sede__dir">' + U.esc(s.direccion) + '</p>' +
      (s.referencia ? '<p class="sede__ref">' + U.esc(s.referencia) + '</p>' : '') +
      '<p class="sede__loc">' + U.esc(s.localidad) + '</p>' +
      '<ul class="sede__tels">' + tels + '</ul>' +
      '<div class="sede__acciones">' +
        '<a class="btn btn--ghost btn--peq" href="' + U.esc(U.mapsUrl(s)) + '" ' +
          'target="_blank" rel="noopener noreferrer">' +
          window.icon('mapPin', 15) + 'Cómo llegar' + window.icon('arrowUpRight', 13) + '</a>' +
        (wa ? '<a class="btn btn--wa btn--peq" href="' + U.esc(wa) + '" ' +
              'target="_blank" rel="noopener noreferrer">' +
              window.icon('whatsapp', 15) + 'WhatsApp</a>' : '') +
      '</div>' +
    '</article>';
  }).join('');

  var pestanas = sedes.map(function (s, i) {
    return '<button type="button" class="mapa__tab' + (i === 0 ? ' is-active' : '') + '" ' +
      'data-mapa="' + U.esc(s.id) + '" aria-pressed="' + (i === 0) + '">' +
      U.esc(s.nombre) + '</button>';
  }).join('');

  var primera = sedes[0];

  return '' +
  '<section class="seccion seccion--linea" id="ubicacion" aria-labelledby="ubicacion-titulo">' +
    '<div class="contenedor">' +
      '<div class="reveal">' +
        '<p class="eyebrow">Sedes</p>' +
        '<h2 class="titulo-seccion" id="ubicacion-titulo">Encontranos</h2>' +
        '<p class="lead">Dos salas, la misma forma de trabajar.</p>' +
      '</div>' +

      '<div class="sedes">' + tarjetas + '</div>' +

      '<div class="mapa-bloque reveal">' +
        '<div class="mapa__tabs" role="group" aria-label="Elegir sede para ver en el mapa">' +
          pestanas +
        '</div>' +
        '<div class="mapa">' +
          '<iframe id="mapa-iframe" title="Mapa con la ubicación de la sede" ' +
            'src="' + U.esc(U.mapsEmbed(primera)) + '" loading="lazy" ' +
            'referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>' +
        '</div>' +
      '</div>' +
    '</div>' +
  '</section>';
};
