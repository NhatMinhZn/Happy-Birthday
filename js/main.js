document.addEventListener('DOMContentLoaded', () => {
  const envelope      = document.getElementById('envelope');
  const introScreen   = document.getElementById('intro-screen');
  const mainPage      = document.getElementById('main-page');
  const scrollDownBtn = document.getElementById('scrollDown');
  const introHint     = document.getElementById('introHint');

  envelope.addEventListener('click', () => {
    if (envelope.classList.contains('opened')) return;

    envelope.classList.add('opened');
    introHint.textContent = '✨ Đang mở...';

    setTimeout(() => {
      introScreen.classList.add('fade-out');
      setTimeout(() => {
        introScreen.style.display = 'none';
        mainPage.classList.remove('hidden');
        if (typeof launchConfetti === 'function') launchConfetti(80);
        if (typeof initParticles === 'function') initParticles();
      }, 800);
    }, 1400);
  });

  scrollDownBtn.addEventListener('click', () => {
    document.getElementById('giftsSection').scrollIntoView({ behavior: 'smooth' });
  });
});
