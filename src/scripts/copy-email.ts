const btn = document.getElementById('copyEmail');
const EMAIL = 'sledyuk@gmail.com';

btn?.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(EMAIL);
  } catch {
    const ta = document.createElement('textarea');
    ta.value = EMAIL;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    ta.remove();
  }
  btn.classList.add('copied');
  setTimeout(() => btn.classList.remove('copied'), 1600);
});
