# Instalar el asistente (Gemini)

Esto se hace **una sola vez** y es **gratis**. Son unos 10 minutos.

---

## Por qué hace falta este paso

La página del estudio es un sitio *estático*: son archivos sueltos
que GitHub muestra tal cual. No hay ningún servidor propio.

Google cobra por usar Gemini, y para usarlo hay que tener una **clave**.
Si esa clave estuviera escrita en el JavaScript de la página, cualquiera
podría abrir el código fuente del sitio, copiarla y gastarla a nombre
de ustedes. Eso no es una posibilidad remota: hay robots que rastrean
internet justamente buscando claves sueltas.

Por eso la clave vive en un **ayudante** aparte (`worker.js`), que es
la única pieza que corre en un servidor. La página le habla al ayudante,
y el ayudante le habla a Google. La clave nunca sale de ahí.

**Mientras no instales esto, no se rompe nada:** el chat simplemente no
aparece en el sitio, y el panel te avisa que falta configurarlo.

---

## Paso 1 — Sacar la clave de Google

1. Entrá a [aistudio.google.com/apikey](https://aistudio.google.com/apikey)
   con la cuenta de Google del estudio.
2. Tocá **Create API key**.
3. Copiá la clave. Empieza con `AIza...`.

Guardala en un lugar seguro y **no la pegues en ningún archivo del proyecto**.

> El plan gratuito de Gemini alcanza de sobra para las consultas de una
> página como esta. Si algún día se pasa del límite, el chat avisa que no
> puede responder y manda a escribir por WhatsApp: no se rompe el sitio.

---

## Paso 2 — Crear el ayudante en Cloudflare

1. Hacete una cuenta gratis en [dash.cloudflare.com](https://dash.cloudflare.com).
2. En el menú de la izquierda: **Workers & Pages → Create → Start with Hello World → Deploy**.
3. Ponele un nombre, por ejemplo `asistente-karen-pintos`.
4. Una vez creado, entrá a **Edit code**.
5. Borrá todo lo que haya y pegá el contenido completo de
   **`asistente/worker.js`** (el archivo que está al lado de este).
6. Tocá **Deploy**.

---

## Paso 3 — Cargar la clave y los datos

En el worker, andá a **Settings → Variables and Secrets** y agregá tres:

| Nombre | Tipo | Qué va |
|---|---|---|
| `GEMINI_API_KEY` | **Secret** | La clave del paso 1 |
| `SITIO` | Text | `https://pintos99999.github.io/Estudio-de-danzas-kp` |
| `ADMIN_CLAVE` | **Secret** | Una contraseña que inventes vos |

`ADMIN_CLAVE` es la que le vas a pedir a tu hermana la primera vez que
use el asistente dentro del panel. Puede ser cualquier cosa larga, por
ejemplo `karen-pintos-2026-danza`.

Guardá y volvé a **Deploy**.

---

## Paso 4 — Enchufarlo al sitio

Cloudflare te dio una dirección, algo como
`https://asistente-karen-pintos.TUCUENTA.workers.dev`.

1. Abrí el panel → pestaña **Asistente**.
2. Pegá esa dirección en **Dirección del asistente**.
3. Si querés que el chat aparezca también para las visitas del sitio,
   prendé **Mostrar el chat en el sitio**.
4. Tocá **Publicar cambios**.

Listo.

---

## Qué puede y qué no puede hacer

**El chat del sitio (público)**

- Contesta sobre disciplinas, sedes, direcciones, teléfonos, el próximo
  evento, sus horarios, dónde es y cómo se consiguen las entradas.
- Lee esa información **del sitio publicado**, no de un texto escrito a
  mano: cuando tu hermana publica un cambio, el chat se entera solo.
- Tiene prohibido inventar. Si le preguntan un precio o un horario de
  clase que no está cargado, dice que eso se consulta y pasa el WhatsApp.
- No puede escribir, borrar ni publicar nada.

**El asistente del panel (con contraseña)**

- Redacta avisos, descripciones y textos, en español y en inglés.
- Deja el texto a la vista con un botón de **Copiar**. Nada más.
- **No toca los datos ni publica**: eso lo sigue haciendo la persona,
  revisando y apretando *Publicar cambios*. Fue hecho así a propósito,
  para que la IA no pueda romper la página sola.

---

## Si algo no anda

| Lo que dice | Qué pasa |
|---|---|
| *"la clave de Google no es válida"* | La `GEMINI_API_KEY` está mal copiada. Revisala en Cloudflare. |
| *"se alcanzó el límite de consultas de Google por hoy"* | Se usó mucho. Vuelve solo al día siguiente. |
| *"La contraseña del asistente no es correcta"* | La que se escribió en el panel no coincide con `ADMIN_CLAVE`. |
| *"Falta configurar GEMINI_API_KEY"* | Falta cargar la variable, o falta volver a hacer Deploy. |
| El chat no aparece en el sitio | Falta la dirección en el panel, o falta prender el interruptor, o falta publicar. |

---

## Costos

- **Cloudflare Workers**: el plan gratis da 100.000 pedidos por día.
- **Gemini**: el plan gratis alcanza para el uso de una página así.

Ninguno de los dos pide tarjeta para el plan gratuito.
