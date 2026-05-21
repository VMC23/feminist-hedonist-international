/* Big statement text reveal — slide 21 */
(function () {
  [21].forEach(n => {
    const el = document.querySelector(`[data-slide="${n}"]`);
    if (!el) return;
    const idx = deckEngine.getSlideIndex(el);
    deckEngine.register(idx, {
      enter() {
        const txt = el.querySelector('.big-text');
        if (txt) gsap.fromTo(txt, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 1, ease: 'power3.out' });
        const sticker = el.querySelector('.sticker-deco');
        if (sticker) gsap.fromTo(sticker, { scale: 0 }, { scale: 1, duration: .5, delay: .6, ease: 'back.out(2)' });
      }
    });
  });
})();
