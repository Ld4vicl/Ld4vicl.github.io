document.addEventListener('DOMContentLoaded', () => {
  const pre = document.querySelector('pre');
  if (!pre) return;
  const text = pre.textContent;
  pre.textContent = '';
  let i = 0;
  function type() {
    if (i < text.length) {
      pre.textContent += text[i];
      i++;
      setTimeout(type, 2); // Fast, but visible
    }
  }
  type();
}); 