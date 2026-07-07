const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const els = Array.from(document.querySelectorAll<HTMLElement>('[data-parallax]'));

if (!reduce && els.length) {
  let ticking = false;
  const update = () => {
    const y = window.scrollY;
    for (const el of els) {
      const f = parseFloat(el.dataset.parallax || '0');
      el.style.transform = `translateY(${(y * f).toFixed(1)}px)`;
    }
    ticking = false;
  };
  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    },
    { passive: true },
  );
  update();
}
