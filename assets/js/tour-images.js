/* Nation Tours PTY: no image filenames need to be edited into HTML.
 * Photos are discovered via generated assets/img/tours/manifest.json.
 * Add JPG/PNG/WEBP/AVIF/GIF files to a matching folder; GitHub Actions updates manifest.json.
 */
(() => {
  'use strict';
  const BASE = 'assets/img/tours/manifest.json';
  const FALLBACK = 'assets/img/tour-placeholder.svg';
  const validSlugs = new Set(['panama-city','panama-canal','cruceros','monkey-island','san-lorenzo','transfers']);
  const validPath = (slug, path) =>
    typeof path === 'string' && path.startsWith(`assets/img/tours/${slug}/`) &&
    !path.includes('..') && /\.(jpg|jpeg|png|webp|avif|gif)$/i.test(path);
  const currentLanguage = () => document.documentElement.lang === 'en' ? 'en' : 'es';
  const photoAlt = (slug, index) => currentLanguage() === 'en'
    ? `Nation Tours PTY - ${slug.replace(/-/g, ' ')} - photo ${index + 1}`
    : `Nation Tours PTY - ${slug.replace(/-/g, ' ')} - fotografía ${index + 1}`;
  const photoFallbackAlt = () => currentLanguage() === 'en'
    ? 'Official photos coming soon' : 'Próximamente, fotografías oficiales';
  function refreshPhotoDescriptions() {
    document.querySelectorAll('img[data-tour-image]').forEach(image => {
      const slug = image.dataset.tourImage;
      if (image.dataset.tourHasPhoto === 'true') image.alt = photoAlt(slug, 0);
    });
    document.querySelectorAll('img[data-album-photo]').forEach(image => {
      const slug = image.dataset.albumPhoto;
      const index = Number(image.dataset.albumIndex || 0);
      image.alt = image.dataset.albumFallback === 'true' ? photoFallbackAlt() : photoAlt(slug, index);
    });
  }
  document.addEventListener('ntp:language-change', refreshPhotoDescriptions);

  let lastManifest = {};
  function render(manifest) {
    lastManifest = manifest;
    const lists = {};
    for (const slug of validSlugs) {
      lists[slug] = Array.isArray(manifest?.[slug]) ? manifest[slug].filter(p => validPath(slug, p)) : [];
    }
    document.querySelectorAll('img[data-tour-image]').forEach(image => {
      const slug = image.dataset.tourImage;
      const path = lists[slug]?.[0];
      image.src = path ? encodeURI(path) : FALLBACK;
      image.dataset.tourHasPhoto = path ? 'true' : 'false';
      if (path) image.alt = photoAlt(slug, 0);
      image.onerror = () => { image.onerror = null; image.src = FALLBACK; };
    });
    document.querySelectorAll('[data-tour-gallery]').forEach(slider => {
      const slug = slider.dataset.tourGallery;
      const files = lists[slug] || [];
      const track = slider.querySelector('.slider-track');
      if (!track) return;
      track.textContent = '';
      (files.length ? files : [FALLBACK]).forEach((path, index) => {
        const slide = document.createElement('div');
        slide.className = 'album-slide';
        const image = document.createElement('img');
        image.src = encodeURI(path);
        image.dataset.albumPhoto = slug;
        image.dataset.albumIndex = String(index);
        image.dataset.albumFallback = files.length ? 'false' : 'true';
        image.alt = files.length ? photoAlt(slug, index) : photoFallbackAlt();
        image.loading = index ? 'lazy' : 'eager';
        image.onerror = () => { image.onerror = null; image.src = FALLBACK; };
        slide.appendChild(image);
        track.appendChild(slide);
      });
      slider.querySelectorAll('.slide-arrow').forEach(button => {
        button.hidden = files.length < 2;
      });
    });
  }

  fetch(BASE, {cache: 'no-cache'})
    .then(r => { if (!r.ok) throw Error('Manifest HTTP ' + r.status); return r.json(); })
    .then(render)
    .catch(err => { console.warn('No se pudo leer el índice de fotos:', err); render({}); });
})();
