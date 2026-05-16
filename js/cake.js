document.addEventListener('DOMContentLoaded', () => {
  const blowBtn = document.getElementById('blowBtn');
  const cakeMsg = document.getElementById('cakeMsg');
  const flames  = document.querySelectorAll('.flame');
  let blown = false;

  const messages = [
    '🎉 Ước gì cũng thành hiện thực nhé!',
    '💨 Pffff... Nến tắt rồi! Hạnh phúc mãi mãi! 🥰',
    '✨ Điều ước đã được gửi lên các vì sao!',
    '🌟 Tuổi mới thật nhiều điều tuyệt vời đang chờ!',
  ];

  function relightFlame(f) {
    f.removeAttribute('style');
    void f.offsetWidth;
    f.style.animation = 'flicker 0.3s ease-in-out infinite alternate';
  }

  blowBtn.addEventListener('click', () => {
    if (blown) {
      blown = false;
      blowBtn.textContent = '💨 Thổi nến!';
      cakeMsg.textContent = '🕯️ Nến đã được thắp lại!';
      flames.forEach((f, i) => setTimeout(() => relightFlame(f), i * 120));
      return;
    }

    blown = true;
    blowBtn.textContent = '🕯️ Thắp lại nến';

    flames.forEach((f, i) => {
      setTimeout(() => {
        f.style.animation  = 'none';
        f.style.transition = 'transform 0.2s, opacity 0.3s';
        f.style.transform  = 'translateX(-50%) scaleX(2) scaleY(0.3)';
        f.style.opacity    = '0.5';
        setTimeout(() => {
          f.style.opacity   = '0';
          f.style.transform = 'translateX(-50%) scale(0)';
        }, 150);
      }, i * 180);
    });

    setTimeout(() => {
      const msg = messages[Math.floor(Math.random() * messages.length)];
      cakeMsg.textContent  = msg;
      cakeMsg.style.animation = 'none';
      void cakeMsg.offsetWidth;
      cakeMsg.style.animation = 'popIn 0.4s ease';
      if (typeof launchConfetti === 'function') launchConfetti(120);
    }, flames.length * 180 + 400);
  });
});
