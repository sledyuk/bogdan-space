// Tbilisi local time in every [data-clock] element, and the current year in the footer.
const clocks = document.querySelectorAll<HTMLElement>('[data-clock]');
const year = document.getElementById('year');
if (year) year.textContent = String(new Date().getFullYear());

const fmt = new Intl.DateTimeFormat('en-GB', {
  hour: '2-digit',
  minute: '2-digit',
  timeZone: 'Asia/Tbilisi',
});

function tick() {
  const t = fmt.format(new Date());
  clocks.forEach((el) => (el.textContent = t));
}
tick();
setInterval(tick, 30_000);
