document.addEventListener('DOMContentLoaded', () => {
  const board       = document.getElementById('stickerBoard');
  const stickerBtns = document.querySelectorAll('.sticker-btn');
  const clearBtn    = document.getElementById('clearStickers');
  const hint        = board.querySelector('.sticker-hint');

  let dragTarget = null;
  let offsetX    = 0;
  let offsetY    = 0;

  stickerBtns.forEach(btn => {
    btn.addEventListener('click', () => addSticker(btn.dataset.emoji));
  });

  function addSticker(emoji) {
    if (hint) hint.style.display = 'none';

    const el = document.createElement('div');
    el.classList.add('placed-sticker');
    el.textContent = emoji;

    const boardRect = board.getBoundingClientRect();
    const maxX = boardRect.width  - 50;
    const maxY = boardRect.height - 50;
    el.style.left      = (20 + Math.random() * (maxX - 20)) + 'px';
    el.style.top       = (20 + Math.random() * (maxY - 20)) + 'px';
    el.style.transform = `rotate(${(Math.random() - 0.5) * 30}deg)`;
    el.style.fontSize  = (2 + Math.random() * 1.5) + 'rem';

    board.appendChild(el);
    makeDraggable(el);
  }

  function makeDraggable(el) {
    el.addEventListener('mousedown', e => {
      e.preventDefault();
      dragTarget = el;
      const rect = el.getBoundingClientRect();
      offsetX = e.clientX - rect.left;
      offsetY = e.clientY - rect.top;
      el.style.cursor = 'grabbing';
      el.style.zIndex = 100;
    });

    el.addEventListener('touchstart', e => {
      e.preventDefault();
      dragTarget = el;
      const touch = e.touches[0];
      const rect  = el.getBoundingClientRect();
      offsetX = touch.clientX - rect.left;
      offsetY = touch.clientY - rect.top;
      el.style.zIndex = 100;
    }, { passive: false });
  }

  document.addEventListener('mousemove', e => {
    if (!dragTarget) return;
    move(e.clientX, e.clientY);
  });

  document.addEventListener('touchmove', e => {
    if (!dragTarget) return;
    e.preventDefault();
    move(e.touches[0].clientX, e.touches[0].clientY);
  }, { passive: false });

  function move(cx, cy) {
    const boardRect = board.getBoundingClientRect();
    const x = Math.max(0, Math.min(boardRect.width  - 40, cx - boardRect.left - offsetX));
    const y = Math.max(0, Math.min(boardRect.height - 40, cy - boardRect.top  - offsetY));
    dragTarget.style.left = x + 'px';
    dragTarget.style.top  = y + 'px';
  }

  function stopDrag() {
    if (dragTarget) {
      dragTarget.style.cursor = 'grab';
      dragTarget.style.zIndex = '';
      dragTarget = null;
    }
  }
  document.addEventListener('mouseup',  stopDrag);
  document.addEventListener('touchend', stopDrag);

  clearBtn.addEventListener('click', () => {
    board.querySelectorAll('.placed-sticker').forEach(el => {
      el.style.transition = 'transform 0.3s, opacity 0.3s';
      el.style.transform  = 'scale(0) rotate(45deg)';
      el.style.opacity    = '0';
      setTimeout(() => el.remove(), 300);
    });
    setTimeout(() => { if (hint) hint.style.display = ''; }, 350);
  });
});
