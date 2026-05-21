/* Slide 01 — Title clip reveal + sticker pop */
(function () {
  const el = document.querySelector('[data-slide="1"]');
  const idx = deckEngine.getSlideIndex(el);

  deckEngine.register(idx, {
    enter() {
      const tl = gsap.timeline();
      tl.fromTo(el.querySelector('.kicker'), { opacity: 0, y: -10 }, { opacity: .8, y: 0, duration: .4 })
        .fromTo(el.querySelector('.big'), { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: .8, ease: 'power3.out' }, '-=.1')
        .fromTo(el.querySelectorAll('.sticker-deco'), { scale: 0, rotation: -20 }, { scale: 1, rotation: (i) => i === 0 ? 8 : -12, duration: .5, stagger: .15, ease: 'back.out(2)' }, '-=.3')
        .fromTo(el.querySelector('.foot'), { opacity: 0 }, { opacity: .85, duration: .3 }, '-=.2');
    }
  });
})();
