| Nombre, ciudad, año del footer | `estudio` |
| **Portada: lema, bajada, manifiesto, los 3 datos** | `instituto` |
# Estudio de Danzas Karen Pintos — sitio web

Landing page del estudio, con la presentación **Giselle** como protagonista.
Sitio estático: HTML + CSS + JavaScript, **sin build ni dependencias**.

### 🌐 Sitio online
**<https://pintos99999.github.io/Estudio-de-danzas-kp/>**

### Para actualizarlo
Editás lo que quieras (casi siempre `assets/js/siteData.js`) y después:

```powershell
cd "C:\Users\56943042\Desktop\Danza Karen Pintos"
git add -A
git commit -m "Actualizar contenido"
git push
```

En ~1 minuto los cambios están online.

---

## 1. Cómo verlo en tu compu

**Opción A — doble clic**
Abrí `index.html`. Funciona directamente en cualquier navegador.

**Opción B — servidor local** (recomendado, el mapa y las fuentes cargan mejor)
Clic derecho sobre `servidor-local.ps1` → *Ejecutar con PowerShell*, y después abrí
<http://localhost:8787>. Para cerrarlo, cerrá la ventana de PowerShell.

**Publicarlo en internet**
Arrastrá toda la carpeta a <https://app.netlify.com/drop> (gratis) o subila a
cualquier hosting. No hace falta compilar nada.

---

## 2. Dónde se cambia cada cosa

Casi todo está en **un solo archivo**: `assets/js/siteData.js`

| Qué querés cambiar | Dónde |
|---|---|
| Nombre, ciudad, año del footer | `estudio` |
| Email e Instagram | `contacto` |
| **Sedes**: dirección, teléfonos, WhatsApp | `sucursales` |
| **Fecha, horarios, teatro, título de la obra** | `evento` |
| **Link real de venta de entradas** | `evento.entradasUrl` |
| Próximas presentaciones | `presentaciones` |
| Textos de "Sobre nosotros" | `sobre` |
| **Disciplinas** (nombre, descripción, nivel, foto) | `disciplinas` |
| **Fotos de la galería** | `galeria` |
| Casilla que recibe el formulario | `formulario.endpoint` |
| Ítems del menú | `navegacion` |

### Sedes

Hay dos cargadas: **Paysandú** (Dr. José Verocay 815, entre Ituzaingó y Sarandí —
tel. 4725 6647, cel. 092 025 250) y **Young** (25 de Agosto esquina Carlos Fischer —
cel. 099 655 632).

Para agregar una tercera, copiá un bloque de `sucursales` y completalo. Todo lo
demás se actualiza solo: las tarjetas de "Encontranos", las pestañas del mapa,
los canales de contacto, el footer y el selector del botón de WhatsApp.

### WhatsApp

El número va en formato internacional, **sin `+` ni espacios**:

```js
// 092 025 250  ->  598 + 92025250
whatsapp: '59892025250',
```

Si una sede lo deja en `''`, simplemente no aparece su botón de WhatsApp.
El botón verde flotante abajo a la derecha muestra un selector de sede; si
quedara una sola sede con WhatsApp, abre el chat directo sin preguntar.

### Entradas
```js
entradasUrl: '',   // vacío  -> los botones dicen "Consultar entradas" y bajan a Contacto
entradasUrl: 'https://...',  // con link -> dicen "Comprar entradas" y abren la venta
```

---

## 3. Dónde van las fotos

Poné los archivos en `assets/img/` y escribí la ruta en `siteData.js`.
Mientras una ruta esté vacía, se muestra un marco decorativo que indica el espacio.

Hoy el sitio usa la **campaña gráfica de Giselle** (la que mandaste). Los
originales quedaron en `_fotos-origen/` (no se suben a GitHub, son 62 MB) y las
versiones optimizadas para web están en `assets/img/`.

| Foto | Archivo | Campo en siteData.js |
|---|---|---|
| Portada / hero | `assets/img/hero.jpg` | `evento.imagenHero` |
| Bloque "Sobre nosotros" | `assets/img/estudio.jpg` | `sobre.imagen` |
| Disciplinas | `assets/img/disciplinas/ballet.jpg` … | `disciplinas[].imagen` |
| Galería (11 piezas) | `assets/img/galeria/01.jpg` … `11.jpg` | `galeria[].src` |
| Imagen para compartir en WhatsApp | `assets/img/og-image.jpg` (1200×630 px) | ya configurada |

Para poner **fotos reales de las clases y las presentaciones**, reemplazá los
archivos de `assets/img/galeria/` conservando los nombres, y actualizá el texto
`alt` de cada una en `siteData.js` (es lo que leen los lectores de pantalla y
Google). Ideal: 1100 px de ancho, `.jpg` de buena calidad.

Si necesitás volver a generar las versiones web desde los originales, está el
script `_img.ps1` (`powershell -ExecutionPolicy Bypass -File _img.ps1 -Modo build`).

Recomendación: fotos horizontales de al menos 1600 px de ancho para la portada,
y verticales/cuadradas para la galería. Guardalas como `.jpg` de buena calidad
(o `.webp` si querés que pesen menos).

Actualizá también el texto `alt` de cada foto: es lo que leen los lectores de
pantalla y Google.

---

## 3.bis El formulario de contacto (IMPORTANTE)

Los mensajes del formulario llegan a **institutokarenpintos@gmail.com** usando
[FormSubmit](https://formsubmit.co), que no necesita servidor propio ni cuenta.

> ### ⚠️ Falta un paso, una sola vez
> FormSubmit exige confirmar la casilla antes de empezar a reenviar mensajes.
>
> 1. Entrá al sitio y mandá **un mensaje de prueba** desde el formulario.
> 2. Abrí **institutokarenpintos@gmail.com**: te va a llegar un correo de
>    FormSubmit con un botón de activación.
> 3. Hacé clic ahí.
>
> Desde ese momento, todos los mensajes del formulario llegan solos a esa casilla.
> Hasta que lo hagas, el formulario avisa en pantalla que no se pudo enviar.

Para que reciba **otra** casilla, cambiá el email del final del endpoint:

```js
endpoint: 'https://formsubmit.co/ajax/OTROEMAIL@gmail.com',
```

(y repetí la activación con esa casilla). Si lo dejás en `''`, el formulario no
envía nada y lo dice claramente, ofreciendo WhatsApp, Instagram y el email.

---

## 4. Pendiente: sacar el `noindex`

En `index.html` hay una etiqueta **temporal**:

```html
<meta name="robots" content="noindex, nofollow">
```

Impide que Google indexe el sitio. Está puesta a propósito porque todavía hay
textos de relleno ("Completar con la descripción…", "Disciplina 3", "Disciplina 4").

**Cuando completes las disciplinas y los textos definitivos, borrá esa línea**
y hacé `git push`. Recién ahí el sitio empieza a aparecer en búsquedas.

El resto ya está listo: la imagen de compartir (`assets/img/og-image.jpg`) y las
URLs de Open Graph apuntan al sitio real, así que el link se ve bien en WhatsApp.

---

## 5. Estructura

```
index.html                  Estructura, SEO, Open Graph, datos estructurados
servidor-local.ps1          Servidor local para previsualizar (opcional)
assets/
  css/styles.css            Sistema de diseño completo (colores, tipografía, responsive)
  img/
    bailarina.svg           Silueta decorativa del hero
    favicon.svg             Ícono de la pestaña
  js/
    siteData.js             ← TODOS LOS DATOS EDITABLES
    icons.js                Íconos SVG
    utils.js                Helpers (links de Maps, WhatsApp, entradas)
    main.js                 Montaje, animaciones, lightbox, formulario
    components/
      navbar.js  hero.js  giselle.js  about.js  classes.js
      gallery.js  instagram.js  location.js  contact.js  footer.js
```

---

## 6. Contenido: qué es real y qué es provisorio

**Datos reales** (provistos por el estudio): nombre, dirección, teléfono,
Instagram, y todo lo de Giselle (fecha, funciones, teatro).

**Textos provisorios** marcados para reemplazar: descripción del estudio, los
4 "pilares", y las 4 disciplinas de ejemplo.
No se inventaron profesores, precios, horarios de clase, premios, años de
trayectoria, testimonios ni redes sociales adicionales.


---

## 7. Las presentaciones (y por qué no hay que borrar nada)

**No existe una sección de Giselle.** Existe una sección fija —"Del salón al
teatro"— y Giselle es una fila de la lista `presentaciones` en `siteData.js`.

La web mira la fecha de cada obra y decide sola:

| Si la fecha… | La obra… |
|---|---|
| todavía no pasó | va arriba, con la cuenta regresiva y el botón de entradas |
| ya pasó | baja a "Ya las presentamos" |

Así que **el día después de una función no hay que tocar el sitio**. El 17 de
octubre a la mañana, Giselle aparece sola en la lista de obras ya presentadas,
el contador desaparece, el botón de entradas desaparece y el aviso de la
portada también. Si no hay ninguna obra próxima, la sección dice "Estamos
preparando la próxima".

### Anunciar la obra del año que viene

En `siteData.js`, dentro de `presentaciones`, hay un bloque de ejemplo
comentado. Descomentalo, completá los datos y guardá. Esa obra pasa a ser la
próxima, con su cuenta regresiva, y Giselle queda como historia.

El único dato que la web usa para decidir es `fechaHoraISO`:

```js
fechaHoraISO: '2027-10-15T17:00:00-03:00',
```

(fecha y hora de la primera función; el `-03:00` es la hora de Uruguay)

### El botón del encabezado

Dice **"Consultar clases"**, no "Entradas". Es a propósito: el encabezado es del
estudio y tiene que servir todo el año. Las entradas se ofrecen dentro de la
sección del escenario, sólo mientras haya una función por venir.

---

## 8. Google

Ya está preparado: título y descripción orientados a "clases de danza en
Paysandú y Young", el `h1` de la página es el nombre del estudio, hay
`robots.txt` y `sitemap.xml`, y los datos del estudio están en formato
Schema.org con las dos sedes.

Los datos del evento para Google **se generan solos** desde la próxima
presentación. Cuando la función pasa, dejan de publicarse: Google nunca va a
mostrar en el buscador una función vencida.

## Google: ya está habilitado

El `noindex` **ya se sacó**: el sitio es indexable. El siguiente paso lo hacés
vos una sola vez: entrá a [Google Search Console](https://search.google.com/search-console),
agregá `https://pintos99999.github.io/Estudio-de-danzas-kp/` y pegá el sitemap
`sitemap.xml`. Google tarda unos días en empezar a mostrarlo.

---

## 10. Las disciplinas

Las cuatro están en `siteData.js`. **El nombre es texto, no una imagen**:
el bloque de color y el "+" se dibujan con CSS. Así Google lee "Ballet
clásico" como texto y no como una foto.

Cada una lleva un `color` (`ballet`, `expresion`, `urban`, `arabe`) que sale
de `01-variables.css`, tomado de la gráfica oficial.

Para agregar una disciplina, copiá un bloque y poné su color. Si es un color
nuevo, agregalo primero a `01-variables.css` con su tono para el "+":

```css
--disc-fitness:     145 209   0;   --disc-fitness-mas: 185 232  80;
```

Si el fondo es claro (como el ballet), poné `textoOscuro: true` para que el
nombre se lea.

---

## 11. Los dos idiomas

El sitio está en español e inglés. El botón **ES / EN** está arriba a la
derecha, al lado de "Consultar clases".

Los textos que se traducen se escriben así en `siteData.js`:

```js
titulo: { es: 'Disciplinas', en: 'Classes' }
```

Si un texto no lleva traducción, se deja como está y se muestra igual en los
dos idiomas. **Si le falta el inglés, se muestra el español**: nunca queda un
hueco en blanco.

Los textos de los botones y etiquetas sueltas están todos juntos al final del
archivo, en `ui`.

La elección queda guardada en el navegador de cada visitante.

> **Para tener en cuenta con Google:** los dos idiomas viven en la misma
> dirección web. Google va a indexar el español, que es el idioma por defecto
> y el de tu público. El inglés sirve para quien entre y prefiera leerlo, pero
> no te va a traer visitas en inglés desde el buscador. Para eso harían falta
> direcciones separadas (`/en/`), que es bastante más trabajo y sólo vale la
> pena si aparece público de afuera.

---

## 12. El anuncio de funciones, apagado

La sección del escenario está **desactivada**. En `siteData.js`:

```js
escenario: { activo: false, ... }
```

Con eso, el sitio no menciona ninguna función: no aparece la sección, ni el
aviso de la portada, ni el ítem en el menú, ni los datos del evento para
Google. Los datos de Giselle quedaron guardados abajo, sin borrar.

Para volver a anunciar una función, poné `activo: true` y actualizá la obra en
`presentaciones`. Vuelve a aparecer todo solo, con su cuenta regresiva.

---

## 13. Las redes

Hay una sección propia —**"Seguinos y escribinos"**— con una tarjeta por canal:
Instagram, Facebook y correo. Cada una con su color.

Los enlaces están en `contacto`, dentro de `siteData.js`:

```js
instagramUrl: 'https://www.instagram.com/estudio_de_danza_karenpintos/',
facebookUrl:  'https://www.facebook.com/danzaskarenpintos',
email:        'institutokarenpintos@gmail.com',
```

Para sacar una red, borrá su bloque de `redes.canales`. Para agregar otra
(TikTok, YouTube), hay que sumar también su ícono en `icons.js`.

Las tres aparecen además en la sección de contacto, en el pie, y en los datos
que lee Google (`sameAs` de `index.html`).

---

## 14. Los mapas

Cada sede tiene sus **coordenadas exactas** en `siteData.js`:

```js
coordenadas: '-32.6955116,-57.6324761',
```

El mapa y el botón "Cómo llegar" usan esas coordenadas, **no la dirección
escrita**. Así el pin cae donde tiene que caer y no donde Google cree que
queda la calle.

Para corregir o mover un pin:

1. Abrí Google Maps y buscá el lugar.
2. Clic derecho exactamente sobre la puerta del estudio.
3. La primera línea del menú son las coordenadas: hacé clic y se copian.
4. Pegalas en `coordenadas` de esa sede.

El campo `mapsBusqueda` queda sólo como referencia escrita; si borrás las
coordenadas, el mapa vuelve a buscar por dirección.
