# Nation Tours PTY — V0.7 · Ajustes de tours confirmados

Sitio estático multipágina, listo para subir a la raíz de GitHub Pages.

## Correcciones en esta versión
- **Panama City Tour**: se unifican Ciudad y Casco Antiguo; 5–6 h; **B/. 85 por persona + ITBMS**. Canal, Administration Building, Amador y Casco Antiguo. Incluye recogida/regreso, guía-conductora, hidratación y entradas del recorrido habitual. Museo del Canal Interoceánico NO incluido; entrada y tiempo adicionales.
- **Panama Canal Experience**: página independiente `tour-canal.html`, 4–5 h; Canal, Calzada de Amador y Museo del Canal. Tarifa pendiente; entradas a Canal y museo previstas según explicación de la guía.
- **Monkey Island Tour**: B/. 115–125 de rango orientativo, NO definitivo. Incluye transporte de ida/vuelta, bote y bebidas. Duración y modalidad de precio por confirmar.
- **San Lorenzo**: ficha preliminar basada en catálogo de WhatsApp: Agua Clara y Fuerte de San Lorenzo. Precio y detalles por confirmar.
- **Tours desde cruceros**: se mantienen pendientes de validar, sin tarifas definitivas.
- **Transfers**: se mantiene como servicio separado.
- Se elimina el duplicado de Casco Antiguo y la página de destinos no confirmados.
- Formulario de contacto actualizado con servicios actuales.

## Antes de publicar definitivamente
- Fotos ilustrativas: sustituir por imágenes de Nation Tours con permiso.
- Confirmar tarifa fiscal e inclusiones para cada servicio con Ana Lorena; un precio referencial no es oferta definitiva.
- Selector ES/EN: aún parcial; traducción completa sigue pendiente.
- Demo con `noindex,nofollow` hasta el dominio real.
- No incluye panel administrativo ni galería privada. Solicitudes de reserva por WhatsApp, sin backend.

## Publicación
Subir todos los archivos y carpetas a la raíz del repositorio GitHub Pages; conservar `.nojekyll`.


## Fotos de los tours — carpetas automáticas (V0.8)

Las fotos **no se escriben en el HTML**. Sube imágenes JPG/JPEG/PNG/WEBP/AVIF/GIF a la carpeta del tour correspondiente:

- `assets/img/tours/panama-city/` — Panama City Tour
- `assets/img/tours/panama-canal/` — Panama Canal Experience
- `assets/img/tours/cruceros/` — Tours de cruceros
- `assets/img/tours/monkey-island/` — Monkey Islands Tour
- `assets/img/tours/san-lorenzo/` — Fuerte de San Lorenzo
- `assets/img/tours/transfers/` — Traslados y servicio por hora

**Cómo funciona:** al subir o borrar fotos en `main`, el workflow `.github/workflows/update-tour-photos.yml` genera automáticamente `assets/img/tours/manifest.json`. La página usa ese JSON para cargar portada (primera foto) y galería completa. El índice se guarda en la misma rama `main`, sin crear ramas nuevas.

**Portada preferente:** llama a la foto principal `portada.webp`, `portada.jpg` o `portada.png`; si no existe, se usa la primera imagen en orden alfabético.

**IMPORTANTE:** al reemplazar el ZIP, sube también `.github/workflows/update-tour-photos.yml` y `scripts/generate_tour_manifest.py`. Si GitHub no dispara el workflow al subir varios archivos desde la web, abre Actions → «Actualizar galerías de tours» → Run workflow. El workflow requiere Actions habilitado y permiso `GITHUB_TOKEN: contents write`. Como alternativa manual, ejecuta `python3 scripts/generate_tour_manifest.py`, sube el `manifest.json` resultante a GitHub y no necesitas Actions.

Hasta que subas fotos, aparecerá una imagen neutra «Próximamente: fotografías oficiales», no fotos de otros lugares. El resto de la web se mantiene tal como estaba en V0.7.


## Logos de métodos de pago — V0.9

Guarda los seis archivos **SVG** en `assets/img/pagos/`, respetando mayúsculas/minúsculas:

- `visa.svg`
- `mastercard.svg`
- `apple-pay.svg`
- `google-pay.svg`
- `paypal.svg`
- `efectivo.svg`

Todas las secciones de pago del sitio ya apuntan a estas rutas locales; se eliminaron las URLs de Simple Icons. **Este ZIP no incluye los logos oficiales**: debes colocar tus seis SVG en esa carpeta para que aparezcan. El texto con el nombre de cada método de pago se mantiene visible si todavía falta algún logo. No cambies otros archivos HTML para actualizar las imágenes.


## V0.10: logos de pago locales
Se incluyen los seis SVG en `assets/img/pagos/`. Se utilizan rutas absolutas desde la raíz del sitio y ya no se ocultan ante errores ni usan lazy loading.
