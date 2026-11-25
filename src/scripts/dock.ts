// Projects menu in the dock: close after a choice, on an outside click and on Escape.
const menu = document.getElementById('projects-menu') as HTMLDetailsElement | null;
if (menu) {
  menu.addEventListener('click', (e) => {
    if ((e.target as HTMLElement).closest('a')) menu.open = false;
  });
  document.addEventListener('click', (e) => {
    if (menu.open && !menu.contains(e.target as Node)) menu.open = false;
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.open) {
      menu.open = false;
      menu.querySelector('summary')?.focus();
    }
  });
}

// Mark the dock item for the section in the middle of the screen.
if ('IntersectionObserver' in window) {
  const items = new Map<string, HTMLElement>();
  document.querySelectorAll<HTMLElement>('[data-spy]').forEach((el) => items.set(el.dataset.spy!, el));
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        items.get(en.target.id)?.setAttribute('aria-current', en.isIntersecting ? 'true' : 'false');
      });
    },
    { rootMargin: '-45% 0px -50% 0px' },
  );
  items.forEach((_, id) => {
    const section = document.getElementById(id);
    if (section) io.observe(section);
  });
}
