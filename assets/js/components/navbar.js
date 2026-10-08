/* NAVBAR + menú móvil.
   El botón del encabezado es siempre del estudio ("Consultar clases"),
   no de una obra: así no queda un botón de entradas colgado cuando la
   presentación ya pasó. */
window.Navbar = function () {
  var D = window.SITE_DATA, e = D.estudio;

  var links = D.navegacion.map(function (n) {
    return '<a class="nav__link" href="' + n.href + '">' + U.esc(n.etiqueta) + '</a>';
  }).join('');

  var linksMovil = D.navegacion.map(function (n, i) {
    return '<a class="menu-movil__link" href="' + n.href + '" style="animation-delay:' +
      (i * 70 + 120) + 'ms">' + U.esc(n.etiqueta) + '</a>';
  }).join('');

  /* La marca sale de siteData: si se renombra el estudio, cambia en
     el encabezado, en el pie y en la portada a la vez. */
  var marca =
    '<a class="marca" href="#inicio" aria-label="' + U.esc(e.nombre) + ', ir al inicio">' +
      '<span class="marca__sup">' + U.esc(e.logoLinea1) + '</span>' +
      '<span class="marca__nombre">' + U.esc(e.logoLinea2) + '</span>' +
    '</a>';

  return '' +
  '<header class="nav" id="nav">' +
    '<div class="nav__inner">' +
      marca +
      '<nav class="nav__menu" aria-label="Navegación principal">' + links + '</nav>' +
      '<div class="nav__acciones">' +
        '<a class="btn btn--primario btn--peq" href="#contacto">Consultar clases</a>' +
        '<button class="nav__burger" id="burger" type="button" aria-label="Abrir menú" ' +
          'aria-expanded="false" aria-controls="menu-movil">' + window.icon('menu', 20) + '</button>' +
      '</div>' +
    '</div>' +
  '</header>' +

  '<div class="menu-movil" id="menu-movil" aria-hidden="true">' +
    '<nav class="menu-movil__lista" aria-label="Navegación móvil">' + linksMovil + '</nav>' +
    '<div class="menu-movil__pie">' +
      '<a class="btn btn--primario" href="#contacto">Consultar clases</a>' +
      '<a class="btn btn--ghost" href="' + U.esc(D.contacto.instagramUrl) + '" ' +
        'target="_blank" rel="noopener noreferrer">' +
        window.icon('instagram', 16) + 'Instagram</a>' +
    '</div>' +
  '</div>';
};
