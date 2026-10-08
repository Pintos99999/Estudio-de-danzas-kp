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
  if (c.facebookUrl) canales += canal(c.facebookUrl, 'facebook', 'Facebook', c.facebookUsuario, true);
  if (email) canales += canal('mailto:' + email, 'mail', U.ui('email'), email, false);

  U.sucursales().forEach(function (s) {
    if (s.telefono) {
      canales += canal('tel:' + s.telefonoLink, 'phone',
        (U.idioma() === 'es' ? 'Teléfono ' : 'Phone ') + s.nombre, s.telefono, false);
    }
  });

  return '' +
  '<section class="seccion contacto" id="contacto" aria-labelledby="contacto-titulo">' +
    '<div class="contenedor">' +
      '<div class="contacto__grid">' +

        '<div class="reveal">' +
          '<p class="eyebrow">' + U.ui('contacto') + '</p>' +
          '<h2 class="titulo-seccion" id="contacto-titulo">' + U.te(f.tituloSeccion) + '</h2>' +
          '<p class="lead">' + U.te(f.textoSeccion) + '</p>' +
          '<div class="canales">' + canales + '</div>' +
        '</div>' +

        '<div class="reveal" style="--d:120ms">' +
          '<form class="form" id="form-contacto" novalidate>' +
            '<div class="campo">' +
              '<label for="f-nombre">' + U.ui('nombre') + '</label>' +
              '<input id="f-nombre" name="nombre" type="text" autocomplete="name" ' +
                'required placeholder="' + U.ui('tuNombre') + '">' +
            '</div>' +
            '<div class="campo">' +
              '<label for="f-email">' + U.ui('email') + '</label>' +
              '<input id="f-email" name="email" type="email" autocomplete="email" ' +
                'required placeholder="tu@email.com">' +
            '</div>' +
            '<div class="campo">' +
              '<label for="f-sede">' + U.ui('sedeInteres') + '</label>' +
              '<select id="f-sede" name="sede">' +
                U.sucursales().map(function (s) {
                  return '<option value="' + U.esc(s.nombre) + '">' + U.esc(s.nombre) + '</option>';
                }).join('') +
                '<option value="Sin definir">' + U.ui('noLoSe') + '</option>' +
              '</select>' +
            '</div>' +
            '<div class="campo">' +
              '<label for="f-mensaje">' + U.ui('mensaje') + '</label>' +
              '<textarea id="f-mensaje" name="mensaje" required ' +
                'placeholder="' + U.ui('mensajePlaceholder') + '"></textarea>' +
            '</div>' +
            /* Trampa anti-spam: invisible para personas */
            '<input type="text" name="_honey" style="display:none" tabindex="-1" autocomplete="off" aria-hidden="true">' +
            '<p class="form__aviso" id="form-aviso" role="status" aria-live="polite" hidden></p>' +
            '<button class="btn btn--primario" type="submit">' +
              window.icon('mail', 17) + U.ui('enviarMensaje') + '</button>' +
          '</form>' +
        '</div>' +

      '</div>' +
    '</div>' +
  '</section>';
};
