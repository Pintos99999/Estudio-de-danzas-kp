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
     1.bis IDENTIDAD — lo primero que se ve al entrar
     Esta es la portada del sitio: habla del estudio, no de una obra.
     --------------------------------------------------------- */
  instituto: {
    eyebrow: 'Paysandú · Young · Uruguay',
    previo: 'Estudio de Danzas',
    titulo: 'Karen Pintos',
    lema: 'Donde la técnica se vuelve emoción.',
    bajada: 'Un espacio de formación en danza con dos sedes, donde cada alumna encuentra su tiempo, su cuerpo y su manera de decir las cosas sin palabras.',

    /* Frase grande que abre la sección del estudio */
    manifiesto: 'Enseñamos danza. Pero lo que de verdad se aprende acá es a sostener una idea con el cuerpo, a confiar en el grupo y a pararse frente a los demás.',

    /* Imagen de portada ('' = sólo la atmósfera de luces) */
    imagen: 'assets/img/hero.jpg',

    /* Tres datos cortos bajo la portada. Borrá los que no quieras. */
    cifras: [
      { valor: 'Dos sedes', etiqueta: 'Paysandú y Young' },
      { valor: 'Clases', etiqueta: 'por nivel y por edad' },
      { valor: 'Teatro', etiqueta: 'una presentación al año' }
    ]
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
     4. PRESENTACIONES
     -------------------------------------------------------------
     Cada obra que el estudio sube al escenario es UNA FILA de esta
     lista. No hay una sección dedicada a ninguna obra en particular.

     La web mira la fecha de cada una y sola decide qué mostrar:
       · la más próxima que todavía no pasó  -> va arriba, con la
         cuenta regresiva y el botón de entradas;
       · las que ya pasaron -> bajan a "Ya las presentamos".

     Así que el día después de una función NO hay que borrar nada:
     Giselle se acomoda sola entre las anteriores.

     Para anunciar la obra del año que viene, copiá un bloque, cambiá
     los datos y listo: pasa a ser la próxima.

       fechaHoraISO -> fecha y hora de la PRIMERA función,
                       en hora de Uruguay (-03:00). Es el único dato
                       que la web usa para ordenar y contar.
     --------------------------------------------------------- */
  presentaciones: [
    {
      titulo: 'Giselle',
      subtitulo: 'Una historia de amor, engaño y muerte',
      tipo: 'Ballet',

      fechaHoraISO: '2026-10-16T17:00:00-03:00',
      fechaLegible: 'Viernes 16 de octubre de 2026',
      anio: '2026',

      funciones: [
        { hora: '17:00', nombre: 'Primera función' },
        { hora: '20:30', nombre: 'Segunda función' }
      ],

      lugar: 'Teatro Florencio Sánchez',
      ciudad: 'Paysandú',

      descripcion: [
        'Giselle la bailan las alumnas del estudio: un año de clases, ensayos y trabajo de grupo que termina arriba de un escenario.',
        'Es la historia de una muchacha que se enamora de quien no debía, y de las mujeres que vuelven de la muerte a bailar. Un clásico del ballet romántico, contado sin una sola palabra.'
      ],

      /* Si algún día hay venta online, pegá el link acá. */
      entradasUrl: '',
      entradasNota: 'Las entradas se venden en las dos sedes del estudio, en Paysandú y en Young.'
    }

    /* La obra del año que viene va así (descomentá y completá):
    {
      titulo: 'Nombre de la obra',
      subtitulo: '',
      tipo: 'Ballet',
      fechaHoraISO: '2027-10-15T17:00:00-03:00',
      fechaLegible: 'Viernes 15 de octubre de 2027',
      anio: '2027',
      funciones: [ { hora: '17:00', nombre: 'Primera función' } ],
      lugar: 'Teatro Florencio Sánchez',
      ciudad: 'Paysandú',
      descripcion: [ 'De qué se trata.' ],
      entradasUrl: '',
      entradasNota: ''
    }
    */
  ],

  /* Textos fijos de la sección. No dependen de ninguna obra. */
  escenario: {
    titulo: 'Del salón al teatro',
    lead: 'Todos los años el estudio arma una obra y la presenta en el teatro. Es donde se ve, junto, el trabajo de todo el año.',
    etiquetaProxima: 'La que viene',
    etiquetaAnteriores: 'Ya las presentamos',
    tituloReloj: 'Falta para la primera función',
    sinProxima: 'Estamos preparando la próxima. Seguinos en Instagram para enterarte de la fecha.'
  },

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
      nombre: 'Ballet clásico',
      descripcion: 'La base de todo: postura, giros, saltos y trabajo en puntas. Se avanza por niveles, sin apuro y respetando el cuerpo de cada una.',
      nivel: 'Desde los primeros pasos hasta puntas',
      imagen: 'assets/img/disciplinas/ballet.jpg',
      color: 'ballet'
    },
    {
      nombre: 'Expresión corporal',
      descripcion: 'La puerta de entrada de las más chicas. Se juega, se escucha música y se aprende a mover el cuerpo con soltura, sin pasos memorizados.',
      nivel: 'Para los más chicos',
      imagen: 'assets/img/disciplinas/expresion.jpg',
      color: 'expresion'
    },
    {
      nombre: 'Urban jazz',
      descripcion: 'Danza urbana con la técnica del jazz: energía, coreografías con actitud y mucha música de ahora.',
      nivel: 'Jóvenes y adultos',
      imagen: 'assets/img/disciplinas/urban.jpg',
      color: 'urban'
    },
    {
      nombre: 'Danza árabe',
      descripcion: 'El movimiento del tronco, las caderas y los brazos, con velos y la elegancia de una danza con siglos encima.',
      nivel: 'Todas las edades',
      imagen: 'assets/img/disciplinas/arabe.jpg',
      color: 'arabe'
    },
    {
      nombre: 'Fitness',
      descripcion: 'Entrenamiento del cuerpo con música: fuerza, resistencia y movilidad, en grupo y sin necesidad de saber bailar.',
      nivel: 'Adultos',
      imagen: '',
      color: 'fitness'
    }
  ],
  disciplinasNota: 'Los horarios y los niveles cambian según la sede. Escribinos y te decimos cuáles hay en Paysandú y cuáles en Young.',

  /* ---------------------------------------------------------
     7.bis SÉ PARTE — la foto del grupo y la invitación a sumarse
     --------------------------------------------------------- */
  familia: {
    titulo: 'Sé parte de la familia',

    imagen: 'assets/img/familia.jpg',
    imagenAlt: 'Las alumnas del estudio sobre el escenario del teatro, saludando al final de la función, con el público iluminando la sala',
    pieFoto: 'Todas las alumnas del estudio, al cerrar la función.',

    parrafos: [
      'Esto es lo que queda después de un año de clases: un escenario lleno y una sala de pie.',
      'Se empieza de a poco, sin saber nada, a cualquier edad. El resto se construye yendo. Si querés probar, escribinos y te contamos cómo sumarte.'
    ],

    boton: 'Quiero sumarme'
  },

  /* ---------------------------------------------------------
     8. GALERÍA
     Hoy muestra la campaña visual de Giselle.
     Para poner fotos reales del estudio, reemplazá los archivos de
     assets/img/galeria/ y actualizá el "alt" de cada una.
       alto: 'alto' | 'medio' | 'bajo'
     --------------------------------------------------------- */
  galeria: [
    { src: 'assets/img/galeria/01.jpg', alt: 'Una bailarina en puntas, de vestido celeste, junto a un árbol de utilería', alto: 'medio' },
    { src: 'assets/img/galeria/02.jpg', alt: 'El grupo de contemporáneo extiende una tela blanca bajo los haces de luz, con dos lunas de fondo', alto: 'medio' },
    { src: 'assets/img/galeria/03.jpg', alt: 'Las bailarinas de danza árabe en el escenario, iluminadas de rojo', alto: 'medio' },
    { src: 'assets/img/galeria/04.jpg', alt: 'Las alumnas más chicas de ballet, de vestido celeste, con los brazos en alto', alto: 'alto' },
    { src: 'assets/img/galeria/05.jpg', alt: 'Un cuadro de grupo en rosa y negro, con el escenario iluminado de rojo', alto: 'medio' },
    { src: 'assets/img/galeria/06.jpg', alt: 'Una bailarina en pleno salto frente a un telón de hongos', alto: 'medio' },
    { src: 'assets/img/galeria/07.jpg', alt: 'Tres alumnas caracterizadas, en una escena actuada de la función', alto: 'medio' },
    { src: 'assets/img/galeria/08.jpg', alt: 'Escena de grupo alrededor de una mesa larga, con vestuario de personajes', alto: 'medio' }
  ],
  galeriaLead: 'Momentos de nuestras funciones en el teatro.',
  galeriaNota: 'Fotos: Esteban Solari.',

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
    { etiqueta: 'Estudio',     href: '#estudio' },
    { etiqueta: 'Disciplinas', href: '#disciplinas' },
    { etiqueta: 'Escenario',   href: '#escenario' },
    { etiqueta: 'Galería',     href: '#galeria' },
    { etiqueta: 'Sedes',       href: '#ubicacion' },
    { etiqueta: 'Contacto',    href: '#contacto' }
  ]
};
