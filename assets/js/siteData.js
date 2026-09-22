/* =============================================================
   ESTUDIO DE DANZAS KAREN PINTOS
   -------------------------------------------------------------
   ARCHIVO DE CONFIGURACIÓN / DATOS
   Este es el ÚNICO archivo que necesitás tocar para cambiar
   textos, teléfonos, fechas, fotos, disciplinas y enlaces.
   ============================================================= */

window.SITE_DATA = {

  /* ---------------------------------------------------------
     1. ESTUDIO
     --------------------------------------------------------- */
  estudio: {
    nombre: 'Estudio de Danzas Karen Pintos',
    nombreCorto: 'Karen Pintos',
    logoLinea1: 'ESTUDIO DE DANZAS',
    logoLinea2: 'KAREN PINTOS',
    ciudad: 'Paysandú',
    pais: 'Uruguay',
    anio: 2026
  },

  /* ---------------------------------------------------------
     2. CONTACTO
     --------------------------------------------------------- */
  contacto: {
    telefono: '4725 6647',
    telefonoLink: '+59847256647',

    // WHATSAPP -> dejalo vacío ('') si no lo querés mostrar.
    // Para activarlo escribí el número en formato internacional
    // SIN el signo +, por ejemplo: '59899123456'
    whatsapp: '',

    direccion: 'Dr. José Verocay 815',
    codigoPostal: '60000',
    localidad: 'Paysandú',
    pais: 'Uruguay',

    // Email del estudio. Si lo dejás vacío, no se muestra.
    email: '',

    instagramUsuario: '@estudio_de_danza_karenpintos',
    instagramUrl: 'https://www.instagram.com/estudio_de_danza_karenpintos/',

    // Dirección que se usa para Google Maps (mapa + "cómo llegar")
    mapsBusqueda: 'Dr. José Verocay 815, 60000 Paysandú, Uruguay'
  },

  /* ---------------------------------------------------------
     3. EVENTO PRINCIPAL  ( GISELLE )
     Cambiá acá todo lo referido a la presentación.
     --------------------------------------------------------- */
  evento: {
    titulo: 'Giselle',
    subtitulo: 'Una historia de amor,<br>engaño y muerte',
    subtituloPlano: 'Una historia de amor, engaño y muerte',
    etiqueta: 'Próxima presentación',

    // FOTO de portada (hero). Vacía = sólo la atmósfera de luces.
    // Ej: 'assets/img/hero.jpg'  (horizontal, mínimo 1920px de ancho)
    imagenHero: '',

    diaSemana: 'Viernes',
    fechaCorta: '16 de Octubre · 2026',
    fechaLarga: '16 Octubre 2026',
    fechaISO: '2026-10-16',

    funciones: [
      { hora: '17:00', nombre: 'Primera función' },
      { hora: '20:30', nombre: 'Segunda función' }
    ],

    teatro: 'Teatro Florencio Sánchez',
    teatroCiudad: 'Paysandú',

    descripcion: [
      'Giselle es una presentación de ballet del Estudio de Danzas Karen Pintos, llevada al escenario por sus alumnas y bailarinas.',
      'Una historia de amor, engaño y muerte contada a través del movimiento: el resultado de un año de entrenamiento, ensayos y trabajo colectivo.'
    ],

    /* ENTRADAS
       Cuando tengas el link real de venta de entradas, pegalo acá.
       Mientras esté vacío, los botones llevan a la sección de contacto
       para consultar por entradas (no se inventa ningún sistema de venta). */
    entradasUrl: '',
    entradasTextoActivo: 'Comprar entradas',
    entradasTextoInactivo: 'Consultar entradas'
  },

  /* ---------------------------------------------------------
     4. PRÓXIMAS PRESENTACIONES
     Agregá / quitá objetos de esta lista libremente.
     estado: 'confirmado' | 'en-preparacion' | 'proximamente'
     --------------------------------------------------------- */
  presentaciones: [
    {
      titulo: 'Giselle',
      fecha: 'Viernes 16 de Octubre 2026',
      lugar: 'Teatro Florencio Sánchez · Paysandú',
      detalle: 'Funciones 17:00 y 20:30',
      estado: 'confirmado'
    }
    // Ejemplo para agregar más adelante:
    // {
    //   titulo: 'Nombre de la presentación',
    //   fecha: 'Fecha a confirmar',
    //   lugar: 'Lugar a confirmar',
    //   detalle: '',
    //   estado: 'proximamente'
    // }
  ],

  /* ---------------------------------------------------------
     5. SOBRE EL ESTUDIO
     Textos generales, fáciles de reemplazar por los definitivos.
     --------------------------------------------------------- */
  sobre: {
    titulo: 'Sobre nosotros',
    lead: 'Un espacio dedicado a la formación y a la expresión artística a través de la danza.',

    // FOTO del estudio. Dejala vacía o poné la ruta, ej: 'assets/img/estudio.jpg'
    imagen: '',
    parrafos: [
      'El Estudio de Danzas Karen Pintos es un espacio de formación en danza en Paysandú, donde el trabajo técnico y la expresión artística conviven en cada clase.',
      'La sala es el lugar donde se construye: disciplina, constancia y detalle. El escenario es donde todo eso se transforma en emoción compartida.'
    ],
    pilares: [
      { titulo: 'Formación', texto: 'Trabajo técnico progresivo, respetando el tiempo y el cuerpo de cada alumna.' },
      { titulo: 'Disciplina', texto: 'Constancia, detalle y rigor como base de todo aprendizaje artístico.' },
      { titulo: 'Expresión', texto: 'La técnica al servicio de la interpretación y de la sensibilidad propia.' },
      { titulo: 'Escenario', texto: 'Presentaciones que reúnen el trabajo de todo el año frente al público.' }
    ]
  },

  /* ---------------------------------------------------------
     6. DISCIPLINAS / CLASES
     No hay disciplinas inventadas: completá esta lista con las
     que realmente dicta el estudio.
       nombre      -> título de la tarjeta
       descripcion -> texto breve
       nivel       -> edades / niveles (dejar '' si no aplica)
       imagen      -> ruta a la foto, ej: 'assets/img/disciplinas/ballet.jpg'
                      (si el archivo no existe, se muestra un fondo decorativo)
     --------------------------------------------------------- */
  disciplinas: [
    {
      nombre: 'Ballet',
      descripcion: 'Completar con la descripción de la disciplina.',
      nivel: 'Niveles y edades a confirmar',
      imagen: ''
    },
    {
      nombre: 'Danza',
      descripcion: 'Completar con la descripción de la disciplina.',
      nivel: 'Niveles y edades a confirmar',
      imagen: ''
    },
    {
      nombre: 'Disciplina 3',
      descripcion: 'Completar con la descripción de la disciplina.',
      nivel: 'Niveles y edades a confirmar',
      imagen: ''
    },
    {
      nombre: 'Disciplina 4',
      descripcion: 'Completar con la descripción de la disciplina.',
      nivel: 'Niveles y edades a confirmar',
      imagen: ''
    }
  ],
  disciplinasNota: 'Listado en construcción. Escribinos para conocer las disciplinas, horarios y niveles disponibles.',

  /* ---------------------------------------------------------
     7. GALERÍA
     Colocá las fotos reales en  assets/img/galeria/
     y actualizá "src" y "alt". Mientras el archivo no exista,
     se muestra un marco decorativo indicando el espacio.
       alto: 'alto' | 'medio' | 'bajo'  -> altura de la pieza
     --------------------------------------------------------- */
  galeria: [
    { src: '', /* -> assets/img/galeria/01.jpg */ alt: 'Ensayo en sala del Estudio de Danzas Karen Pintos', alto: 'alto' },
    { src: '', /* -> assets/img/galeria/02.jpg */ alt: 'Bailarina en puntas durante la clase', alto: 'medio' },
    { src: '', /* -> assets/img/galeria/03.jpg */ alt: 'Presentación sobre el escenario', alto: 'bajo' },
    { src: '', /* -> assets/img/galeria/04.jpg */ alt: 'Detalle de zapatillas de punta', alto: 'medio' },
    { src: '', /* -> assets/img/galeria/05.jpg */ alt: 'Grupo de alumnas trabajando en la barra', alto: 'alto' },
    { src: '', /* -> assets/img/galeria/06.jpg */ alt: 'Escena del ballet Giselle', alto: 'bajo' },
    { src: '', /* -> assets/img/galeria/07.jpg */ alt: 'Bailarina entrando al escenario', alto: 'medio' },
    { src: '', /* -> assets/img/galeria/08.jpg */ alt: 'Saludo final de la función', alto: 'alto' }
  ],

  /* ---------------------------------------------------------
     8. FORMULARIO DE CONTACTO
     El formulario NO envía mensajes hasta que pegues acá la URL
     de un servicio (Formspree, Getform, Basin, Netlify Forms...).
     Ejemplo: 'https://formspree.io/f/xxxxxxx'
     --------------------------------------------------------- */
  formulario: {
    endpoint: '',
    tituloSeccion: '¿Querés ser parte?',
    textoSeccion: 'Escribinos para consultar por clases, disciplinas, horarios o entradas para Giselle.'
  },

  /* ---------------------------------------------------------
     9. NAVEGACIÓN
     --------------------------------------------------------- */
  navegacion: [
    { etiqueta: 'Inicio',      href: '#inicio' },
    { etiqueta: 'Giselle',     href: '#giselle' },
    { etiqueta: 'El estudio',  href: '#estudio' },
    { etiqueta: 'Disciplinas', href: '#disciplinas' },
    { etiqueta: 'Galería',     href: '#galeria' },
    { etiqueta: 'Contacto',    href: '#contacto' }
  ]
};
