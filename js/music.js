document.addEventListener('DOMContentLoaded', () => {
  const audio     = document.getElementById('bgMusic');
  const btn       = document.getElementById('musicBtn');
  const icon      = btn.querySelector('.music-icon');
  const label     = btn.querySelector('.music-label');
  let playing = false;

  audio.volume = 0.45;

  function play() {
    audio.play().then(() => {
      playing = true;
      btn.classList.add('playing');
      icon.textContent  = '🎶';
      label.textContent = 'Đang phát';
    }).catch(() => {});
  }

  function pause() {
    audio.pause();
    playing = false;
    btn.classList.remove('playing');
    icon.textContent  = '🎵';
    label.textContent = 'Nhạc';
  }

  btn.addEventListener('click', () => playing ? pause() : play());

  document.addEventListener('click', function autoplay() {
    if (!playing) play();
    document.removeEventListener('click', autoplay);
  }, { once: true });
});
