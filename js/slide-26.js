/* Slide 28 — Closing title */
(function () {
  const el = document.querySelector('[data-slide="28"]');
  if (!el) return;
  const idx = deckEngine.getSlideIndex(el);
  deckEngine.register(idx, {
    enter() {
      const tl = gsap.timeline();
      tl.fromTo(el.querySelector('.kicker'), { opacity: 0, y: -10 }, { opacity: .8, y: 0, duration: .4 })
        .fromTo(el.querySelector('.big'), { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: .8, ease: 'power3.out' }, '-=.1')
        .fromTo(el.querySelectorAll('.sticker-deco'), { scale: 0 }, { scale: 1, duration: .5, stagger: .15, ease: 'back.out(2)' }, '-=.3');
    }
  });
})();
