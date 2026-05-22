/* Slide 20 — Step-through demands (one at a time, accumulating) */
(function () {
  const el = document.querySelector('[data-slide="19"]');
  if (!el) return;
  const idx = deckEngine.getSlideIndex(el);
  const items = el.querySelectorAll('.demand-step');
  const dots = el.querySelectorAll('.step-dot');
  let step = -1;
  const total = items.length;

  const head = el.querySelector('.head');

  function showStep(n) {
    if (head) gsap.to(head, { opacity: n >= 0 ? 0 : 1, duration: .3 });
    items.forEach((item, i) => {
      if (i <= n) {
        gsap.to(item, {
          opacity: 1,
          x: 0,
          duration: i === n ? .5 : .2,
          ease: 'power2.out'
        });
      } else {
        gsap.set(item, { opacity: 0, x: '-3vw' });
      }
    });
    dots.forEach((d, i) => {
      d.style.background = i <= n ? 'var(--tinten-schwarz)' : 'transparent';
    });
  }

  deckEngine.register(idx, {
    enter(dir) {
      items.forEach(item => gsap.set(item, { opacity: 0, x: '-3vw' }));
      dots.forEach(d => { d.style.background = 'transparent'; });
      if (head) { gsap.set(head, { opacity: 1 }); gsap.fromTo(head, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: .6, ease: 'power3.out' }); }
      if (dir === 'back') {
        step = total - 1;
        showStep(step);
      } else {
        step = -1;
      }
    },
    advance() {
      if (step < total - 1) {
        step++;
        showStep(step);
        return true;
      }
      return false;
    },
    goBack() {
      if (step > 0) {
        step--;
        showStep(step);
        return true;
      }
      return false;
    },
    leave() {
      step = -1;
      items.forEach(item => gsap.set(item, { opacity: 0, x: '-3vw' }));
    }
  });
})();
