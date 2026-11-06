/** Keep the gallery, thumbnails and optional color controls in sync. */
export function initProductGallery(root) {
  if (root.dataset.galleryReady) return;
  const slides = [...root.querySelectorAll('[data-slide]')];
  if (!slides.length) return;
  root.dataset.galleryReady = 'true';
  const scope = root.closest('[data-product-main]') || root;
  const colors = [...scope.querySelectorAll('[data-gallery-select]')];
  const thumbs = [...root.querySelectorAll('[data-thumb]')];
  let active = 0;
  function show(index) {
    active = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => (slide.hidden = i !== active));
    thumbs.forEach((thumb, i) => {
      thumb.classList.toggle('border-green-700', i === active);
      thumb.classList.toggle('border-transparent', i !== active);
      thumb.setAttribute('aria-pressed', String(i === active));
    });
    colors.forEach((button) => {
      button.setAttribute('aria-pressed', String(Number(button.dataset.gallerySelect) === active));
    });
    const selected = scope.querySelector('[data-selected-color]');
    if (selected)
      selected.textContent =
        colors.find((button) => Number(button.dataset.gallerySelect) === active)?.dataset
          .colorName || '—';
    const count = root.querySelector('[data-gallery-count]');
    if (count) count.textContent = `${active + 1} / ${slides.length}`;
  }
  root.querySelector('[data-gallery-prev]')?.addEventListener('click', () => show(active - 1));
  root.querySelector('[data-gallery-next]')?.addEventListener('click', () => show(active + 1));
  thumbs.forEach((thumb) =>
    thumb.addEventListener('click', () => show(Number(thumb.dataset.thumb))),
  );
  colors.forEach((button) =>
    button.addEventListener('click', () => show(Number(button.dataset.gallerySelect))),
  );
  show(0);
}
