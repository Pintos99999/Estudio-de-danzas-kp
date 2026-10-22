/* =============================================================
   AYUDANTE DEL ASISTENTE  —  Cloudflare Worker
   -------------------------------------------------------------
   Esta es la única pieza que corre en un servidor, y existe por
   una sola razón: GUARDAR LA CLAVE DE GOOGLE.

   El sitio es estático (GitHub Pages). Si la clave estuviera en
   el JavaScript de la página, cualquiera podría verla con dos
   clics y gastarla. Por eso la clave vive acá, en una variable
   de entorno, y la página sólo le habla a este ayudante.

   Tiene dos puertas:
     POST /preguntar  -> el chat del sitio. Público.
     POST /redactar   -> el asistente del panel. Pide contraseña.

   Ninguna de las dos escribe nada en el sitio. El asistente del
   panel sólo REDACTA Y SUGIERE: publicar lo sigue haciendo la
   persona, con el botón de siempre.

   Cómo instalarlo: ver LEEME-ASISTENTE.md (al lado de este
   archivo). Son unos minutos y es gratis.

   Variables de entorno que hay que cargar:
     GEMINI_API_KEY  (secreto) la clave de Google AI Studio
     SITIO           la dirección del sitio, p. ej.
                     https://pintos99999.github.io/Estudio-de-danzas-kp
     ADMIN_CLAVE     (secreto) una contraseña inventada por ustedes.
                     Sólo la usa el panel.
   ============================================================= */

const MODELO = 'gemini-2.5-flash';
const MAX_MENSAJE = 600;      // caracteres por pregunta
const MAX_POR_MINUTO = 12;    // preguntas por visitante

/* Memoria corta para no recargar los datos del sitio en cada pregunta */
let cacheDatos = { cuando: 0, valor: null };
const visitas = new Map();

export default {
  async fetch(peticion, entorno) {
    const url = new URL(peticion.url);
    const origen = entorno.SITIO || '*';

    if (peticion.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: cors(origen) });
    }
    if (peticion.method !== 'POST') {
      return responder({ error: 'Usá POST' }, 405, origen);
    }
    if (!entorno.GEMINI_API_KEY) {
      return responder({ error: 'Falta configurar GEMINI_API_KEY en el ayudante.' }, 503, origen);
    }

    try {
      if (url.pathname.endsWith('/preguntar')) return await preguntar(peticion, entorno, origen);
      if (url.pathname.endsWith('/redactar'))  return await redactar(peticion, entorno, origen);
      return responder({ error: 'Dirección desconocida' }, 404, origen);
    } catch (e) {
      return responder({ error: 'El asistente tuvo un problema: ' + e.message }, 500, origen);
    }
  }
};

/* -------------------------------------------------------------
   EL CHAT DEL SITIO (público)
   ------------------------------------------------------------- */
async function preguntar(peticion, entorno, origen) {
  if (!dentroDelLimite(peticion)) {
    return responder({ error: 'Muchas preguntas seguidas. Probá en un minuto.' }, 429, origen);
  }

  const cuerpo = await peticion.json().catch(() => ({}));
  const mensajes = Array.isArray(cuerpo.mensajes) ? cuerpo.mensajes.slice(-10) : [];
  const idioma = cuerpo.idioma === 'en' ? 'en' : 'es';

  if (!mensajes.length) return responder({ error: 'No vino ninguna pregunta.' }, 400, origen);
  for (const m of mensajes) {
    if (typeof m.texto !== 'string' || m.texto.length > MAX_MENSAJE) {
      return responder({ error: 'La pregunta es demasiado larga.' }, 400, origen);
    }
  }

  /* El contexto lo arma el ayudante leyendo el sitio publicado.
     Así el navegador no puede inventarle datos falsos al modelo. */
  const datos = await datosDelSitio(entorno);
  if (!datos) {
    return responder({ error: 'No pude leer la información del sitio.' }, 503, origen);
  }

  const instruccion =
`Sos el asistente del ${datos.estudio?.nombre || 'estudio de danzas'}, en Uruguay.
Hablás con alguien que entró a la página web.

REGLAS QUE NO SE NEGOCIAN:
- Respondé SOLO con la información de la FICHA de abajo.
- Si la ficha no dice algo (precios, edades, horarios de clase,
  cupos, si queda lugar), decí con naturalidad que eso se consulta
  directamente y pasá el WhatsApp o el mail que figuran en la ficha.
  NUNCA inventes un precio, una fecha, un horario ni una dirección.
- No prometas lugares, descuentos ni reservas.
- Para inscribirse o comprar entradas, derivá siempre al contacto.
- Respondé en ${idioma === 'en' ? 'inglés' : 'español rioplatense (de vos)'}.
- Sé breve y cálido: dos o tres oraciones, sin listas largas,
  sin markdown, sin asteriscos.

FICHA DEL ESTUDIO (información real y actual):
${resumir(datos, idioma)}`;

  const contenidos = mensajes.map(m => ({
    role: m.rol === 'asistente' ? 'model' : 'user',
    parts: [{ text: String(m.texto) }]
  }));

  const texto = await gemini(entorno.GEMINI_API_KEY, instruccion, contenidos, 300);
  return responder({ respuesta: texto }, 200, origen);
}

/* -------------------------------------------------------------
   EL ASISTENTE DEL PANEL (con contraseña)
   Sólo redacta texto. No publica, no borra, no toca nada.
   ------------------------------------------------------------- */
async function redactar(peticion, entorno, origen) {
  const clave = peticion.headers.get('X-Panel-Clave') || '';
  if (!entorno.ADMIN_CLAVE || clave !== entorno.ADMIN_CLAVE) {
    return responder({ error: 'La contraseña del asistente no es correcta.' }, 401, origen);
  }

  const cuerpo = await peticion.json().catch(() => ({}));
  const pedido = String(cuerpo.pedido || '').slice(0, 1200);
  const tarea = String(cuerpo.tarea || 'texto');
  if (!pedido) return responder({ error: 'No vino ningún pedido.' }, 400, origen);

  const datos = await datosDelSitio(entorno);

  const instrucciones = {
    aviso:
`Escribí un aviso corto para la web del estudio de danzas.
Devolvé EXACTAMENTE este formato, sin nada más:
TITULO: <máximo 6 palabras>
TEXTO: <una o dos oraciones, cálidas y claras>
TITULO_EN: <el título en inglés>
TEXTO_EN: <el texto en inglés>`,

    evento:
`Escribí la descripción de un espectáculo de danza para la web.
Devolvé EXACTAMENTE este formato, sin nada más:
TEXTO: <dos o tres oraciones, en español rioplatense>
TEXTO_EN: <lo mismo en inglés>`,

    texto:
`Ayudá a redactar o mejorar el texto pedido para la web de un
estudio de danzas. Devolvé sólo el texto final, sin explicaciones.`
  };

  const instruccion =
`${instrucciones[tarea] || instrucciones.texto}

No inventes fechas, precios ni lugares: si hacen falta y no están
en el pedido, dejá un hueco con tres guiones (---) para completar.
Nada de markdown ni asteriscos.

Para que sepas de qué estudio se trata:
${resumir(datos, 'es')}`;

  const texto = await gemini(entorno.GEMINI_API_KEY, instruccion,
    [{ role: 'user', parts: [{ text: pedido }] }], 600);

  return responder({ respuesta: texto }, 200, origen);
}

/* -------------------------------------------------------------
   Llamada a Google
   ------------------------------------------------------------- */
async function gemini(clave, instruccion, contenidos, maxSalida) {
  const r = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${MODELO}:generateContent`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-goog-api-key': clave },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: instruccion }] },
        contents: contenidos,
        generationConfig: { temperature: 0.6, maxOutputTokens: maxSalida }
      })
    }
  );

  if (!r.ok) {
    const detalle = await r.text().catch(() => '');
    if (r.status === 429) throw new Error('se alcanzó el límite de consultas de Google por hoy');
    if (r.status === 400 && /API key/i.test(detalle)) throw new Error('la clave de Google no es válida');
    throw new Error('Google respondió ' + r.status);
  }

  const j = await r.json();
  const texto = j?.candidates?.[0]?.content?.parts?.map(p => p.text || '').join('').trim();
  if (!texto) throw new Error('Google no devolvió texto');
  return texto;
}

/* -------------------------------------------------------------
   Leer los datos del sitio publicado
   ------------------------------------------------------------- */
async function datosDelSitio(entorno) {
  const ahora = Date.now();
  if (cacheDatos.valor && ahora - cacheDatos.cuando < 10 * 60 * 1000) return cacheDatos.valor;

  const base = (entorno.SITIO || '').replace(/\/$/, '');
  if (!base) return null;

  const r = await fetch(base + '/assets/js/siteData.js', { cf: { cacheTtl: 300 } });
  if (!r.ok) return cacheDatos.valor;

  const txt = await r.text();
  const i = txt.indexOf('{');
  const f = txt.lastIndexOf('}');
  if (i < 0 || f < 0) return cacheDatos.valor;

  try {
    const valor = JSON.parse(txt.slice(i, f + 1));
    cacheDatos = { cuando: ahora, valor };
    return valor;
  } catch (e) {
    /* El archivo se editó a mano y dejó de ser JSON puro.
       Seguimos con lo último que sí pudimos leer. */
    return cacheDatos.valor;
  }
}

/* Arma la ficha en texto plano que lee el modelo */
function resumir(D, idioma) {
  if (!D) return '(sin datos)';
  const t = v => (v && typeof v === 'object') ? (v[idioma] || v.es || '') : (v || '');
  const L = [];

  L.push(`NOMBRE: ${t(D.estudio?.nombre)}`);
  if (D.instituto) L.push(`QUIÉNES SOMOS: ${t(D.instituto.bajada)} ${t(D.instituto.lema)}`);

  (D.sucursales || []).forEach(s => {
    L.push(`SEDE ${t(s.nombre) || s.id}: ${t(s.direccion) || s.mapsBusqueda || ''}` +
      (s.telefono ? ` · tel ${s.telefono}` : '') +
      (s.celular ? ` · cel ${s.celular}` : '') +
      (s.whatsapp ? ` · WhatsApp https://wa.me/${s.whatsapp}` : ''));
  });

  const disc = (D.disciplinas || []).map(d => t(d.nombre)).filter(Boolean);
  if (disc.length) L.push(`DISCIPLINAS QUE SE DICTAN: ${disc.join(', ')}`);
  L.push('EDADES, HORARIOS DE CLASE Y PRECIOS: no están publicados, hay que consultarlos.');

  if (D.eventos?.activo) {
    const futuros = (D.listaEventos || [])
      .filter(e => new Date(e.fechaHoraISO) > new Date())
      .sort((a, b) => new Date(a.fechaHoraISO) - new Date(b.fechaHoraISO));

    if (futuros.length) {
      futuros.slice(0, 3).forEach(e => {
        const f = (e.funciones || []).map(x => `${x.hora} ${t(x.nombre)}`.trim()).join(' y ');
        const entradas = {
          sedes: 'las entradas se consiguen en las sedes del estudio',
          link: `venta de entradas: ${e.entradas?.url || ''}`,
          consultar: 'las entradas todavía no están a la venta: hay que consultar'
        }[e.entradas?.modo] || 'consultar por entradas';

        L.push(`PRÓXIMO EVENTO: "${t(e.titulo)}" — ${t(e.fechaLegible)}` +
          (f ? ` · funciones: ${f}` : '') +
          (e.lugar ? ` · en ${e.lugar}${e.ciudad ? ', ' + e.ciudad : ''}` : '') +
          (e.entradas?.precio ? ` · ${e.entradas.precio}` : '') +
          ` · ${entradas}`);
      });
    } else {
      L.push('PRÓXIMO EVENTO: todavía no hay fecha anunciada.');
    }
  } else {
    L.push('PRÓXIMO EVENTO: no hay ninguno anunciado por ahora.');
  }

  const hoy = new Date(); hoy.setHours(0, 0, 0, 0);
  (D.listaAvisos || []).forEach(a => {
    if (a.publicado === false) return;
    if (a.desde && new Date(a.desde + 'T00:00:00') > hoy) return;
    if (a.hasta && new Date(a.hasta + 'T23:59:59') < hoy) return;
    L.push(`AVISO VIGENTE: ${t(a.titulo)} — ${t(a.texto)}`);
  });

  if (D.contacto?.email) L.push(`MAIL: ${D.contacto.email}`);
  if (D.contacto?.instagramUrl) L.push(`INSTAGRAM: ${D.contacto.instagramUrl}`);
  if (D.contacto?.facebookUrl) L.push(`FACEBOOK: ${D.contacto.facebookUrl}`);
  L.push('INSCRIPCIONES: se hacen escribiendo por WhatsApp o pasando por la sede.');

  return L.join('\n');
}

/* -------------------------------------------------------------
   Ayudas
   ------------------------------------------------------------- */
function dentroDelLimite(peticion) {
  const quien = peticion.headers.get('CF-Connecting-IP') || 'anonimo';
  const ahora = Date.now();
  const previo = visitas.get(quien);

  if (!previo || ahora - previo.desde > 60000) {
    visitas.set(quien, { desde: ahora, cuantas: 1 });
    if (visitas.size > 5000) visitas.clear();
    return true;
  }
  previo.cuantas++;
  return previo.cuantas <= MAX_POR_MINUTO;
}

function cors(origen) {
  return {
    'Access-Control-Allow-Origin': origen,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-Panel-Clave',
    'Access-Control-Max-Age': '86400'
  };
}

function responder(objeto, estado, origen) {
  return new Response(JSON.stringify(objeto), {
    status: estado,
    headers: { 'Content-Type': 'application/json; charset=utf-8', ...cors(origen) }
  });
}
