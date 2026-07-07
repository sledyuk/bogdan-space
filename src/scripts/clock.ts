const el = document.getElementById('clock');
const inline = document.getElementById('clockInline');
const year = document.getElementById('year');
if (year) year.textContent = String(new Date().getFullYear());

const fmt = new Intl.DateTimeFormat('en-GB', {
  hour: '2-digit',
  minute: '2-digit',
  timeZone: 'Asia/Tbilisi',
});

function tick() {
  const t = fmt.format(new Date());
  if (el) el.textContent = t;
  if (inline) inline.textContent = `${t} UTC+4`;
}
tick();
setInterval(tick, 30_000);
