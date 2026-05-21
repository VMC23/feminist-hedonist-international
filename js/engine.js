/* ═══════════════════════════════════════════════════════════
   Navigation Engine · Care-Streik 2027
   ═══════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  const slides = Array.from(document.querySelectorAll('.slide'));
  const dotsContainer = document.getElementById('dots');
  let current = 0;

  // Per-slide sub-state handlers: { advance: fn → bool, goBack: fn → bool, enter: fn, leave: fn }
  const handlers = {};

  // ── Build dots ──
  slides.forEach((_, i) => {
    const d = document.createElement('div');
    d.className = 'dot';
    d.addEventListener('click', () => goTo(i));
    dotsContainer.appendChild(d);
  });

  function updateDots() {
    dotsContainer.querySelectorAll('.dot').forEach((d, i) => {
      d.classList.toggle('active', i === current);
    });
  }

  // ── Show / hide slides ──
  function goTo(index, direction) {
    if (index < 0 || index >= slides.length) return;
    const prev = current;
    if (handlers[prev] && handlers[prev].leave) handlers[prev].leave();
    slides[prev].classList.remove('active');
    current = index;
    slides[current].classList.add('active');
    const dir = direction || (index > prev ? 'forward' : 'back');
    if (handlers[current] && handlers[current].enter) handlers[current].enter(dir);
    updateDots();
  }

  function advance() {
    // Try sub-state first
    if (handlers[current] && handlers[current].advance) {
      if (handlers[current].advance()) return; // consumed
    }
    goTo(current + 1);
  }

  function goBack() {
    if (handlers[current] && handlers[current].goBack) {
      if (handlers[current].goBack()) return;
    }
    goTo(current - 1);
  }

  // ── Keyboard ──
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); advance(); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); goBack(); }
  });

  // ── Touch swipe ──
  let touchStartX = 0;
  document.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; });
  document.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 50) { dx < 0 ? advance() : goBack(); }
  });

  // ── Init ──
  slides.forEach((s, i) => { if (i !== 0) s.classList.remove('active'); });
  slides[0].classList.add('active');
  updateDots();

  // ── Public API for slide scripts ──
  window.deckEngine = {
    register(slideIndex, fns) { handlers[slideIndex] = fns; },
    getSlideIndex(el) { return slides.indexOf(el); },
    getCurrent() { return current; },
    getSlides() { return slides; },
    goTo,
  };
})();
