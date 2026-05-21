/* Slide 06 — Step-through stars (one at a time) */
(function () {
  const el = document.querySelector('[data-slide="6"]');
  if (!el) return;
  const idx = deckEngine.getSlideIndex(el);
  const stars = el.querySelectorAll('.star-step');
  const dots = el.querySelectorAll('.step-dot');
  const floatTags = el.querySelectorAll('.float-tag');
  let step = -1;
  const total = stars.length;

  function showStep(n) {
    stars.forEach((s, i) => {
      if (i === n) {
        gsap.to(s, { opacity: 1, scale: 1, rotation: gsap.utils.random(-8, 8), duration: .6, ease: 'back.out(2)' });
      } else if (i < n) {
        /* shrink previous to corner */
        const xOff = -35 + i * 18;
        gsap.to(s, { opacity: .35, scale: .25, x: xOff + 'vw', y: '20vh', rotation: gsap.utils.random(-15, 15), duration: .5, ease: 'power2.inOut' });
      } else {
        gsap.set(s, { opacity: 0, scale: 0 });
      }
    });
    dots.forEach((d, i) => {
      d.style.background = i <= n ? 'var(--tinten-schwarz)' : 'transparent';
    });
    /* Animate float-tags for their matching step */
    floatTags.forEach(tag => {
      const tagStep = parseInt(tag.dataset.step, 10);
      if (tagStep === n) {
        gsap.to(tag, { opacity: 1, duration: .5, delay: .3 + Math.random() * .3, ease: 'power2.out' });
      } else {
        gsap.to(tag, { opacity: 0, duration: .3, ease: 'power2.in' });
      }
    });
  }

  deckEngine.register(idx, {
    enter(dir) {
      stars.forEach(s => gsap.set(s, { opacity: 0, scale: 0, x: 0, y: 0 }));
      dots.forEach(d => { d.style.background = 'transparent'; });
      floatTags.forEach(tag => gsap.set(tag, { opacity: 0 }));
      const head = el.querySelector('.head');
      if (head) gsap.fromTo(head, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: .6, ease: 'power3.out' });
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
        return true; /* consumed */
      }
      return false; /* let engine go to next slide */
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
      stars.forEach(s => gsap.set(s, { opacity: 0, scale: 0, x: 0, y: 0 }));
      floatTags.forEach(tag => gsap.set(tag, { opacity: 0 }));
    }
  });
})();
