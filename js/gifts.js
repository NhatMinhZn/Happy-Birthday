document.addEventListener('DOMContentLoaded', () => {
  const giftCards = document.querySelectorAll('.gift-card');

  giftCards.forEach(card => {
    card.addEventListener('click', () => {
      if (card.classList.contains('opened')) {
        card.classList.remove('opened');
        return;
      }

      card.style.animation = 'none';
      card.classList.add('shaking');
      setTimeout(() => {
        card.classList.remove('shaking');
        card.classList.add('opened');
        if (typeof launchConfetti === 'function') launchConfetti(30);
      }, 400);
    });
  });
});

// Add shaking keyframe dynamically
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
  .shaking {
    animation: shakeGift 0.4s ease !important;
  }
  @keyframes shakeGift {
    0%,100% { transform: rotate(0deg) scale(1); }
    20%     { transform: rotate(-6deg) scale(1.05); }
    40%     { transform: rotate(6deg)  scale(1.05); }
    60%     { transform: rotate(-4deg) scale(1.03); }
    80%     { transform: rotate(4deg)  scale(1.03); }
  }
`;
document.head.appendChild(shakeStyle);
