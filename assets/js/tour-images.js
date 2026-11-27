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
  const photoAlt = (slug, index) => `Nation Tours PTY - ${slug.replace(/-/g, ' ')} - ${document.documentElement.lang === 'en' ? 'photo' : 'fotografía'} ${index + 1}`;

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
        image.alt = files.length ? photoAlt(slug, index) : (document.documentElement.lang === 'en' ? 'Official photos coming soon' : 'Próximamente, fotografías oficiales');
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
  document.addEventListener('ntp:language-change', () => render(lastManifest));
  fetch(BASE, {cache: 'no-cache'})
    .then(r => { if (!r.ok) throw Error('Manifest HTTP ' + r.status); return r.json(); })
    .then(render)
    .catch(err => { console.warn('No se pudo leer el índice de fotos:', err); render({}); });
})();
