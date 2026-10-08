/* =============================================================
   ESTUDIO DE DANZAS KAREN PINTOS
   -------------------------------------------------------------
   ARCHIVO DE CONFIGURACIÓN / DATOS
   Este es el ÚNICO archivo que necesitás tocar para cambiar
   textos, teléfonos, fotos, disciplinas y enlaces.

   SOBRE LOS DOS IDIOMAS
   Los textos que se traducen se escriben así:

       titulo: { es: 'Disciplinas', en: 'Classes' }

   Si un texto no necesita traducción, se deja como está:

       titulo: 'Instagram'

   Si le falta el inglés, el sitio muestra el español. Nunca
   queda un hueco en blanco.
   ============================================================= */

window.SITE_DATA = {

  /* ---------------------------------------------------------
     1. ESTUDIO
     --------------------------------------------------------- */
  estudio: {
    nombre: 'Estudio de Danzas Karen Pintos',
    nombreCorto: 'Karen Pintos',
    logoLinea1: { es: 'ESTUDIO DE DANZAS', en: 'DANCE STUDIO' },
    logoLinea2: 'KAREN PINTOS',
    ciudad: 'Paysandú',
    pais: 'Uruguay',
    anio: 2026
  },

  /* ---------------------------------------------------------
     1.bis IDENTIDAD — lo primero que se ve al entrar
     --------------------------------------------------------- */
  instituto: {
    eyebrow: { es: 'Paysandú y Young · Uruguay', en: 'Paysandú & Young · Uruguay' },
    previo: { es: 'Estudio de Danzas', en: 'Dance Studio' },
    titulo: 'Karen Pintos',
    lema: {
      es: 'Donde la técnica se vuelve emoción.',
      en: 'Where technique turns into feeling.'
    },
    bajada: {
      es: 'Un espacio de formación en danza con dos sedes, donde cada alumna encuentra su tiempo, su cuerpo y su manera de decir las cosas sin palabras.',
      en: 'A dance school with two locations, where every student finds their own pace, their own body and their own way of saying things without words.'
    },

    manifiesto: {
      es: 'Enseñamos danza. Pero lo que de verdad se aprende acá es a sostener una idea con el cuerpo, a confiar en el grupo y a pararse frente a los demás.',
      en: 'We teach dance. But what you really learn here is how to hold an idea with your body, how to trust the group and how to stand in front of others.'
    },

    imagen: 'assets/img/hero.jpg',

    cifras: [
      { valor: { es: 'Dos sedes', en: 'Two locations' }, etiqueta: { es: 'Paysandú y Young', en: 'Paysandú and Young' } },
      { valor: { es: 'Clases', en: 'Classes' }, etiqueta: { es: 'por nivel y por edad', en: 'by level and by age' } },
      { valor: { es: 'Teatro', en: 'Theatre' }, etiqueta: { es: 'una presentación al año', en: 'one show a year' } }
    ]
  },

  /* ---------------------------------------------------------
     2. CONTACTO GENERAL
     --------------------------------------------------------- */
  contacto: {
    email: 'institutokarenpintos@gmail.com',
    instagramUsuario: '@estudio_de_danza_karenpintos',
    instagramUrl: 'https://www.instagram.com/estudio_de_danza_karenpintos/',
    facebookUsuario: 'Estudio de Danzas Karen Pintos',
    facebookUrl: 'https://www.facebook.com/danzaskarenpintos'
  },

  /* ---------------------------------------------------------
     2.bis REDES — la sección donde se las promociona
     Para sacar una red, borrá su bloque de esta lista.
       tipo -> instagram | facebook | email
     --------------------------------------------------------- */
  redes: {
    titulo: { es: 'Seguinos y escribinos', en: 'Follow us, write to us' },
    lead: {
      es: 'Todos los días subimos algo: clases, ensayos y lo que pasa atrás del escenario.',
      en: 'We post something every day: classes, rehearsals and what happens backstage.'
    },
    canales: [
      {
        tipo: 'instagram',
        nombre: 'Instagram',
        detalle: { es: 'Lo del día a día, en fotos y videos', en: 'Day to day, in photos and video' },
        accion: { es: 'Seguir', en: 'Follow' }
      },
      {
        tipo: 'facebook',
        nombre: 'Facebook',
        detalle: { es: 'Avisos, novedades y fotos de las funciones', en: 'Notices, news and photos from the shows' },
        accion: { es: 'Seguir', en: 'Follow' }
      },
      {
        tipo: 'email',
        nombre: { es: 'Correo', en: 'Email' },
        detalle: { es: 'Para consultas que llevan más de un mensaje', en: 'For questions that take more than a message' },
        accion: { es: 'Escribir', en: 'Write' }
      }
    ]
  },

  /* ---------------------------------------------------------
     3. SUCURSALES
       whatsapp -> número internacional SIN el "+" ni espacios.
                   Uruguay: 598 + celular sin el 0.
                   Ej: 092 025 250  ->  '59892025250'
     --------------------------------------------------------- */
  sucursales: [
    {
      id: 'paysandu',
      nombre: 'Paysandú',
      direccion: 'Dr. José Verocay 815',
      referencia: { es: 'entre Ituzaingó y Sarandí', en: 'between Ituzaingó and Sarandí' },
      localidad: 'Paysandú',
      codigoPostal: '60000',
      telefono: '4725 6647',
      telefonoLink: '+59847256647',
      celular: '092 025 250',
      whatsapp: '59892025250',

      /* Coordenadas exactas: el mapa apunta acá, sin depender de que
         Google adivine la dirección. Se sacan de Google Maps con
         clic derecho sobre el punto exacto. */
      coordenadas: '-32.3206073,-58.0729974',
      mapsBusqueda: 'Dr. José Verocay 815, 60000 Paysandú, Uruguay'
    },
    {
      id: 'young',
      nombre: 'Young',
      direccion: '25 de Agosto esquina Carlos Fischer',
      referencia: '',
      localidad: { es: 'Young, Río Negro', en: 'Young, Río Negro' },
      codigoPostal: '',
      telefono: '',
      telefonoLink: '',
      celular: '099 655 632',
      whatsapp: '59899655632',

      coordenadas: '-32.6955116,-57.6324761',
      mapsBusqueda: '25 de Agosto 3595, Young, Río Negro, Uruguay'
    }
  ],

  /* ---------------------------------------------------------
     4. EL ESCENARIO  (anuncio de funciones)
     -------------------------------------------------------------
     DESACTIVADO POR AHORA.

     Para volver a anunciar una función, poné  activo: true  y
     completá la obra en "presentaciones". La sección vuelve a
     aparecer sola, con su cuenta regresiva y su aviso en la
     portada, y también vuelve al menú.
     --------------------------------------------------------- */
  escenario: {
    activo: false,

    titulo: { es: 'Del salón al teatro', en: 'From the studio to the stage' },
    lead: {
      es: 'Todos los años el estudio arma una obra y la presenta en el teatro. Es donde se ve, junto, el trabajo de todo el año.',
      en: 'Every year the studio puts together a show and takes it to the theatre. That is where a whole year of work is seen at once.'
    },
    etiquetaProxima: { es: 'La que viene', en: 'Coming up' },
    etiquetaAnteriores: { es: 'Ya las presentamos', en: 'Already performed' },
    tituloReloj: { es: 'Falta para la primera función', en: 'Until the first show' },
    sinProxima: {
      es: 'Estamos preparando la próxima. Seguinos en Instagram para enterarte de la fecha.',
      en: 'We are working on the next one. Follow us on Instagram to hear the date first.'
    }
  },

  /* Cada obra es una fila. La fecha decide sola si va arriba
     (todavía no pasó) o abajo en "ya las presentamos". */
  presentaciones: [
    {
      titulo: 'Giselle',
      subtitulo: { es: 'Una historia de amor, engaño y muerte', en: 'A story of love, betrayal and death' },
      tipo: 'Ballet',
      fechaHoraISO: '2026-10-16T17:00:00-03:00',
      fechaLegible: { es: 'Viernes 16 de octubre de 2026', en: 'Friday 16 October 2026' },
      anio: '2026',
      funciones: [
        { hora: '17:00', nombre: { es: 'Primera función', en: 'First show' } },
        { hora: '20:30', nombre: { es: 'Segunda función', en: 'Second show' } }
      ],
      lugar: 'Teatro Florencio Sánchez',
      ciudad: 'Paysandú',
      descripcion: [
        { es: 'Giselle la bailan las alumnas del estudio: un año de clases, ensayos y trabajo de grupo que termina arriba de un escenario.',
          en: 'Giselle is danced by the studio students: a year of classes, rehearsals and teamwork that ends up on a stage.' }
      ],
      entradasUrl: '',
      entradasNota: {
        es: 'Las entradas se venden en las dos sedes del estudio.',
        en: 'Tickets are sold at both studio locations.'
      }
    }
  ],

  /* ---------------------------------------------------------
     5. SOBRE EL ESTUDIO
     --------------------------------------------------------- */
  sobre: {
    titulo: { es: 'Sobre nosotros', en: 'About us' },
    lead: {
      es: 'Un espacio dedicado a la formación y a la expresión artística a través de la danza.',
      en: 'A place for training and artistic expression through dance.'
    },

    imagen: 'assets/img/estudio.jpg',
    imagenAlt: {
      es: 'Bailarina con velo, iluminada a contraluz sobre el escenario',
      en: 'A dancer in a veil, backlit on stage'
    },

    parrafos: [
      { es: 'El Estudio de Danzas Karen Pintos es un espacio de formación en danza con sedes en Paysandú y Young, donde el trabajo técnico y la expresión artística conviven en cada clase.',
        en: 'Estudio de Danzas Karen Pintos is a dance school with locations in Paysandú and Young, where technical work and artistic expression live together in every class.' },
      { es: 'La sala es el lugar donde se construye: disciplina, constancia y detalle. El escenario es donde todo eso se transforma en emoción compartida.',
        en: 'The studio is where it gets built: discipline, consistency and detail. The stage is where all of that turns into shared emotion.' }
    ],
    pilares: [
      { titulo: { es: 'Formación', en: 'Training' },
        texto: { es: 'Trabajo técnico progresivo, respetando el tiempo y el cuerpo de cada alumna.',
                 en: 'Step-by-step technical work that respects each student’s pace and body.' } },
      { titulo: { es: 'Disciplina', en: 'Discipline' },
        texto: { es: 'Constancia, detalle y rigor como base de todo aprendizaje artístico.',
                 en: 'Consistency, detail and rigour as the base of any artistic learning.' } },
      { titulo: { es: 'Expresión', en: 'Expression' },
        texto: { es: 'La técnica al servicio de la interpretación y de la sensibilidad propia.',
                 en: 'Technique at the service of interpretation and of each person’s sensibility.' } },
      { titulo: { es: 'Escenario', en: 'Stage' },
        texto: { es: 'Presentaciones que reúnen el trabajo de todo el año frente al público.',
                 en: 'Shows that bring a whole year of work in front of an audience.' } }
    ]
  },

  /* ---------------------------------------------------------
     6. DISCIPLINAS
     -------------------------------------------------------------
     El nombre es TEXTO, no una imagen: así lo lee Google.
       color -> uno de los definidos en 01-variables.css
                (ballet, expresion, urban, arabe)
       textoOscuro -> true sólo si el color de fondo es claro
     --------------------------------------------------------- */
  disciplinas: [
    {
      nombre: { es: 'Ballet clásico', en: 'Classical ballet' },
      color: 'ballet',
      textoOscuro: true,
      descripcion: {
        es: 'La base de todo: postura, giros, saltos y trabajo en puntas. Se avanza por niveles, sin apuro y respetando el cuerpo de cada una.',
        en: 'The foundation of everything: posture, turns, jumps and pointe work. You move up by levels, unhurried, respecting each body.'
      },
      nivel: { es: 'Desde los primeros pasos hasta puntas', en: 'From first steps to pointe' }
    },
    {
      nombre: { es: 'Expresión corporal', en: 'Creative movement' },
      color: 'expresion',
      descripcion: {
        es: 'La puerta de entrada de las más chicas. Se juega, se escucha música y se aprende a mover el cuerpo con soltura, sin pasos memorizados.',
        en: 'The way in for the youngest ones. They play, they listen to music and they learn to move freely, with no steps to memorise.'
      },
      nivel: { es: 'Para los más chicos', en: 'For the little ones' }
    },
    {
      nombre: { es: 'Urban jazz', en: 'Urban jazz' },
      color: 'urban',
      descripcion: {
        es: 'Danza urbana con la técnica del jazz: energía, coreografías con actitud y mucha música de ahora.',
        en: 'Street dance with jazz technique: energy, choreography with attitude and plenty of today’s music.'
      },
      nivel: { es: 'Jóvenes y adultos', en: 'Teens and adults' }
    },
    {
      nombre: { es: 'Danza árabe', en: 'Arabic dance' },
      color: 'arabe',
      descripcion: {
        es: 'El movimiento del tronco, las caderas y los brazos, con velos y la elegancia de una danza con siglos encima.',
        en: 'Movement of the torso, hips and arms, with veils and the elegance of a dance that is centuries old.'
      },
      nivel: { es: 'Todas las edades', en: 'All ages' }
    }
  ],
  disciplinasNota: {
    es: 'Los horarios y los niveles cambian según la sede. Escribinos y te decimos cuáles hay en Paysandú y cuáles en Young.',
    en: 'Timetables and levels differ by location. Write to us and we will tell you what runs in Paysandú and what runs in Young.'
  },

  /* ---------------------------------------------------------
     7. SÉ PARTE — la foto del grupo y la invitación
     --------------------------------------------------------- */
  familia: {
    titulo: { es: 'Sé parte de la familia', en: 'Join the family' },

    imagen: 'assets/img/familia.jpg',
    imagenAlt: {
      es: 'Las alumnas del estudio sobre el escenario del teatro, saludando al final de la función, con el público iluminando la sala',
      en: 'The studio students on the theatre stage at the end of the show, with the audience lighting up the hall'
    },
    pieFoto: {
      es: 'Todas las alumnas del estudio, al cerrar la función.',
      en: 'Every student of the studio, as the show closes.'
    },

    parrafos: [
      { es: 'Esto es lo que queda después de un año de clases: un escenario lleno y una sala de pie.',
        en: 'This is what a year of classes leaves behind: a full stage and an audience on its feet.' },
      { es: 'Se empieza de a poco, sin saber nada, a cualquier edad. El resto se construye yendo. Si querés probar, escribinos y te contamos cómo sumarte.',
        en: 'You start slowly, knowing nothing, at any age. The rest is built by showing up. If you want to try, write to us and we will tell you how to join.' }
    ],

    boton: { es: 'Quiero sumarme', en: 'I want to join' }
  },

  /* ---------------------------------------------------------
     8. GALERÍA
       alto: 'alto' | 'medio' | 'bajo'
     --------------------------------------------------------- */
  galeria: [
    { src: 'assets/img/galeria/01.jpg', alto: 'medio',
      alt: { es: 'Una bailarina en puntas, de vestido celeste, junto a un árbol de utilería',
             en: 'A dancer on pointe in a pale blue dress, beside a prop tree' } },
    { src: 'assets/img/galeria/02.jpg', alto: 'medio',
      alt: { es: 'El grupo de contemporáneo extiende una tela blanca bajo los haces de luz, con dos lunas de fondo',
             en: 'The contemporary group stretches a white cloth under the beams, with two moons behind' } },
    { src: 'assets/img/galeria/03.jpg', alto: 'medio',
      alt: { es: 'Las bailarinas de danza árabe en el escenario, iluminadas de rojo',
             en: 'The Arabic dance group on stage, lit in red' } },
    { src: 'assets/img/galeria/04.jpg', alto: 'alto',
      alt: { es: 'Las alumnas más chicas de ballet, de vestido celeste, con los brazos en alto',
             en: 'The youngest ballet students in pale blue, arms raised' } },
    { src: 'assets/img/galeria/05.jpg', alto: 'medio',
      alt: { es: 'Un cuadro de grupo en rosa y negro, con el escenario iluminado de rojo',
             en: 'A group number in pink and black, the stage lit red' } },
    { src: 'assets/img/galeria/06.jpg', alto: 'medio',
      alt: { es: 'Una bailarina en pleno salto frente a un telón de hongos',
             en: 'A dancer mid-leap in front of a mushroom backdrop' } },
    { src: 'assets/img/galeria/07.jpg', alto: 'medio',
      alt: { es: 'Tres alumnas caracterizadas, en una escena actuada de la función',
             en: 'Three students in character, in an acted scene of the show' } },
    { src: 'assets/img/galeria/08.jpg', alto: 'medio',
      alt: { es: 'Escena de grupo alrededor de una mesa larga, con vestuario de personajes',
             en: 'A group scene around a long table, in character costumes' } }
  ],
  galeriaLead: {
    es: 'Momentos de nuestras funciones en el teatro.',
    en: 'Moments from our shows at the theatre.'
  },
  galeriaNota: { es: 'Fotos: Esteban Solari.', en: 'Photos: Esteban Solari.' },

  /* ---------------------------------------------------------
     9. FORMULARIO DE CONTACTO
       endpoint -> '' desactiva el envío (el formulario lo avisa)
     --------------------------------------------------------- */
  formulario: {
    endpoint: 'https://formsubmit.co/ajax/institutokarenpintos@gmail.com',
    asunto: 'Consulta desde la web — Estudio de Danzas Karen Pintos',
    tituloSeccion: { es: '¿Querés ser parte?', en: 'Want to join us?' },
    textoSeccion: {
      es: 'Escribinos para consultar por clases, disciplinas y horarios.',
      en: 'Write to us about classes, disciplines and timetables.'
    }
  },

  /* ---------------------------------------------------------
     10. NAVEGACIÓN
       soloSi: 'escenario' -> el ítem aparece sólo si esa
               sección está activa
     --------------------------------------------------------- */
  navegacion: [
    { etiqueta: { es: 'Inicio', en: 'Home' }, href: '#inicio' },
    { etiqueta: { es: 'Estudio', en: 'Studio' }, href: '#estudio' },
    { etiqueta: { es: 'Disciplinas', en: 'Classes' }, href: '#disciplinas' },
    { etiqueta: { es: 'Escenario', en: 'Stage' }, href: '#escenario', soloSi: 'escenario' },
    { etiqueta: { es: 'Galería', en: 'Gallery' }, href: '#galeria' },
    { etiqueta: { es: 'Sedes', en: 'Locations' }, href: '#ubicacion' },
    { etiqueta: { es: 'Contacto', en: 'Contact' }, href: '#contacto' }
  ],

  /* ---------------------------------------------------------
     11. TEXTOS DE LA INTERFAZ
     Los botones y etiquetas sueltas del sitio.
     --------------------------------------------------------- */
  ui: {
    consultarClases: { es: 'Consultar clases', en: 'Ask about classes' },
    consultarPorClases: { es: 'Consultar por clases', en: 'Ask about classes' },
    verDisciplinas: { es: 'Ver las disciplinas', en: 'See the classes' },
    descubrir: { es: 'Descubrir', en: 'Discover' },
    saltarContenido: { es: 'Saltar al contenido', en: 'Skip to content' },
    irInicio: { es: 'ir al inicio', en: 'go to home' },
    abrirMenu: { es: 'Abrir menú', en: 'Open menu' },
    cerrarMenu: { es: 'Cerrar menú', en: 'Close menu' },
    formacion: { es: 'Formación', en: 'Training' },
    elEstudio: { es: 'El estudio', en: 'The studio' },
    imagenes: { es: 'Imágenes', en: 'Images' },
    galeria: { es: 'Galería', en: 'Gallery' },
    disciplinas: { es: 'Disciplinas', en: 'Classes' },
    disciplinasLead: { es: 'Cada disciplina, su técnica y su lenguaje propio.', en: 'Each discipline, its own technique and language.' },
    sedes: { es: 'Sedes', en: 'Locations' },
    encontranos: { es: 'Encontranos', en: 'Find us' },
    sedesLead: { es: 'Dos salas, la misma forma de trabajar.', en: 'Two studios, the same way of working.' },
    comoLlegar: { es: 'Cómo llegar', en: 'Get directions' },
    elegirSede: { es: 'Elegí la sede', en: 'Choose a location' },
    elegirSedeMapa: { es: 'Elegir sede para ver en el mapa', en: 'Choose a location to see on the map' },
    escribinos: { es: 'Escribinos', en: 'Message us' },
    contacto: { es: 'Contacto', en: 'Contact' },
    nombre: { es: 'Nombre', en: 'Name' },
    tuNombre: { es: 'Tu nombre', en: 'Your name' },
    email: { es: 'Email', en: 'Email' },
    sedeInteres: { es: 'Sede de interés', en: 'Preferred location' },
    noLoSe: { es: 'Todavía no lo sé', en: 'Not sure yet' },
    mensaje: { es: 'Mensaje', en: 'Message' },
    mensajePlaceholder: { es: 'Contanos en qué te podemos ayudar', en: 'Tell us how we can help' },
    enviarMensaje: { es: 'Enviar mensaje', en: 'Send message' },
    enviando: { es: 'Enviando…', en: 'Sending…' },
    gracias: { es: '¡Gracias! Recibimos tu mensaje y te respondemos a la brevedad.', en: 'Thank you! We got your message and will reply shortly.' },
    completarCampos: { es: 'Completá tu nombre, un email válido y el mensaje.', en: 'Please fill in your name, a valid email and the message.' },
    noConectado: { es: 'Este formulario todavía <strong>no está conectado</strong>, así que el mensaje no se envía. Escribinos por ', en: 'This form is <strong>not connected yet</strong>, so the message will not be sent. Write to us on ' },
    noEnviado: { es: 'No pudimos enviar el mensaje', en: 'We could not send the message' },
    probaDeNuevo: { es: 'Probá de nuevo o escribinos por ', en: 'Try again or write to us on ' },
    secciones: { es: 'Secciones', en: 'Sections' },
    volverArriba: { es: 'Volver arriba', en: 'Back to top' },
    lemaPie: { es: 'Formación y expresión artística a través de la danza. Sedes en Paysandú y Young, Uruguay.', en: 'Training and artistic expression through dance. Locations in Paysandú and Young, Uruguay.' },
    verImagen: { es: 'Ampliar imagen', en: 'Enlarge image' },
    cerrar: { es: 'Cerrar', en: 'Close' },
    anterior: { es: 'Imagen anterior', en: 'Previous image' },
    siguiente: { es: 'Imagen siguiente', en: 'Next image' },
    imagenAmpliada: { es: 'Imagen ampliada', en: 'Enlarged image' },
    noEncontrada: { es: 'No se encontró la imagen', en: 'Image not found' },
    cambiarIdioma: { es: 'Switch to English', en: 'Cambiar a español' }
  }
};
