# Nation Tours PTY · Demo V0.3

Sitio multipágina listo para GitHub Pages. Descomprime y sube todos los archivos y carpetas a la raíz del repositorio.

## Páginas
- index.html
- tours.html
- tour-ciudad.html
- tour-naturaleza.html
- tour-privado.html
- kids.html
- recuerdos.html
- contacto.html

## Accesos de prueba (no son claves seguras)
- Álbum cliente: `RECUERDO2026`
- Gerencia: `GERENCIA2026`

**Importante:** son códigos de demostración expuestos en el JavaScript público. No protegen información real. No subir datos personales ni fotos de clientes.

El panel permite cambiar secciones, crear álbumes de muestra y previsualizar localmente archivos seleccionados, pero NO los guarda en servidor. GitHub Pages no almacena fotos subidas. Para un sistema real se requieren Cloudflare Workers + R2 + D1 + autenticación segura.

## Pendientes para lanzamiento real
- Reemplazar tours, textos, precios y fotografías ilustrativas por contenido confirmado.
- Obtener logo original en PNG transparente o SVG (el actual fue recortado de una captura).
- Configurar dominio y SEO de producción: quitar `noindex`, canonical y OG image, sitemap y robots.txt.
- Confirmar métodos de pago e integraciones antes de activar botones de cobro.
- Revisar uso de distintivos de marcas de pago según guías oficiales.

## Pagos
Se usan logotipos vectoriales del catálogo público Simple Icons por CDN con nombre de respaldo; no hay pasarela de pago.

## GitHub Pages
Settings > Pages > Deploy from a branch > main > /(root). No requiere build.
