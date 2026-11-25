// Buttons with data-copy put that text on the clipboard and briefly show data-done.
function copyFallback(text: string) {
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.setAttribute('readonly', '');
  ta.style.position = 'fixed';
  ta.style.opacity = '0';
  document.body.appendChild(ta);
  ta.select();
  document.execCommand('copy');
  ta.remove();
}

document.querySelectorAll<HTMLButtonElement>('button[data-copy]').forEach((btn) => {
  const label = btn.textContent ?? '';
  btn.addEventListener('click', async () => {
    const text = btn.dataset.copy ?? '';
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      copyFallback(text);
    }
    btn.textContent = btn.dataset.done ?? 'Copied';
    window.setTimeout(() => (btn.textContent = label), 1800);
  });
});
