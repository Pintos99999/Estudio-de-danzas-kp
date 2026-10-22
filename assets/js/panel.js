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
  /* Dibujitos del menú. Son SVG escritos acá nomás para no depender
     de ninguna librería ni de internet. */
  var ICONOS = {
    inicio:   '<path d="M3 10.5 12 3l9 7.5V21H3z"/><path d="M9 21v-7h6v7"/>',
    avisos:   '<path d="M3 11v2a1 1 0 0 0 1 1h3l5 4V6L7 10H4a1 1 0 0 0-1 1Z"/><path d="M16 9a4 4 0 0 1 0 6"/>',
    eventos:  '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 11h18"/>',
    entradas: '<path d="M3 9a2 2 0 0 0 0 6v2a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-2a2 2 0 0 1 0-6V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2Z"/><path d="M14 5v14"/>',
    fotos:    '<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="8.5" cy="10" r="1.5"/><path d="m21 16-5-5L5 19"/>',
    pagina:   '<path d="M5 3h9l5 5v13H5z"/><path d="M14 3v5h5"/><path d="M9 13h6M9 17h6"/>',
    sedes:    '<path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z"/><circle cx="12" cy="10" r="2.5"/>',
    asistente:'<path d="m12 3 1.9 4.8L19 9.5l-4.3 2.9L15.5 18 12 15.3 8.5 18l.8-5.6L5 9.5l5.1-1.7Z"/>'
  };

  function icono(nombre) {
    return '<svg class="pestana__icono" viewBox="0 0 24 24" fill="none" aria-hidden="true" ' +
      'stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' +
      (ICONOS[nombre] || '') + '</svg>';
  }

  var SECCIONES = [
    { id: 'inicio',    icono: 'inicio',    nombre: 'Inicio',             pinta: pintarInicio },
    { id: 'avisos',    icono: 'avisos',    nombre: 'Avisos',             pinta: pintarAvisos },
    { id: 'eventos',   icono: 'eventos',   nombre: 'Eventos y funciones', pinta: pintarEventos },
    { id: 'galeria',   icono: 'fotos',     nombre: 'Fotos del estudio',  pinta: pintarGaleria },
    { id: 'pagina',    icono: 'pagina',    nombre: 'Textos de la página', pinta: pintarPagina },
    { id: 'sedes',     icono: 'sedes',     nombre: 'Sedes y contacto',   pinta: pintarSedesYRedes },
    { id: 'asistente', icono: 'asistente', nombre: 'Asistente',          pinta: pintarAsistente }
  ];

  var seccionActual = 'inicio';

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

      '<h3 class="bloque__titulo" data-ancla="funciones" style="font-size:.95rem;margin-top:1.6rem">Horarios de las funciones</h3>' +
      '<p class="bloque__ayuda">Agregá uno por cada función del día.</p>' +
      funciones +
      '<button class="boton boton--peq" type="button" data-accion="nueva-funcion" data-evento="' + i + '">+ Agregar horario</button>' +

      '<h3 class="bloque__titulo" data-ancla="entradas" style="font-size:.95rem;margin-top:1.6rem">Entradas</h3>' +
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

  /* ---------- INICIO (el tablero) ---------- */
  function pintarInicio() {
    var ev = proximoEvento();
    var avisos = avisosVigentes();
    var hayEventos = !!(D.eventos && D.eventos.activo);

    function ficha(titulo, valor, detalle, estado) {
      return '<div class="ficha' + (estado ? ' ficha--' + estado : '') + '">' +
        '<div class="ficha__t">' + esc(titulo) + '</div>' +
        '<div class="ficha__v">' + esc(valor) + '</div>' +
        (detalle ? '<div class="ficha__d">' + esc(detalle) + '</div>' : '') +
      '</div>';
    }

    function atajo(seccion, luego, clase, dibujo, titulo, detalle) {
      return '<button type="button" class="atajo' + (clase ? ' ' + clase : '') + '"' +
        ' data-atajo="' + seccion + '"' + (luego ? ' data-luego="' + luego + '"' : '') + '>' +
        '<span class="atajo__icono">' +
          '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" ' +
          'stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' +
          (ICONOS[dibujo] || '') + '</svg>' +
        '</span>' +
        '<span class="atajo__t">' + esc(titulo) + '</span>' +
        '<span class="atajo__d">' + esc(detalle) + '</span>' +
      '</button>';
    }

    return '' +
    '<h2 class="hola">Hola</h2>' +
    '<p>Elegí qué querés hacer. Nada se publica hasta que toques <strong>Publicar cambios</strong>.</p>' +

    '<div class="atajos">' +
      atajo('avisos', 'nuevo-aviso', '', 'avisos', 'Crear un aviso',
        'Para contar algo corto: que abrieron las inscripciones, que cambia un horario.') +
      atajo('eventos', 'nuevo-evento', '', 'eventos', 'Publicar un evento',
        'Una función o un espectáculo, con su cuenta regresiva.') +
      atajo('eventos', 'ir-funciones', '', 'entradas', 'Cargar una función',
        'Agregar un horario a un evento que ya existe.') +
      atajo('eventos', 'ir-entradas', 'atajo--oro', 'entradas', 'Gestionar entradas',
        'Decir dónde se consiguen, el precio y si hay venta online.') +
    '</div>' +

    '<div class="bloque">' +
      '<h2 class="bloque__titulo">Cómo está la página ahora</h2>' +
      '<p class="bloque__ayuda">Esto es lo que ve hoy quien entra al sitio.</p>' +
      '<div class="estados">' +
        ficha('Avisos a la vista', String(avisos.length),
          avisos.length ? 'Se están mostrando en la página' : 'La franja de avisos no aparece',
          avisos.length ? 'si' : 'no') +
        ficha('Sección de eventos', hayEventos ? 'Encendida' : 'Apagada',
          hayEventos ? 'El sitio habla de eventos' : 'El sitio no menciona ningún evento',
          hayEventos ? 'si' : 'no') +
        ficha('Próximo evento', ev ? (par(ev.titulo).es || 'Sin título') : 'Ninguno',
          ev ? (par(ev.fechaLegible).es || '') : 'No hay fechas futuras cargadas',
          ev ? 'si' : 'no') +
        ficha('Fotos en la galería', String((D.galeria || []).length),
          'Las que se ven en la página') +
      '</div>' +
    '</div>' +

    '<div class="bloque">' +
      '<h2 class="bloque__titulo">Guardar una copia</h2>' +
      '<p class="bloque__ayuda">' +
        'Si estás en una computadora prestada y preferís no guardar la clave, ' +
        'bajá el archivo y pasáselo a quien publique. También sirve de respaldo.' +
      '</p>' +
      '<button class="boton" type="button" id="btn-descargar">Descargar archivo</button>' +
    '</div>';
  }

  /* ---------- AVISOS ---------- */
  var TIPOS_AVISO = [
    { v: 'novedad',       t: 'Novedad',       d: 'Lo habitual. Se muestra en rosa.' },
    { v: 'inscripciones', t: 'Inscripciones', d: 'Para lo que urge. Se muestra en dorado.' },
    { v: 'importante',    t: 'Importante',    d: 'Cambios o suspensiones. Va mas marcado.' }
  ];

  function pintarAvisos() {
    var lista = D.listaAvisos || [];

    var h = '<div class="bloque">' +
      '<h2 class="bloque__titulo">La franja de avisos</h2>' +
      '<p class="bloque__ayuda">' +
        'Son los carteles cortos que aparecen cerca de arriba. ' +
        'Si apagás esto, o si no hay ninguno a la vista, la franja entera ' +
        'desaparece del sitio.' +
      '</p>' +
      interruptor('Mostrar los avisos en la página', 'avisos.activo') +
    '</div>';

    if (!lista.length) {
      return h + '<div class="bloque">' +
        '<div class="vacio">' +
          '<strong>Todavía no hay ningún aviso.</strong>' +
          'Cuando crees uno va a aparecer acá.' +
        '</div>' +
        '<div style="margin-top:1rem">' +
          '<button class="boton boton--fuerte" type="button" data-accion="nuevo-aviso">' +
            'Crear el primer aviso</button>' +
        '</div>' +
      '</div>';
    }

    lista.forEach(function (a, i) {
      var publicado = a.publicado !== false;
      var tipo = a.tipo || 'novedad';

      h += '<div class="bloque">' +
        '<div class="item__cabecera">' +
          '<h2 class="item__nombre">' +
            esc(par(a.titulo).es || 'Aviso sin título') +
            '<span class="marbete marbete--' + (publicado ? 'si' : 'no') + '">' +
              (publicado ? 'A la vista' : 'Guardado, no se ve') +
            '</span>' +
          '</h2>' +
          '<div class="item__acciones">' +
            '<button class="boton boton--peq" type="button" data-accion="alternar-aviso" ' +
              'data-indice="' + i + '">' + (publicado ? 'Ocultar' : 'Mostrar') + '</button>' +
            '<button class="boton boton--peq boton--riesgo" type="button" ' +
              'data-accion="borrar-aviso" data-indice="' + i + '">Eliminar</button>' +
          '</div>' +
        '</div>' +

        campoDoble('Título del aviso', 'listaAvisos.' + i + '.titulo',
          { pista: 'Corto y directo. Por ejemplo: "Abrieron las inscripciones".' }) +
        campoDoble('Texto', 'listaAvisos.' + i + '.texto',
          { area: true, pista: 'Con una o dos oraciones alcanza.' }) +

        '<div class="campo"><span class="campo__t">De qué tipo es</span><div class="modos">' +
          TIPOS_AVISO.map(function (t) {
            return '<label class="modo' + (tipo === t.v ? ' elegido' : '') + '">' +
              '<input type="radio" name="tipo-aviso-' + i + '" value="' + t.v + '" ' +
                'data-tipo="modo" data-ruta="listaAvisos.' + i + '.tipo"' +
                (tipo === t.v ? ' checked' : '') + '>' +
              '<span class="modo__t">' + t.t + '</span>' +
              '<span class="modo__d">' + t.d + '</span>' +
            '</label>';
          }).join('') +
        '</div></div>' +

        '<div class="doble">' +
          campoTexto('Empezar a mostrarlo', 'listaAvisos.' + i + '.desde',
            { tipo: 'date', pista: 'Dejalo vacío para que se vea desde ya.' }) +
          campoTexto('Dejar de mostrarlo', 'listaAvisos.' + i + '.hasta',
            { tipo: 'date', pista: 'Dejalo vacío y se ve hasta que vos lo saques.' }) +
        '</div>' +

        campoDoble('Texto del botón (si querés uno)', 'listaAvisos.' + i + '.enlace.texto') +
        campoTexto('A dónde lleva ese botón', 'listaAvisos.' + i + '.enlace.url',
          { pista: 'Escribí #contacto para llevar al formulario, o pegá una dirección completa.' }) +
      '</div>';
    });

    return h + '<button class="boton boton--fuerte" type="button" data-accion="nuevo-aviso">' +
      'Agregar otro aviso</button>';
  }

  function avisoVacio() {
    return {
      id: 'aviso-' + Date.now(),
      tipo: 'novedad',
      publicado: true,
      titulo: { es: '', en: '' },
      texto: { es: '', en: '' },
      desde: '',
      hasta: '',
      enlace: { texto: { es: '', en: '' }, url: '' }
    };
  }

  /* Los mismos criterios que usa el sitio, para que el tablero no mienta */
  function avisosVigentes() {
    if (!(D.avisos && D.avisos.activo)) return [];
    var hoy = new Date(); hoy.setHours(0, 0, 0, 0);

    return (D.listaAvisos || []).filter(function (a) {
      if (a.publicado === false) return false;
      if (!par(a.titulo).es) return false;
      if ((a.desde || '').trim() && new Date(a.desde + 'T00:00:00') > hoy) return false;
      if ((a.hasta || '').trim() && new Date(a.hasta + 'T23:59:59') < hoy) return false;
      return true;
    });
  }

  function proximoEvento() {
    return (D.listaEventos || [])
      .filter(function (e) { return new Date(e.fechaHoraISO) > new Date(); })
      .sort(function (a, b) { return new Date(a.fechaHoraISO) - new Date(b.fechaHoraISO); })[0] || null;
  }

  /* ---------- TEXTOS DE LA PÁGINA ---------- */
  function pintarPagina() {
    return pintarPortada() + pintarEstudio() + pintarDisciplinas();
  }

  /* ---------- SEDES Y CONTACTO ---------- */
  function pintarSedesYRedes() {
    return pintarSedes() + pintarRedes();
  }

  /* ---------- ASISTENTE ---------- */
  var IDEAS_IA = [
    { tarea: 'aviso',  t: 'Un aviso de que abrieron las inscripciones' },
    { tarea: 'evento', t: 'La descripción de nuestro próximo espectáculo' },
    { tarea: 'texto',  t: 'Mejorá el texto de quiénes somos' },
    { tarea: 'texto',  t: 'Una invitación corta para sumarse a las clases' }
  ];

  function pintarAsistente() {
    var cfg = D.ia || {};
    var listo = !!((cfg.url || '').trim());

    if (!listo) {
      return '<div class="bloque">' +
        '<h2 class="bloque__titulo">El asistente todavía no está instalado</h2>' +
        '<p class="bloque__ayuda">' +
          'Es un ayudante que escribe por vos: le pedís "un aviso de que abrieron ' +
          'las inscripciones" y te deja el texto listo, en español y en inglés.' +
        '</p>' +
        '<p class="bloque__ayuda">' +
          'Se instala una sola vez y es gratis. Los pasos están escritos en el ' +
          'archivo <strong>asistente/LEEME-ASISTENTE.md</strong>. Cuando termines, ' +
          'pegá acá abajo la dirección que te quedó.' +
        '</p>' +
        campoTexto('Dirección del asistente', 'ia.url', {
          tipo: 'url',
          pista2: 'https://...workers.dev',
          pista: 'Mientras esté vacía, el asistente no aparece en ningún lado y el sitio funciona igual.'
        }) +
      '</div>';
    }

    return '<div class="bloque">' +
      '<h2 class="bloque__titulo">Pedile que escriba</h2>' +
      '<p class="bloque__ayuda">' +
        'Te redacta el texto y te lo deja listo para copiar. ' +
        'No publica ni cambia nada por su cuenta: vos decidís qué usar.' +
      '</p>' +
      '<div class="ia-ideas">' +
        IDEAS_IA.map(function (x) {
          return '<button type="button" class="ia-idea" data-tarea="' + x.tarea + '">' +
            esc(x.t) + '</button>';
        }).join('') +
      '</div>' +
      '<div class="ia-hilo" id="ia-hilo"></div>' +
      '<form class="ia-form" id="ia-form">' +
        '<div class="campo" style="flex:1;margin:0">' +
          '<label for="ia-campo">Qué necesitás</label>' +
          '<textarea id="ia-campo" placeholder="Por ejemplo: un aviso de que ballet cambia a los martes"></textarea>' +
        '</div>' +
        '<button class="boton boton--fuerte" type="submit">Pedir</button>' +
      '</form>' +
    '</div>' +

    '<div class="bloque">' +
      '<h2 class="bloque__titulo">El chat del sitio</h2>' +
      '<p class="bloque__ayuda">' +
        'Si lo encendés, aparece una burbuja abajo a la izquierda donde las visitas ' +
        'pueden preguntar por las clases, las sedes y las funciones. Contesta sólo ' +
        'con lo que está cargado en este panel: no inventa precios ni horarios.' +
      '</p>' +
      interruptor('Mostrar el chat en el sitio', 'ia.activo') +
      campoTexto('Dirección del asistente', 'ia.url', { tipo: 'url' }) +
    '</div>';
  }

  /* ---------------------------------------------------------
     Dibujar
     --------------------------------------------------------- */
  function pintarPestanas() {
    $('#pestanas').innerHTML = SECCIONES.map(function (s) {
      return '<button type="button" class="pestana' + (s.id === seccionActual ? ' activa' : '') +
        '" data-seccion="' + s.id + '">' + icono(s.icono) +
        '<span>' + s.nombre + '</span></button>';
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

    /* Los botones grandes de Inicio: llevan a la sección y, si hace
       falta, dejan ya creada la cosa nueva para empezar a completar. */
    var at = ev.target.closest('[data-atajo]');
    if (at) {
      seccionActual = at.dataset.atajo;
      var luego = at.dataset.luego;

      if (luego === 'nuevo-aviso') {
        D.listaAvisos = D.listaAvisos || [];
        D.listaAvisos.push(avisoVacio());
        guardarBorrador();
      } else if (luego === 'nuevo-evento') {
        D.listaEventos = D.listaEventos || [];
        D.listaEventos.push(eventoVacio());
        if (D.eventos) D.eventos.activo = true;
        guardarBorrador();
      } else if (luego === 'ir-funciones' || luego === 'ir-entradas') {
        if (!(D.listaEventos || []).length) {
          avisar('Primero creá un evento: es el paso de antes.', 'trabajando');
        }
      }

      pintar();
      if (luego === 'ir-entradas' || luego === 'ir-funciones') {
        var ancla = document.querySelector(
          luego === 'ir-entradas' ? '[data-ancla="entradas"]' : '[data-ancla="funciones"]');
        if (ancla) ancla.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    var btn = ev.target.closest('[data-accion]');
    if (!btn) return;

    var a = ev.target.closest('[data-accion]').dataset;
    var i = parseInt(a.indice, 10);
    var e = parseInt(a.evento, 10);

    switch (a.accion) {
      case 'nuevo-aviso':
        D.listaAvisos = D.listaAvisos || [];
        D.listaAvisos.push(avisoVacio());
        avisar('Aviso creado. Completalo y después publicá.', 'ok');
        break;
      case 'borrar-aviso':
        if (!confirm('¿Eliminar este aviso?\n\nSi sólo querés que deje de verse en la página, usá "Ocultar" en vez de eliminarlo.')) return;
        D.listaAvisos.splice(i, 1);
        avisar('Aviso eliminado.', 'ok');
        break;
      case 'alternar-aviso':
        D.listaAvisos[i].publicado = (D.listaAvisos[i].publicado === false);
        avisar(D.listaAvisos[i].publicado
          ? 'Ahora se va a ver en la página (falta publicar).'
          : 'Ya no se va a ver en la página (falta publicar).', 'ok');
        break;
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

  /* Está dentro de Inicio, que se redibuja: por eso va delegado. */
  document.addEventListener('click', function (ev) {
    if (!ev.target.closest('#btn-descargar')) return;
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
     VISTA PREVIA
     -------------------------------------------------------------
     Guarda lo editado en una gaveta del navegador y abre el sitio
     real dentro de un marco, pidiéndole que lea de ahí. No se
     publica nada: es el mismo sitio leyendo datos de prueba.
     --------------------------------------------------------- */
  var LLAVE_PREVIA = 'kp-vista-previa';

  function abrirPrevia() {
    try {
      localStorage.setItem(LLAVE_PREVIA, JSON.stringify(D));
    } catch (e) {
      avisar('No hay lugar en este navegador para la vista previa.', 'error');
      return;
    }
    $('#previa-marco').src = 'index.html?previa=1&t=' + Date.now();
    $('#previa').hidden = false;
    document.body.style.overflow = 'hidden';
  }

  function cerrarPrevia() {
    $('#previa').hidden = true;
    $('#previa-marco').src = 'about:blank';
    document.body.style.overflow = '';
    try { localStorage.removeItem(LLAVE_PREVIA); } catch (e) {}
  }

  $('#btn-previa').addEventListener('click', abrirPrevia);
  $('#btn-cerrar-previa').addEventListener('click', cerrarPrevia);
  $('#btn-publicar-previa').addEventListener('click', function () {
    cerrarPrevia();
    publicar();
  });

  document.addEventListener('click', function (ev) {
    var b = ev.target.closest('[data-previa-ancho]');
    if (!b) return;
    var marco = $('#previa-marco');
    marco.style.width = b.dataset.previaAncho;
    marco.style.margin = b.dataset.previaAncho === '100%' ? '0' : '0 auto';
    marco.style.borderLeft = marco.style.borderRight =
      b.dataset.previaAncho === '100%' ? '0' : '1px solid var(--p-linea)';
  });

  /* ---------------------------------------------------------
     ASISTENTE DEL PANEL
     -------------------------------------------------------------
     Sólo redacta. Nunca escribe en los datos ni publica: deja el
     texto a la vista con un botón de "Copiar", y la persona decide.
     --------------------------------------------------------- */
  var LLAVE_IA = 'kp-panel-ia';
  var pidiendoIA = false;
  var alGuardarIA = null;

  function claveIA() {
    try { return localStorage.getItem(LLAVE_IA) || ''; } catch (e) { return ''; }
  }

  function pedirClaveIA(despues) {
    alGuardarIA = despues || null;
    $('#modal-ia').hidden = false;
    $('#campo-ia').focus();
  }

  $('#btn-cancelar-ia').addEventListener('click', function () {
    $('#modal-ia').hidden = true;
    alGuardarIA = null;
  });

  $('#btn-guardar-ia').addEventListener('click', function () {
    var c = $('#campo-ia').value.trim();
    if (!c) return;
    try { localStorage.setItem(LLAVE_IA, c); } catch (e) {}
    $('#modal-ia').hidden = true;
    $('#campo-ia').value = '';
    var seguir = alGuardarIA; alGuardarIA = null;
    if (seguir) seguir();
  });

  function burbujaIA(texto, quien, extra) {
    var hilo = $('#ia-hilo');
    if (!hilo) return null;
    var d = document.createElement('div');
    d.className = 'ia-msj ia-msj--' + quien + (extra ? ' ' + extra : '');
    d.textContent = texto;
    hilo.appendChild(d);
    hilo.scrollTop = hilo.scrollHeight;
    return d;
  }

  async function pedirAlAsistente(pedido, tarea) {
    if (pidiendoIA || !pedido.trim()) return;

    var url = ((D.ia && D.ia.url) || '').trim();
    if (!url) { avisar('Falta cargar la dirección del asistente.', 'error'); return; }

    var clave = claveIA();
    if (!clave) { pedirClaveIA(function () { pedirAlAsistente(pedido, tarea); }); return; }

    pidiendoIA = true;
    burbujaIA(pedido, 'yo');
    var pensando = burbujaIA('Pensando…', 'bot');

    try {
      var r = await fetch(url.replace(/\/$/, '') + '/redactar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Panel-Clave': clave },
        body: JSON.stringify({ pedido: pedido, tarea: tarea || 'texto' })
      });

      var j = await r.json().catch(function () { return {}; });

      if (r.status === 401) {
        try { localStorage.removeItem(LLAVE_IA); } catch (e) {}
        throw new Error('La contraseña del asistente no es correcta. Probá de nuevo.');
      }
      if (!r.ok || !j.respuesta) throw new Error(j.error || 'No pude obtener una respuesta.');

      pensando.textContent = j.respuesta;

      /* Un botón para copiarlo, nada más. Lo pega ella donde quiera. */
      var acciones = document.createElement('div');
      acciones.className = 'ia-msj__acciones';
      var copiar = document.createElement('button');
      copiar.type = 'button';
      copiar.className = 'boton boton--peq';
      copiar.textContent = 'Copiar el texto';
      copiar.addEventListener('click', function () {
        navigator.clipboard.writeText(j.respuesta).then(function () {
          copiar.textContent = 'Copiado';
          setTimeout(function () { copiar.textContent = 'Copiar el texto'; }, 1800);
        });
      });
      acciones.appendChild(copiar);
      pensando.appendChild(acciones);
    } catch (err) {
      pensando.classList.add('ia-msj--falla');
      pensando.textContent = err.message;
    }

    pidiendoIA = false;
    $('#ia-hilo').scrollTop = $('#ia-hilo').scrollHeight;
  }

  document.addEventListener('click', function (ev) {
    var idea = ev.target.closest('.ia-idea');
    if (!idea) return;
    pedirAlAsistente(idea.textContent, idea.dataset.tarea);
  });

  document.addEventListener('submit', function (ev) {
    if (!ev.target.matches('#ia-form')) return;
    ev.preventDefault();
    var campo = $('#ia-campo');
    var t = campo.value;
    campo.value = '';
    pedirAlAsistente(t, 'texto');
  });

  document.addEventListener('keydown', function (ev) {
    if (ev.key !== 'Escape') return;
    if (!$('#previa').hidden) cerrarPrevia();
    $('#modal-ia').hidden = true;
    $('#modal-token').hidden = true;
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
