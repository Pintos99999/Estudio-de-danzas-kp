/* =============================================================
   PANEL DE ADMINISTRACIÓN
   -------------------------------------------------------------
   Lee los datos actuales del sitio, deja editarlos con formularios
   y los vuelve a escribir en assets/js/siteData.js.

   No necesita servidor: publica usando la API de GitHub.
   ============================================================= */
(function () {
  'use strict';

  var REPO = 'Pintos99999/Estudio-de-danzas-kp';
  var RAMA = 'main';
  var ARCHIVO = 'assets/js/siteData.js';
  var CARPETA_EVENTOS = 'assets/img/eventos';
  var CARPETA_GALERIA = 'assets/img/galeria';
  var LLAVE_BORRADOR = 'kp-panel-borrador';
  var LLAVE_TOKEN = 'kp-panel-token';

  /* Copia de trabajo: se edita esto, no los datos del sitio */
  var D = JSON.parse(JSON.stringify(window.SITE_DATA));
  var hayBorrador = false;

  var $ = function (s) { return document.querySelector(s); };
  var estado = $('#estado');

  /* ---------------------------------------------------------
     Utilidades
     --------------------------------------------------------- */
  function avisar(texto, tipo) {
    estado.textContent = texto || '';
    estado.className = 'estado' + (tipo ? ' estado--' + tipo : '');
  }

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  /* Lee y escribe por ruta: "instituto.lema" */
  function leer(ruta) {
    return ruta.split('.').reduce(function (o, k) {
      return (o == null) ? undefined : o[k];
    }, D);
  }
  function escribir(ruta, valor) {
    var partes = ruta.split('.');
    var ultima = partes.pop();
    var destino = partes.reduce(function (o, k) {
      if (o[k] == null) o[k] = {};
      return o[k];
    }, D);
    destino[ultima] = valor;
  }

  /* Texto traducible: siempre devuelve { es, en } */
  function par(v) {
    if (v == null) return { es: '', en: '' };
    if (typeof v === 'string') return { es: v, en: '' };
    return { es: v.es || '', en: v.en || '' };
  }

  function guardarBorrador() {
    try {
      localStorage.setItem(LLAVE_BORRADOR, JSON.stringify(D));
      hayBorrador = true;
      $('#aviso-borrador').hidden = false;
    } catch (e) { /* sin espacio: se sigue igual */ }
  }

  function quitarBorrador() {
    try { localStorage.removeItem(LLAVE_BORRADOR); } catch (e) {}
    hayBorrador = false;
    $('#aviso-borrador').hidden = true;
  }

  /* ---------------------------------------------------------
     Controles reutilizables
     --------------------------------------------------------- */

  /* Campo de texto simple (no se traduce) */
  function campoTexto(etiqueta, ruta, opciones) {
    var o = opciones || {};
    var valor = leer(ruta);
    var id = 'c-' + ruta.replace(/\W/g, '-');
    var control = o.area
      ? '<textarea id="' + id + '" data-ruta="' + ruta + '">' + esc(valor) + '</textarea>'
      : '<input id="' + id + '" type="' + (o.tipo || 'text') + '" data-ruta="' + ruta +
        '" value="' + esc(valor) + '"' + (o.pista2 ? ' placeholder="' + esc(o.pista2) + '"' : '') + '>';

    return '<div class="campo">' +
      '<label for="' + id + '">' + esc(etiqueta) + '</label>' + control +
      (o.pista ? '<p class="campo__pista">' + esc(o.pista) + '</p>' : '') +
    '</div>';
  }

  /* Campo traducible: español e inglés lado a lado */
  function campoDoble(etiqueta, ruta, opciones) {
    var o = opciones || {};
    var v = par(leer(ruta));
    var base = 'c-' + ruta.replace(/\W/g, '-');

    function lado(idioma, texto) {
      var id = base + '-' + idioma;
      var control = o.area
        ? '<textarea id="' + id + '" data-ruta="' + ruta + '" data-idioma="' + idioma + '">' + esc(texto) + '</textarea>'
        : '<input id="' + id + '" type="text" data-ruta="' + ruta + '" data-idioma="' + idioma + '" value="' + esc(texto) + '">';
      return '<div><span class="doble__idioma">' +
        (idioma === 'es' ? 'Español' : 'Inglés') + '</span>' + control + '</div>';
    }

    return '<div class="campo">' +
      '<span class="campo__t">' + esc(etiqueta) + '</span>' +
      '<div class="doble">' + lado('es', v.es) + lado('en', v.en) + '</div>' +
      (o.pista ? '<p class="campo__pista">' + esc(o.pista) + '</p>' : '') +
    '</div>';
  }

  function interruptor(etiqueta, ruta) {
    var v = !!leer(ruta);
    return '<label class="interruptor">' +
      '<input type="checkbox" data-ruta="' + ruta + '" data-tipo="bool"' + (v ? ' checked' : '') + '>' +
      '<span class="interruptor__pista"></span>' +
      '<span class="interruptor__texto">' + esc(etiqueta) + '</span>' +
    '</label>';
  }

  /* ---------------------------------------------------------
     Secciones del panel
     --------------------------------------------------------- */
  var SECCIONES = [
    { id: 'eventos',     nombre: 'Eventos',     pinta: pintarEventos },
    { id: 'portada',     nombre: 'Portada',     pinta: pintarPortada },
    { id: 'estudio',     nombre: 'El estudio',  pinta: pintarEstudio },
    { id: 'disciplinas', nombre: 'Disciplinas', pinta: pintarDisciplinas },
    { id: 'galeria',     nombre: 'Galería',     pinta: pintarGaleria },
    { id: 'sedes',       nombre: 'Sedes',       pinta: pintarSedes },
    { id: 'redes',       nombre: 'Redes',       pinta: pintarRedes }
  ];

  var seccionActual = 'eventos';

  /* ---------- EVENTOS ---------- */
  function pintarEventos() {
    var h = '';

    h += '<div class="bloque">' +
      '<h2 class="bloque__titulo">La sección de eventos</h2>' +
      '<p class="bloque__ayuda">Apagada, el sitio no menciona ningún evento: ' +
        'no aparece la sección, ni el aviso de la portada, ni en el menú.</p>' +
      interruptor('Mostrar los eventos en el sitio', 'eventos.activo') +
    '</div>';

    var eventos = D.listaEventos || [];

    if (!eventos.length) {
      h += '<div class="bloque"><p class="bloque__ayuda">Todavía no hay ningún evento cargado.</p></div>';
    }

    eventos.forEach(function (ev, i) {
      h += pintarUnEvento(ev, i);
    });

    h += '<button class="boton boton--fuerte" type="button" data-accion="nuevo-evento">+ Agregar un evento</button>';
    return h;
  }

  function pintarUnEvento(ev, i) {
    var base = 'listaEventos.' + i;
    var cuando = new Date(ev.fechaHoraISO);
    var valido = !isNaN(cuando.getTime());
    var paraInput = valido ? fechaParaInput(cuando) : '';
    var pasado = valido && cuando.getTime() < Date.now();

    var modos = [
      { v: 'contador', t: 'Sólo contador', d: 'La cuenta regresiva, la fecha, el lugar y las entradas.' },
      { v: 'fotos',    t: 'Contador y fotos', d: 'Lo anterior más las fotos del evento.' },
      { v: 'completo', t: 'Todo', d: 'Lo anterior más los videos y la descripción.' }
    ].map(function (m) {
      var elegido = (ev.modo || 'contador') === m.v;
      return '<label class="modo' + (elegido ? ' elegido' : '') + '">' +
        '<input type="radio" name="modo-' + i + '" data-ruta="' + base + '.modo" ' +
          'data-tipo="modo" value="' + m.v + '"' + (elegido ? ' checked' : '') + '>' +
        '<span class="modo__t">' + m.t + '</span>' +
        '<span class="modo__d">' + m.d + '</span>' +
      '</label>';
    }).join('');

    var funciones = (ev.funciones || []).map(function (f, j) {
      return '<div class="item">' +
        '<div class="item__cabecera">' +
          '<span class="item__nombre">Función ' + (j + 1) + '</span>' +
          '<button class="boton boton--peq boton--riesgo" type="button" ' +
            'data-accion="borrar-funcion" data-evento="' + i + '" data-indice="' + j + '">Quitar</button>' +
        '</div>' +
        campoTexto('Hora', base + '.funciones.' + j + '.hora', { pista2: '17:00' }) +
        campoDoble('Cómo se llama', base + '.funciones.' + j + '.nombre') +
      '</div>';
    }).join('');

    var fotos = (ev.imagenes || []).map(function (im, j) {
      return '<div class="foto">' +
        '<img src="' + esc(im.src) + '" alt="">' +
        '<div class="foto__pie">' +
          '<input type="text" data-ruta="' + base + '.imagenes.' + j + '.alt" data-idioma="es" ' +
            'value="' + esc(par(im.alt).es) + '" placeholder="Qué se ve en la foto">' +
          '<button class="boton boton--peq boton--riesgo" type="button" ' +
            'data-accion="borrar-foto-evento" data-evento="' + i + '" data-indice="' + j + '">Quitar</button>' +
        '</div>' +
      '</div>';
    }).join('');

    var videos = (ev.videos || []).map(function (v, j) {
      return '<div class="item">' +
        '<div class="item__cabecera">' +
          '<span class="item__nombre">Video ' + (j + 1) + '</span>' +
          '<button class="boton boton--peq boton--riesgo" type="button" ' +
            'data-accion="borrar-video" data-evento="' + i + '" data-indice="' + j + '">Quitar</button>' +
        '</div>' +
        campoTexto('Enlace de YouTube', base + '.videos.' + j + '.url', {
          tipo: 'url', pista2: 'https://www.youtube.com/watch?v=...',
          pista: 'Pegá el enlace del video tal como lo copiás de YouTube.'
        }) +
        campoDoble('Título del video (opcional)', base + '.videos.' + j + '.titulo') +
      '</div>';
    }).join('');

    var entradasModo = (ev.entradas && ev.entradas.modo) || 'consultar';
    var opcionesEntradas = [
      { v: 'sedes',     t: 'En las sedes del estudio' },
      { v: 'link',      t: 'Venta online (con enlace)' },
      { v: 'consultar', t: 'Todavía no hay venta' }
    ].map(function (o) {
      return '<option value="' + o.v + '"' + (entradasModo === o.v ? ' selected' : '') + '>' + o.t + '</option>';
    }).join('');

    return '<div class="bloque">' +
      '<h2 class="bloque__titulo">' +
        '<span>' + esc(typeof ev.titulo === 'string' ? ev.titulo : par(ev.titulo).es || 'Evento sin nombre') +
        (pasado ? ' <span style="color:var(--p-suave);font-size:.8rem">(ya pasó)</span>' : '') + '</span>' +
        '<button class="boton boton--peq boton--riesgo" type="button" ' +
          'data-accion="borrar-evento" data-indice="' + i + '">Borrar evento</button>' +
      '</h2>' +

      campoTexto('Nombre del evento', base + '.titulo') +
      campoDoble('Frase corta debajo del nombre', base + '.subtitulo') +

      '<div class="campo">' +
        '<span class="campo__t">Cuánto mostrar de este evento</span>' +
        '<div class="modos">' + modos + '</div>' +
      '</div>' +

      '<div class="campo">' +
        '<label for="f-' + i + '">Fecha y hora</label>' +
        '<input id="f-' + i + '" type="datetime-local" data-ruta="' + base + '" ' +
          'data-tipo="fecha" value="' + esc(paraInput) + '">' +
        '<p class="campo__pista">Hora de Uruguay. De acá sale la cuenta regresiva.</p>' +
      '</div>' +

      campoTexto('Lugar', base + '.lugar', { pista2: 'Teatro Florencio Sánchez' }) +
      campoTexto('Ciudad', base + '.ciudad', { pista2: 'Paysandú' }) +
      campoTexto('Dirección (opcional)', base + '.direccion') +
      campoTexto('Coordenadas del lugar (opcional)', base + '.coordenadas', {
        pista: 'En Google Maps: clic derecho sobre el lugar y copiá los números. Con esto aparece el botón "Cómo llegar".',
        pista2: '-32.3206073,-58.0729974'
      }) +

      '<h3 class="bloque__titulo" style="font-size:.95rem;margin-top:1.6rem">Horarios</h3>' +
      funciones +
      '<button class="boton boton--peq" type="button" data-accion="nueva-funcion" data-evento="' + i + '">+ Agregar horario</button>' +

      '<h3 class="bloque__titulo" style="font-size:.95rem;margin-top:1.6rem">Entradas</h3>' +
      '<div class="campo">' +
        '<label for="e-' + i + '">Cómo se consiguen</label>' +
        '<select id="e-' + i + '" data-ruta="' + base + '.entradas.modo">' + opcionesEntradas + '</select>' +
      '</div>' +
      campoTexto('Enlace de venta (sólo si elegiste venta online)', base + '.entradas.url', { tipo: 'url' }) +
      campoTexto('Precio (opcional)', base + '.entradas.precio', { pista2: '$ 500 · Jubilados $ 350' }) +
      campoDoble('Aclaración sobre las entradas', base + '.entradas.nota', { area: true }) +

      '<h3 class="bloque__titulo" style="font-size:.95rem;margin-top:1.6rem">Descripción</h3>' +
      '<p class="bloque__ayuda">Se muestra sólo si elegiste "Todo" más arriba.</p>' +
      campoDoble('De qué se trata', base + '.descripcion.0', { area: true }) +

      '<h3 class="bloque__titulo" style="font-size:.95rem;margin-top:1.6rem">Fotos</h3>' +
      '<p class="bloque__ayuda">Se muestran con "Contador y fotos" o "Todo". ' +
        'Se achican solas al subirlas, no te preocupes por el peso.</p>' +
      (fotos ? '<div class="fotos">' + fotos + '</div>' : '') +
      '<div class="soltar" data-subir="evento" data-evento="' + i + '">' +
        'Tocá acá para elegir fotos, o arrastralas' +
        '<div class="barra" hidden><div class="barra__relleno"></div></div>' +
      '</div>' +

      '<h3 class="bloque__titulo" style="font-size:.95rem;margin-top:1.6rem">Videos</h3>' +
      '<p class="bloque__ayuda">Se muestran sólo con "Todo".</p>' +
      videos +
      '<button class="boton boton--peq" type="button" data-accion="nuevo-video" data-evento="' + i + '">+ Agregar video</button>' +
    '</div>';
  }

  function fechaParaInput(d) {
    function dd(n) { return (n < 10 ? '0' : '') + n; }
    return d.getFullYear() + '-' + dd(d.getMonth() + 1) + '-' + dd(d.getDate()) +
      'T' + dd(d.getHours()) + ':' + dd(d.getMinutes());
  }

  /* ---------- PORTADA ---------- */
  function pintarPortada() {
    var cifras = (D.instituto.cifras || []).map(function (c, i) {
      return '<div class="item">' +
        '<div class="item__cabecera">' +
          '<span class="item__nombre">Dato ' + (i + 1) + '</span>' +
          '<button class="boton boton--peq boton--riesgo" type="button" ' +
            'data-accion="borrar-cifra" data-indice="' + i + '">Quitar</button>' +
        '</div>' +
        campoDoble('Lo grande', 'instituto.cifras.' + i + '.valor') +
        campoDoble('Lo chico de abajo', 'instituto.cifras.' + i + '.etiqueta') +
      '</div>';
    }).join('');

    return '<div class="bloque">' +
      '<h2 class="bloque__titulo">Lo que se lee al entrar</h2>' +
      campoDoble('Línea de arriba', 'instituto.eyebrow') +
      campoDoble('Lema', 'instituto.lema') +
      campoDoble('Bajada', 'instituto.bajada', { area: true }) +
    '</div>' +
    '<div class="bloque">' +
      '<h2 class="bloque__titulo">Los tres datos de abajo</h2>' +
      cifras +
      '<button class="boton boton--peq" type="button" data-accion="nueva-cifra">+ Agregar dato</button>' +
    '</div>';
  }

  /* ---------- EL ESTUDIO ---------- */
  function pintarEstudio() {
    var pilares = (D.sobre.pilares || []).map(function (p, i) {
      return '<div class="item">' +
        '<div class="item__cabecera">' +
          '<span class="item__nombre">' + esc(par(p.titulo).es) + '</span>' +
          '<button class="boton boton--peq boton--riesgo" type="button" ' +
            'data-accion="borrar-pilar" data-indice="' + i + '">Quitar</button>' +
        '</div>' +
        campoDoble('Título', 'sobre.pilares.' + i + '.titulo') +
        campoDoble('Texto', 'sobre.pilares.' + i + '.texto', { area: true }) +
      '</div>';
    }).join('');

    var parrafos = (D.sobre.parrafos || []).map(function (p, i) {
      return campoDoble('Párrafo ' + (i + 1), 'sobre.parrafos.' + i, { area: true });
    }).join('');

    return '<div class="bloque">' +
      '<h2 class="bloque__titulo">La frase grande</h2>' +
      campoDoble('Manifiesto', 'instituto.manifiesto', { area: true }) +
    '</div>' +
    '<div class="bloque">' +
      '<h2 class="bloque__titulo">Sobre nosotros</h2>' +
      campoDoble('Título', 'sobre.titulo') +
      campoDoble('Frase destacada', 'sobre.lead', { area: true }) +
      parrafos +
    '</div>' +
    '<div class="bloque">' +
      '<h2 class="bloque__titulo">Los cuatro pilares</h2>' +
      pilares +
    '</div>' +
    '<div class="bloque">' +
      '<h2 class="bloque__titulo">Sé parte de la familia</h2>' +
      campoDoble('Título', 'familia.titulo') +
      campoDoble('Primer párrafo', 'familia.parrafos.0', { area: true }) +
      campoDoble('Segundo párrafo', 'familia.parrafos.1', { area: true }) +
      campoDoble('Texto del botón', 'familia.boton') +
      campoDoble('Pie de la foto', 'familia.pieFoto') +
    '</div>';
  }

  /* ---------- DISCIPLINAS ---------- */
  function pintarDisciplinas() {
    var colores = ['ballet', 'expresion', 'urban', 'arabe'];

    var items = (D.disciplinas || []).map(function (d, i) {
      var opc = colores.map(function (c) {
        return '<option value="' + c + '"' + (d.color === c ? ' selected' : '') + '>' + c + '</option>';
      }).join('');

      return '<div class="item">' +
        '<div class="item__cabecera">' +
          '<span class="item__nombre">' + esc(par(d.nombre).es) + '</span>' +
          '<button class="boton boton--peq boton--riesgo" type="button" ' +
            'data-accion="borrar-disciplina" data-indice="' + i + '">Quitar</button>' +
        '</div>' +
        campoDoble('Nombre', 'disciplinas.' + i + '.nombre') +
        campoDoble('Descripción', 'disciplinas.' + i + '.descripcion', { area: true }) +
        campoDoble('Edades o nivel', 'disciplinas.' + i + '.nivel') +
        '<div class="campo">' +
          '<label for="col-' + i + '">Color</label>' +
          '<select id="col-' + i + '" data-ruta="disciplinas.' + i + '.color">' + opc + '</select>' +
          '<p class="campo__pista">Si el color es claro (como el de ballet), activá la opción de abajo.</p>' +
        '</div>' +
        interruptor('El fondo es claro: usar texto oscuro', 'disciplinas.' + i + '.textoOscuro') +
      '</div>';
    }).join('');

    return '<div class="bloque">' +
      '<h2 class="bloque__titulo">Las disciplinas</h2>' +
      '<p class="bloque__ayuda">El orden de acá es el orden en que aparecen en el sitio.</p>' +
      items +
      '<button class="boton boton--peq" type="button" data-accion="nueva-disciplina">+ Agregar disciplina</button>' +
    '</div>' +
    '<div class="bloque">' +
      '<h2 class="bloque__titulo">Aclaración al pie</h2>' +
      campoDoble('Texto', 'disciplinasNota', { area: true }) +
    '</div>';
  }

  /* ---------- GALERÍA ---------- */
  function pintarGaleria() {
    var fotos = (D.galeria || []).map(function (g, i) {
      return '<div class="foto">' +
        '<img src="' + esc(g.src) + '" alt="">' +
        '<div class="foto__pie">' +
          '<input type="text" data-ruta="galeria.' + i + '.alt" data-idioma="es" ' +
            'value="' + esc(par(g.alt).es) + '" placeholder="Qué se ve en la foto">' +
          '<button class="boton boton--peq boton--riesgo" type="button" ' +
            'data-accion="borrar-foto-galeria" data-indice="' + i + '">Quitar</button>' +
        '</div>' +
      '</div>';
    }).join('');

    return '<div class="bloque">' +
      '<h2 class="bloque__titulo">Fotos del sitio</h2>' +
      '<p class="bloque__ayuda">Describí cada foto en una línea: eso es lo que lee Google ' +
        'y lo que escucha alguien que no puede ver la imagen.</p>' +
      (fotos ? '<div class="fotos">' + fotos + '</div>' : '<p class="bloque__ayuda">No hay fotos todavía.</p>') +
      '<div class="soltar" data-subir="galeria" style="margin-top:1rem">' +
        'Tocá acá para elegir fotos, o arrastralas' +
        '<div class="barra" hidden><div class="barra__relleno"></div></div>' +
      '</div>' +
    '</div>' +
    '<div class="bloque">' +
      '<h2 class="bloque__titulo">Textos de la galería</h2>' +
      campoDoble('Frase destacada', 'galeriaLead') +
      campoDoble('Crédito al pie', 'galeriaNota') +
    '</div>';
  }

  /* ---------- SEDES ---------- */
  function pintarSedes() {
    return (D.sucursales || []).map(function (s, i) {
      var b = 'sucursales.' + i;
      return '<div class="bloque">' +
        '<h2 class="bloque__titulo">' + esc(s.nombre) + '</h2>' +
        campoTexto('Nombre de la sede', b + '.nombre') +
        campoTexto('Dirección', b + '.direccion') +
        campoDoble('Referencia (entre qué calles)', b + '.referencia') +
        campoDoble('Localidad', b + '.localidad') +
        campoTexto('Teléfono fijo', b + '.telefono', { pista2: '4725 6647' }) +
        campoTexto('Teléfono para el enlace', b + '.telefonoLink', { pista2: '+59847256647' }) +
        campoTexto('Celular', b + '.celular', { pista2: '092 025 250' }) +
        campoTexto('WhatsApp', b + '.whatsapp', {
          pista: '598 y el celular sin el 0, todo junto. Vacío = sin botón de WhatsApp.',
          pista2: '59892025250'
        }) +
        campoTexto('Coordenadas', b + '.coordenadas', {
          pista: 'En Google Maps: clic derecho sobre la puerta del estudio y copiá los números.',
          pista2: '-32.3206073,-58.0729974'
        }) +
      '</div>';
    }).join('');
  }

  /* ---------- REDES ---------- */
  function pintarRedes() {
    return '<div class="bloque">' +
      '<h2 class="bloque__titulo">Dónde encontrarnos</h2>' +
      campoTexto('Instagram: enlace', 'contacto.instagramUrl', { tipo: 'url' }) +
      campoTexto('Instagram: usuario', 'contacto.instagramUsuario') +
      campoTexto('Facebook: enlace', 'contacto.facebookUrl', { tipo: 'url' }) +
      campoTexto('Facebook: nombre', 'contacto.facebookUsuario') +
      campoTexto('Correo', 'contacto.email') +
    '</div>' +
    '<div class="bloque">' +
      '<h2 class="bloque__titulo">Textos de la sección</h2>' +
      campoDoble('Título', 'redes.titulo') +
      campoDoble('Frase destacada', 'redes.lead', { area: true }) +
    '</div>' +
    '<div class="bloque">' +
      '<h2 class="bloque__titulo">Formulario de contacto</h2>' +
      campoDoble('Título', 'formulario.tituloSeccion') +
      campoDoble('Texto', 'formulario.textoSeccion', { area: true }) +
    '</div>';
  }

  /* ---------------------------------------------------------
     Dibujar
     --------------------------------------------------------- */
  function pintarPestanas() {
    $('#pestanas').innerHTML = SECCIONES.map(function (s) {
      return '<button type="button" class="pestana' + (s.id === seccionActual ? ' activa' : '') +
        '" data-seccion="' + s.id + '">' + s.nombre + '</button>';
    }).join('');
  }

  function pintar() {
    pintarPestanas();
    var s = SECCIONES.filter(function (x) { return x.id === seccionActual; })[0];
    $('#panel').innerHTML = s.pinta();
  }

  /* ---------------------------------------------------------
     Escuchar los cambios
     --------------------------------------------------------- */
  document.addEventListener('input', function (ev) {
    var el = ev.target;
    var ruta = el.dataset.ruta;
    if (!ruta) return;

    if (el.dataset.tipo === 'fecha') {
      var d = new Date(el.value);
      if (!isNaN(d.getTime())) {
        escribir(ruta + '.fechaHoraISO', aISOUruguay(d));
        escribir(ruta + '.anio', String(d.getFullYear()));
        escribir(ruta + '.fechaLegible', {
          es: textoFecha(d, 'es'), en: textoFecha(d, 'en')
        });
      }
    } else if (el.dataset.idioma) {
      var actual = par(leer(ruta));
      actual[el.dataset.idioma] = el.value;
      escribir(ruta, actual);
    } else {
      escribir(ruta, el.value);
    }
    guardarBorrador();
  });

  document.addEventListener('change', function (ev) {
    var el = ev.target;
    if (el.dataset.tipo === 'bool') {
      escribir(el.dataset.ruta, el.checked);
      guardarBorrador();
      return;
    }
    if (el.dataset.tipo === 'modo') {
      escribir(el.dataset.ruta, el.value);
      guardarBorrador();
      pintar();
      return;
    }
    if (el.tagName === 'SELECT' && el.dataset.ruta) {
      escribir(el.dataset.ruta, el.value);
      guardarBorrador();
    }
  });

  /* Fecha en hora de Uruguay (-03:00) */
  function aISOUruguay(d) {
    function dd(n) { return (n < 10 ? '0' : '') + n; }
    return d.getFullYear() + '-' + dd(d.getMonth() + 1) + '-' + dd(d.getDate()) +
      'T' + dd(d.getHours()) + ':' + dd(d.getMinutes()) + ':00-03:00';
  }

  function textoFecha(d, idioma) {
    try {
      var f = new Intl.DateTimeFormat(idioma === 'es' ? 'es-UY' : 'en-GB', {
        weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
      }).format(d);
      return f.charAt(0).toUpperCase() + f.slice(1);
    } catch (e) { return d.toLocaleDateString(); }
  }

  /* ---------------------------------------------------------
     Botones de agregar y quitar
     --------------------------------------------------------- */
  document.addEventListener('click', function (ev) {
    var pes = ev.target.closest('[data-seccion]');
    if (pes) { seccionActual = pes.dataset.seccion; pintar(); return; }

    var btn = ev.target.closest('[data-accion]');
    if (!btn) return;

    var a = ev.target.closest('[data-accion]').dataset;
    var i = parseInt(a.indice, 10);
    var e = parseInt(a.evento, 10);

    switch (a.accion) {
      case 'nuevo-evento':
        D.listaEventos = D.listaEventos || [];
        D.listaEventos.push(eventoVacio());
        break;
      case 'borrar-evento':
        if (!confirm('¿Borrar este evento? No se puede deshacer.')) return;
        D.listaEventos.splice(i, 1);
        break;
      case 'nueva-funcion':
        D.listaEventos[e].funciones = D.listaEventos[e].funciones || [];
        D.listaEventos[e].funciones.push({ hora: '', nombre: { es: '', en: '' } });
        break;
      case 'borrar-funcion':
        D.listaEventos[e].funciones.splice(i, 1);
        break;
      case 'nuevo-video':
        D.listaEventos[e].videos = D.listaEventos[e].videos || [];
        D.listaEventos[e].videos.push({ url: '', titulo: { es: '', en: '' } });
        break;
      case 'borrar-video':
        D.listaEventos[e].videos.splice(i, 1);
        break;
      case 'borrar-foto-evento':
        D.listaEventos[e].imagenes.splice(i, 1);
        break;
      case 'borrar-foto-galeria':
        D.galeria.splice(i, 1);
        break;
      case 'nueva-cifra':
        D.instituto.cifras.push({ valor: { es: '', en: '' }, etiqueta: { es: '', en: '' } });
        break;
      case 'borrar-cifra':
        D.instituto.cifras.splice(i, 1);
        break;
      case 'borrar-pilar':
        D.sobre.pilares.splice(i, 1);
        break;
      case 'nueva-disciplina':
        D.disciplinas.push({
          nombre: { es: 'Nueva disciplina', en: '' }, color: 'urban',
          descripcion: { es: '', en: '' }, nivel: { es: '', en: '' }
        });
        break;
      case 'borrar-disciplina':
        if (!confirm('¿Quitar esta disciplina?')) return;
        D.disciplinas.splice(i, 1);
        break;
      default: return;
    }
    guardarBorrador();
    pintar();
  });

  function eventoVacio() {
    return {
      id: 'evento-' + Date.now(),
      titulo: 'Nuevo evento',
      subtitulo: { es: '', en: '' },
      modo: 'contador',
      fechaHoraISO: '',
      fechaLegible: { es: '', en: '' },
      anio: String(new Date().getFullYear()),
      funciones: [],
      lugar: '', ciudad: '', direccion: '', coordenadas: '',
      descripcion: [{ es: '', en: '' }],
      imagenes: [], videos: [],
      entradas: { modo: 'consultar', url: '', precio: '', nota: { es: '', en: '' } }
    };
  }

  /* ---------------------------------------------------------
     Subir fotos: se achican acá mismo antes de mandarlas
     --------------------------------------------------------- */
  document.addEventListener('click', function (ev) {
    var zona = ev.target.closest('[data-subir]');
    if (!zona) return;
    var entrada = document.createElement('input');
    entrada.type = 'file';
    entrada.accept = 'image/*';
    entrada.multiple = true;
    entrada.addEventListener('change', function () {
      manejarArchivos(entrada.files, zona);
    });
    entrada.click();
  });

  ['dragover', 'dragleave', 'drop'].forEach(function (tipo) {
    document.addEventListener(tipo, function (ev) {
      var zona = ev.target.closest('[data-subir]');
      if (!zona) return;
      ev.preventDefault();
      zona.classList.toggle('encima', tipo === 'dragover');
      if (tipo === 'drop') manejarArchivos(ev.dataTransfer.files, zona);
    });
  });

  function achicar(archivo, maxAncho) {
    return new Promise(function (listo, falla) {
      var lector = new FileReader();
      lector.onload = function () {
        var img = new Image();
        img.onload = function () {
          var escala = Math.min(1, maxAncho / img.width);
          var lienzo = document.createElement('canvas');
          lienzo.width = Math.round(img.width * escala);
          lienzo.height = Math.round(img.height * escala);
          var ctx = lienzo.getContext('2d');
          ctx.drawImage(img, 0, 0, lienzo.width, lienzo.height);
          listo(lienzo.toDataURL('image/jpeg', 0.8).split(',')[1]);
        };
        img.onerror = function () { falla(new Error('No se pudo leer la imagen')); };
        img.src = lector.result;
      };
      lector.onerror = function () { falla(new Error('No se pudo abrir el archivo')); };
      lector.readAsDataURL(archivo);
    });
  }

  async function manejarArchivos(archivos, zona) {
    if (!archivos || !archivos.length) return;
    var token = obtenerToken();
    if (!token) { pedirToken(function () { manejarArchivos(archivos, zona); }); return; }

    var barra = zona.querySelector('.barra');
    var relleno = zona.querySelector('.barra__relleno');
    barra.hidden = false;

    var carpeta = zona.dataset.subir === 'galeria' ? CARPETA_GALERIA : CARPETA_EVENTOS;
    var idEvento = parseInt(zona.dataset.evento, 10);

    for (var i = 0; i < archivos.length; i++) {
      var archivo = archivos[i];
      if (!/^image\//.test(archivo.type)) continue;
      avisar('Subiendo ' + (i + 1) + ' de ' + archivos.length + '…', 'trabajando');
      try {
        var base64 = await achicar(archivo, 1400);
        var nombre = Date.now() + '-' + i + '.jpg';
        var ruta = carpeta + '/' + nombre;
        await ghPut(ruta, base64, 'Subir foto ' + nombre, token);

        var entrada = { src: ruta, alt: { es: '', en: '' } };
        if (zona.dataset.subir === 'galeria') {
          D.galeria.push(Object.assign({ alto: 'medio' }, entrada));
        } else {
          D.listaEventos[idEvento].imagenes = D.listaEventos[idEvento].imagenes || [];
          D.listaEventos[idEvento].imagenes.push(entrada);
        }
        relleno.style.width = Math.round(((i + 1) / archivos.length) * 100) + '%';
      } catch (err) {
        avisar('No se pudo subir: ' + err.message, 'error');
        barra.hidden = true;
        return;
      }
    }

    guardarBorrador();
    avisar('Fotos subidas. Falta publicar para que se vean en el sitio.', 'ok');
    pintar();
  }

  /* ---------------------------------------------------------
     GitHub
     --------------------------------------------------------- */
  function obtenerToken() {
    try { return localStorage.getItem(LLAVE_TOKEN) || ''; } catch (e) { return ''; }
  }

  var alGuardarToken = null;
  function pedirToken(despues) {
    alGuardarToken = despues || null;
    $('#modal-token').hidden = false;
    $('#campo-token').focus();
  }

  $('#btn-cancelar-token').addEventListener('click', function () {
    $('#modal-token').hidden = true;
    alGuardarToken = null;
  });

  $('#btn-guardar-token').addEventListener('click', function () {
    var t = $('#campo-token').value.trim();
    if (!t) return;
    try { localStorage.setItem(LLAVE_TOKEN, t); } catch (e) {}
    $('#modal-token').hidden = true;
    $('#campo-token').value = '';
    var seguir = alGuardarToken; alGuardarToken = null;
    if (seguir) seguir(); else publicar();
  });

  function cabeceras(token) {
    return {
      'Authorization': 'Bearer ' + token,
      'Accept': 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28'
    };
  }

  async function ghGet(ruta, token) {
    var r = await fetch('https://api.github.com/repos/' + REPO + '/contents/' + ruta + '?ref=' + RAMA,
      { headers: cabeceras(token) });
    if (r.status === 404) return null;
    if (!r.ok) throw new Error(await mensajeError(r));
    return r.json();
  }

  async function ghPut(ruta, contenidoBase64, mensaje, token) {
    var actual = await ghGet(ruta, token);
    var cuerpo = { message: mensaje, content: contenidoBase64, branch: RAMA };
    if (actual && actual.sha) cuerpo.sha = actual.sha;

    var r = await fetch('https://api.github.com/repos/' + REPO + '/contents/' + ruta, {
      method: 'PUT', headers: cabeceras(token), body: JSON.stringify(cuerpo)
    });
    if (!r.ok) throw new Error(await mensajeError(r));
    return r.json();
  }

  async function mensajeError(r) {
    var txt = '';
    try { var j = await r.json(); txt = j.message || ''; } catch (e) {}
    if (r.status === 401) return 'la clave de GitHub no es válida o venció';
    if (r.status === 403) return 'la clave no tiene permiso para escribir en el sitio';
    if (r.status === 404) return 'no se encontró el repositorio (revisá los permisos de la clave)';
    if (r.status === 409) return 'alguien más cambió el archivo: recargá el panel y probá de nuevo';
    return txt || ('error ' + r.status);
  }

  function aBase64(texto) {
    var bytes = new TextEncoder().encode(texto);
    var bin = '';
    bytes.forEach(function (b) { bin += String.fromCharCode(b); });
    return btoa(bin);
  }

  /* ---------------------------------------------------------
     Generar el archivo
     --------------------------------------------------------- */
  function generarArchivo() {
    var cabecera =
      '/* =============================================================\n' +
      '   ESTUDIO DE DANZAS KAREN PINTOS — datos del sitio\n' +
      '   -------------------------------------------------------------\n' +
      '   Este archivo lo escribe el PANEL (panel.html).\n' +
      '   Se puede editar a mano, pero los comentarios que agregues\n' +
      '   se van a perder la próxima vez que se publique desde el panel.\n' +
      '\n' +
      '   Última actualización: ' + new Date().toLocaleString('es-UY') + '\n' +
      '   ============================================================= */\n\n';
    return cabecera + 'window.SITE_DATA = ' + JSON.stringify(D, null, 2) + ';\n';
  }

  /* ---------------------------------------------------------
     Publicar y descargar
     --------------------------------------------------------- */
  async function publicar() {
    var token = obtenerToken();
    if (!token) { pedirToken(); return; }

    var btn = $('#btn-publicar');
    btn.disabled = true;
    avisar('Publicando…', 'trabajando');

    try {
      await ghPut(ARCHIVO, aBase64(generarArchivo()),
        'Actualizar el contenido del sitio desde el panel', token);
      quitarBorrador();
      avisar('Publicado. En un minuto se ve en el sitio.', 'ok');
    } catch (err) {
      avisar('No se pudo publicar: ' + err.message, 'error');
      if (/clave/.test(err.message)) {
        try { localStorage.removeItem(LLAVE_TOKEN); } catch (e) {}
      }
    }
    btn.disabled = false;
  }

  $('#btn-publicar').addEventListener('click', publicar);

  $('#btn-descargar').addEventListener('click', function () {
    var blob = new Blob([generarArchivo()], { type: 'text/javascript;charset=utf-8' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'siteData.js';
    a.click();
    URL.revokeObjectURL(a.href);
    avisar('Archivo descargado. Subilo a GitHub en assets/js/', 'ok');
  });

  $('#btn-descartar').addEventListener('click', function () {
    if (!confirm('¿Descartar los cambios sin publicar?')) return;
    quitarBorrador();
    location.reload();
  });

  /* ---------------------------------------------------------
     Arranque
     --------------------------------------------------------- */
  try {
    var guardado = localStorage.getItem(LLAVE_BORRADOR);
    if (guardado) {
      D = JSON.parse(guardado);
      hayBorrador = true;
      $('#aviso-borrador').hidden = false;
    }
  } catch (e) { /* si el borrador está roto, se usa lo publicado */ }

  pintar();
  avisar('');
})();
