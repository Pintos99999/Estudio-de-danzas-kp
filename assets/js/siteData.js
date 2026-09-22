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
     2. CONTACTO GENERAL
     --------------------------------------------------------- */
  contacto: {
    email: 'institutokarenpintos@gmail.com',
    instagramUsuario: '@estudio_de_danza_karenpintos',
    instagramUrl: 'https://www.instagram.com/estudio_de_danza_karenpintos/'
  },

  /* ---------------------------------------------------------
     3. SUCURSALES
     Para agregar otra sede, copiá un bloque y completalo.

       whatsapp -> número internacional SIN el "+" ni espacios.
                   Uruguay: 598 + celular sin el 0.
                   Ej: 092 025 250  ->  '59892025250'
                   Dejalo en '' si esa sede no tiene WhatsApp.
     --------------------------------------------------------- */
  sucursales: [
    {
      id: 'paysandu',
      nombre: 'Paysandú',
      direccion: 'Dr. José Verocay 815',
      referencia: 'entre Ituzaingó y Sarandí',
      localidad: 'Paysandú',
      codigoPostal: '60000',

      telefono: '4725 6647',
      telefonoLink: '+59847256647',
      celular: '092 025 250',
      whatsapp: '59892025250',

      mapsBusqueda: 'Dr. José Verocay 815, 60000 Paysandú, Uruguay'
    },
    {
      id: 'young',
      nombre: 'Young',
      direccion: '25 de Agosto esquina Carlos Fischer',
      referencia: '',
      localidad: 'Young, Río Negro',
      codigoPostal: '',

      telefono: '',
      telefonoLink: '',
      celular: '099 655 632',
      whatsapp: '59899655632',

      mapsBusqueda: '25 de Agosto esquina Carlos Fischer, Young, Río Negro, Uruguay'
    }
  ],

  /* ---------------------------------------------------------
     4. EVENTO PRINCIPAL  ( GISELLE )
     --------------------------------------------------------- */
  evento: {
    titulo: 'Giselle',
    subtitulo: 'Una historia de amor,<br>engaño y muerte',
    subtituloPlano: 'Una historia de amor, engaño y muerte',
    etiqueta: 'Próxima presentación',

    // Imagen de fondo del hero ('' = sólo la atmósfera de luces)
    imagenHero: 'assets/img/hero.jpg',

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
       Las entradas se venden en las dos sedes (así figura en la gráfica
       oficial). Si más adelante hay venta online, pegá el link acá. */
    entradasUrl: '',
    entradasTextoActivo: 'Comprar entradas',
    entradasTextoInactivo: 'Consultar entradas',
    entradasNota: 'Entradas en venta en las dos sedes del estudio: Paysandú y Young.'
  },

  /* ---------------------------------------------------------
     5. PRÓXIMAS PRESENTACIONES
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
     6. SOBRE EL ESTUDIO
     --------------------------------------------------------- */
  sobre: {
    titulo: 'Sobre nosotros',
    lead: 'Un espacio dedicado a la formación y a la expresión artística a través de la danza.',

    // Imagen del bloque ('' = marco decorativo)
    imagen: 'assets/img/estudio.jpg',
    imagenAlt: 'Giselle con el velo, de la campaña visual de la presentación',

    parrafos: [
      'El Estudio de Danzas Karen Pintos es un espacio de formación en danza con sedes en Paysandú y Young, donde el trabajo técnico y la expresión artística conviven en cada clase.',
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
     7. DISCIPLINAS / CLASES
     Completá esta lista con las que realmente dicta el estudio.
       imagen -> ruta a la foto ('' = fondo decorativo)
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
  disciplinasNota: 'Listado en construcción. Escribinos para conocer las disciplinas, horarios y niveles disponibles en cada sede.',

  /* ---------------------------------------------------------
     8. GALERÍA
     Hoy muestra la campaña visual de Giselle.
     Para poner fotos reales del estudio, reemplazá los archivos de
     assets/img/galeria/ y actualizá el "alt" de cada una.
       alto: 'alto' | 'medio' | 'bajo'
     --------------------------------------------------------- */
  galeria: [
    { src: 'assets/img/galeria/01.jpg', alt: 'Giselle con el velo, iluminada a contraluz', alto: 'alto' },
    { src: 'assets/img/galeria/02.jpg', alt: 'El corps de ballet formando un círculo entre la niebla', alto: 'medio' },
    { src: 'assets/img/galeria/03.jpg', alt: 'Bailarina de perfil bajo una luz lavanda', alto: 'medio' },
    { src: 'assets/img/galeria/04.jpg', alt: 'Afiche de Giselle con siluetas suspendidas en la bruma', alto: 'alto' },
    { src: 'assets/img/galeria/05.jpg', alt: 'Bailarina avanzando hacia la luz del escenario', alto: 'medio' },
    { src: 'assets/img/galeria/06.jpg', alt: 'Las willis en ronda, versión vertical de la campaña', alto: 'alto' },
    { src: 'assets/img/galeria/07.jpg', alt: 'Segundo afiche de la presentación de Giselle', alto: 'medio' },
    { src: 'assets/img/galeria/08.jpg', alt: 'Tipografía de Giselle sobre un degradado rosa y violeta', alto: 'bajo' },
    { src: 'assets/img/galeria/09.jpg', alt: 'Bailarina a lo lejos sobre el escenario en penumbra', alto: 'alto' },
    { src: 'assets/img/galeria/10.jpg', alt: 'Placa tipográfica de Giselle sobre fondo crema', alto: 'bajo' },
    { src: 'assets/img/galeria/11.jpg', alt: 'Puntos de venta de entradas en Paysandú y Young', alto: 'bajo' }
  ],
  galeriaNota: 'Estas son las piezas de la campaña de Giselle. Cuando tengas fotos de las clases y las presentaciones, reemplazá los archivos de assets/img/galeria/.',

  /* ---------------------------------------------------------
     9. FORMULARIO DE CONTACTO
     Los mensajes llegan por email usando FormSubmit (sin backend).
       endpoint -> '' desactiva el envío (el formulario lo avisa)
     Para cambiar la casilla que recibe, cambiá el email del final.
     --------------------------------------------------------- */
  formulario: {
    endpoint: 'https://formsubmit.co/ajax/institutokarenpintos@gmail.com',
    asunto: 'Consulta desde la web — Estudio de Danzas Karen Pintos',
    tituloSeccion: '¿Querés ser parte?',
    textoSeccion: 'Escribinos para consultar por clases, disciplinas, horarios o entradas para Giselle.'
  },

  /* ---------------------------------------------------------
     10. NAVEGACIÓN
     --------------------------------------------------------- */
  navegacion: [
    { etiqueta: 'Inicio',      href: '#inicio' },
    { etiqueta: 'Giselle',     href: '#giselle' },
    { etiqueta: 'El estudio',  href: '#estudio' },
    { etiqueta: 'Disciplinas', href: '#disciplinas' },
    { etiqueta: 'Galería',     href: '#galeria' },
    { etiqueta: 'Sedes',       href: '#ubicacion' },
    { etiqueta: 'Contacto',    href: '#contacto' }
  ]
};
