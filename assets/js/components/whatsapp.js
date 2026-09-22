/* BOTÓN FLOTANTE DE WHATSAPP
   - Con una sola sede configurada: abre el chat directo.
   - Con varias: despliega un selector para elegir sede.
   Se oculta solo si ninguna sucursal tiene WhatsApp cargado. */
window.WhatsappFab = function () {
  var sedes = U.conWhatsapp();
  if (!sedes.length) return '';

  if (sedes.length === 1) {
    return '<a class="wa-fab" href="' + U.esc(U.whatsapp(sedes[0])) + '" ' +
      'target="_blank" rel="noopener noreferrer" ' +
      'aria-label="Escribinos por WhatsApp">' + window.icon('whatsapp', 26) + '</a>';
  }

  var opciones = sedes.map(function (s) {
    return '<a class="wa-menu__item" href="' + U.esc(U.whatsapp(s)) + '" ' +
      'target="_blank" rel="noopener noreferrer">' +
      '<span class="wa-menu__sede">' + U.esc(s.nombre) + '</span>' +
      '<span class="wa-menu__tel">' + U.esc(s.celular) + '</span>' +
    '</a>';
  }).join('');

  return '' +
  '<div class="wa-wrap">' +
    '<div class="wa-menu" id="wa-menu" hidden>' +
      '<p class="wa-menu__t">Elegí la sede</p>' +
      opciones +
    '</div>' +
    '<button type="button" class="wa-fab" id="wa-fab" ' +
      'aria-label="Escribinos por WhatsApp" aria-expanded="false" aria-controls="wa-menu">' +
      window.icon('whatsapp', 26) +
    '</button>' +
  '</div>';
};
