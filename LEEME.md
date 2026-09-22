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
| Teléfono, dirección, Instagram | `contacto` |
| **WhatsApp** (apagado por defecto) | `contacto.whatsapp` |
| **Fecha, horarios, teatro, título de la obra** | `evento` |
| **Link real de venta de entradas** | `evento.entradasUrl` |
| Próximas presentaciones | `presentaciones` |
| Textos de "Sobre nosotros" | `sobre` |
| **Disciplinas** (nombre, descripción, nivel, foto) | `disciplinas` |
| **Fotos de la galería** | `galeria` |
| Conectar el formulario de contacto | `formulario.endpoint` |
| Ítems del menú | `navegacion` |

### Entradas
```js
entradasUrl: '',   // vacío  -> los botones dicen "Consultar entradas" y bajan a Contacto
entradasUrl: 'https://...',  // con link -> dicen "Comprar entradas" y abren la venta
```

### WhatsApp
Está **desactivado** a propósito, porque sólo se confirmó el teléfono 4725 6647.
Para activarlo, poné el celular en formato internacional sin `+`:
```js
whatsapp: '59899123456',
```
Aparece solo en Contacto y en el footer.

### Formulario de contacto
Hoy **no envía nada** y lo dice con todas las letras (no simula un envío falso).
Para activarlo, creá un formulario gratis en [Formspree](https://formspree.io) y pegá la URL:
```js
formulario: { endpoint: 'https://formspree.io/f/xxxxxxx', ... }
```

---

## 3. Dónde van las fotos

Poné los archivos en `assets/img/` y escribí la ruta en `siteData.js`.
Mientras una ruta esté vacía, se muestra un marco decorativo que indica el espacio.

| Foto | Carpeta sugerida | Campo en siteData.js |
|---|---|---|
| Portada / hero | `assets/img/hero.jpg` | `evento.imagenHero` |
| Sala del estudio | `assets/img/estudio.jpg` | `sobre.imagen` |
| Disciplinas | `assets/img/disciplinas/ballet.jpg` … | `disciplinas[].imagen` |
| Galería (8 lugares) | `assets/img/galeria/01.jpg` … `08.jpg` | `galeria[].src` |
| Imagen para compartir en WhatsApp | `assets/img/og-image.jpg` (1200×630 px) | ver punto 4 |

Recomendación: fotos horizontales de al menos 1600 px de ancho para la portada,
y verticales/cuadradas para la galería. Guardalas como `.jpg` de buena calidad
(o `.webp` si querés que pesen menos).

Actualizá también el texto `alt` de cada foto: es lo que leen los lectores de
pantalla y Google.

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
