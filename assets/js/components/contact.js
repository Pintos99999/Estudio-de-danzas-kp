/* CONTACTO — canales + formulario */
window.ContactSection = function () {
  var D = window.SITE_DATA, c = D.contacto, f = D.formulario;
  var email = U.email();

  function canal(href, ico, titulo, valor, externo, clase) {
    return '<a class="canal ' + (clase || '') + '" href="' + U.esc(href) + '"' +
      (externo ? ' target="_blank" rel="noopener noreferrer"' : '') + '>' +
      window.icon(ico, 20) +
      '<span class="canal__t">' + U.esc(titulo) + '</span>' +
      '<span class="canal__v">' + U.esc(valor) + '</span>' +
    '</a>';
  }

  var canales = '';

  /* WhatsApp de cada sede primero: es el canal más usado */
  U.conWhatsapp().forEach(function (s) {
    canales += canal(U.whatsapp(s), 'whatsapp', 'WhatsApp ' + s.nombre, s.celular, true, 'canal--wa');
  });

  canales += canal(c.instagramUrl, 'instagram', 'Instagram', c.instagramUsuario, true);
  if (email) canales += canal('mailto:' + email, 'mail', 'Email', email, false);

  U.sucursales().forEach(function (s) {
    if (s.telefono) {
      canales += canal('tel:' + s.telefonoLink, 'phone', 'Teléfono ' + s.nombre, s.telefono, false);
    }
  });

  return '' +
  '<section class="seccion contacto" id="contacto" aria-labelledby="contacto-titulo">' +
    '<div class="contenedor">' +
      '<div class="contacto__grid">' +

        '<div class="reveal">' +
          '<p class="eyebrow">Contacto</p>' +
          '<h2 class="titulo-seccion" id="contacto-titulo">' + U.esc(f.tituloSeccion) + '</h2>' +
          '<p class="lead">' + U.esc(f.textoSeccion) + '</p>' +
          '<div class="canales">' + canales + '</div>' +
        '</div>' +

        '<div class="reveal" style="--d:120ms">' +
          '<form class="form" id="form-contacto" novalidate>' +
            '<div class="campo">' +
              '<label for="f-nombre">Nombre</label>' +
              '<input id="f-nombre" name="nombre" type="text" autocomplete="name" ' +
                'required placeholder="Tu nombre">' +
            '</div>' +
            '<div class="campo">' +
              '<label for="f-email">Email</label>' +
              '<input id="f-email" name="email" type="email" autocomplete="email" ' +
                'required placeholder="tu@email.com">' +
            '</div>' +
            '<div class="campo">' +
              '<label for="f-sede">Sede de interés</label>' +
              '<select id="f-sede" name="sede">' +
                U.sucursales().map(function (s) {
                  return '<option value="' + U.esc(s.nombre) + '">' + U.esc(s.nombre) + '</option>';
                }).join('') +
                '<option value="Sin definir">Todavía no lo sé</option>' +
              '</select>' +
            '</div>' +
            '<div class="campo">' +
              '<label for="f-mensaje">Mensaje</label>' +
              '<textarea id="f-mensaje" name="mensaje" required ' +
                'placeholder="Contanos en qué te podemos ayudar"></textarea>' +
            '</div>' +
            /* Trampa anti-spam de FormSubmit: invisible para personas */
            '<input type="text" name="_honey" style="display:none" tabindex="-1" autocomplete="off" aria-hidden="true">' +
            '<p class="form__aviso" id="form-aviso" role="status" aria-live="polite" hidden></p>' +
            '<button class="btn btn--primario" type="submit">' +
              window.icon('mail', 17) + 'Enviar mensaje</button>' +
          '</form>' +
        '</div>' +

      '</div>' +
    '</div>' +
  '</section>';
};
