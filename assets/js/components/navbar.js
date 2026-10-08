/* NAVBAR + menú móvil + cambio de idioma */
window.Navbar = function () {
  var D = window.SITE_DATA, e = D.estudio;
  var nav = U.navegacion();

  var links = nav.map(function (n) {
    return '<a class="nav__link" href="' + n.href + '">' + U.te(n.etiqueta) + '</a>';
  }).join('');

  var linksMovil = nav.map(function (n, i) {
    return '<a class="menu-movil__link" href="' + n.href + '" style="animation-delay:' +
      (i * 70 + 120) + 'ms">' + U.te(n.etiqueta) + '</a>';
  }).join('');

  /* Botón de idioma: discreto, al lado del de contacto. Muestra el
     idioma al que se puede cambiar, no el actual. */
  var idioma =
    '<button class="idioma" id="btn-idioma" type="button" ' +
      'lang="' + U.otroIdioma() + '" title="' + U.ui('cambiarIdioma') + '" ' +
      'aria-label="' + U.ui('cambiarIdioma') + '">' +
      '<span class="idioma__actual">' + U.idioma().toUpperCase() + '</span>' +
      '<span class="idioma__otro">' + U.otroIdioma().toUpperCase() + '</span>' +
    '</button>';

  var marca =
    '<a class="marca" href="#inicio" aria-label="' + U.esc(e.nombre) + ', ' + U.ui('irInicio') + '">' +
      '<span class="marca__sup">' + U.te(e.logoLinea1) + '</span>' +
      '<span class="marca__nombre">' + U.te(e.logoLinea2) + '</span>' +
    '</a>';

  return '' +
  '<header class="nav" id="nav">' +
    '<div class="nav__inner">' +
      marca +
      '<nav class="nav__menu" aria-label="' + U.ui('secciones') + '">' + links + '</nav>' +
      '<div class="nav__acciones">' +
        idioma +
        '<a class="btn btn--primario btn--peq" href="#contacto">' + U.ui('consultarClases') + '</a>' +
        '<button class="nav__burger" id="burger" type="button" aria-label="' + U.ui('abrirMenu') + '" ' +
          'aria-expanded="false" aria-controls="menu-movil">' + window.icon('menu', 20) + '</button>' +
      '</div>' +
    '</div>' +
  '</header>' +

  '<div class="menu-movil" id="menu-movil" aria-hidden="true">' +
    '<nav class="menu-movil__lista" aria-label="' + U.ui('secciones') + '">' + linksMovil + '</nav>' +
    '<div class="menu-movil__pie">' +
      '<a class="btn btn--primario" href="#contacto">' + U.ui('consultarClases') + '</a>' +
      '<a class="btn btn--ghost" href="' + U.esc(D.contacto.instagramUrl) + '" ' +
        'target="_blank" rel="noopener noreferrer">' +
        window.icon('instagram', 16) + 'Instagram</a>' +
    '</div>' +
  '</div>';
};
