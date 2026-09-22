/* UBICACIÓN */
window.LocationSection = function () {
  var c = window.SITE_DATA.contacto;

  return '' +
  '<section class="seccion seccion--linea" id="ubicacion" aria-labelledby="ubicacion-titulo">' +
    '<div class="contenedor">' +
      '<div class="ubicacion__grid">' +

        '<div class="reveal">' +
          '<p class="eyebrow">Ubicación</p>' +
          '<h2 class="titulo-seccion" id="ubicacion-titulo">Encontranos</h2>' +
          '<ul class="datos-lista">' +
            '<li>' + window.icon('mapPin', 20) +
              '<div><p class="datos-lista__t">Dirección</p>' +
              '<p class="datos-lista__v">' + U.esc(c.direccion) + '<br>' +
              U.esc(c.codigoPostal) + ' ' + U.esc(c.localidad) + ', ' + U.esc(c.pais) + '</p></div></li>' +
            '<li>' + window.icon('phone', 20) +
              '<div><p class="datos-lista__t">Teléfono</p>' +
              '<p class="datos-lista__v"><a href="tel:' + U.esc(c.telefonoLink) + '">' +
              U.esc(c.telefono) + '</a></p></div></li>' +
          '</ul>' +
          '<div class="acciones" style="margin-top:2rem">' +
            '<a class="btn btn--ghost" href="' + U.esc(U.mapsUrl()) + '" target="_blank" rel="noopener noreferrer">' +
              window.icon('mapPin', 17) + 'Cómo llegar' + window.icon('arrowUpRight', 15) + '</a>' +
          '</div>' +
        '</div>' +

        '<div class="mapa reveal" style="--d:120ms">' +
          '<iframe title="Mapa con la ubicación del Estudio de Danzas Karen Pintos" ' +
            'src="' + U.esc(U.mapsEmbed()) + '" loading="lazy" ' +
            'referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>' +
        '</div>' +

      '</div>' +
    '</div>' +
  '</section>';
};
