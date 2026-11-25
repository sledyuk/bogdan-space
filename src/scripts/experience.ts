// Experience list: show all rows, or only own products, freelance or companies.
const list = document.getElementById('xp');
const buttons = document.querySelectorAll<HTMLButtonElement>('.filter button[data-filter]');

if (list) {
  const rows = Array.from(list.querySelectorAll<HTMLLIElement>(':scope > li'));
  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const f = btn.dataset.filter;
      buttons.forEach((b) => b.setAttribute('aria-pressed', b === btn ? 'true' : 'false'));
      let first = true;
      rows.forEach((li) => {
        const show = f === 'all' || li.dataset.kind === f;
        li.hidden = !show;
        li.classList.toggle('first', show && first);
        if (show) first = false;
      });
    });
  });
}
