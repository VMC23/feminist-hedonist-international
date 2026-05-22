/* Definition entrance — slides 6, 12, 15 */
(function () {
  [6, 12, 15].forEach(n => {
    const el = document.querySelector(`[data-slide="${n}"]`);
    if (!el) return;
    const idx = deckEngine.getSlideIndex(el);
    deckEngine.register(idx, {
      enter() {
        const title = el.querySelector('.def-title');
        if (title) gsap.fromTo(title, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: .7, ease: 'power3.out' });
        const text = el.querySelector('.def-text');
        if (text) gsap.fromTo(text, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: .5, delay: .4 });
        const sub = el.querySelector('.def-sub');
        if (sub) gsap.fromTo(sub, { opacity: 0 }, { opacity: 1, duration: .4, delay: .7 });
        const sticker = el.querySelector('.sticker-deco');
        if (sticker) gsap.fromTo(sticker, { scale: 0, rotation: -10 }, { scale: 1, rotation: (gsap.utils.random(-8, 8)), duration: .5, delay: .5, ease: 'back.out(2)' });
        const fn = el.querySelector('.footnote');
        if (fn) gsap.fromTo(fn, { opacity: 0 }, { opacity: .55, duration: .4, delay: .9 });
      }
    });
  });
})();
