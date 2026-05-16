function initParticles() {
  const container = document.getElementById('particles');
  const colors = ['#ff2d78','#00f0ff','#ffe600','#b14fff','#00ff9d','#ffffff'];
  const emojis = ['✨','🌸','💫','⭐','🎉','🎊','💖','🌟'];
  const total = 28;

  for (let i = 0; i < total; i++) {
    const el = document.createElement('div');
    const useEmoji = Math.random() > 0.55;

    if (useEmoji) {
      el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      el.style.cssText = `
        position: absolute;
        font-size: ${10 + Math.random() * 16}px;
        left: ${Math.random() * 100}%;
        animation: floatUp ${8 + Math.random() * 14}s linear infinite;
        animation-delay: ${-Math.random() * 14}s;
        pointer-events: none;
        z-index: 0;
      `;
    } else {
      el.classList.add('particle');
      const size = 3 + Math.random() * 6;
      el.style.cssText = `
        width:  ${size}px;
        height: ${size}px;
        left:   ${Math.random() * 100}%;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        animation-duration:  ${8 + Math.random() * 14}s;
        animation-delay: ${-Math.random() * 14}s;
        box-shadow: 0 0 ${size * 2}px currentColor;
      `;
    }

    container.appendChild(el);
  }
}
