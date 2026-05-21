/* Stat slides — entrance animations */
(function () {
  /* All s-stat slides: 4, 5, 7, 11 */
  [5, 6, 8, 12].forEach(n => {
    const el = document.querySelector(`[data-slide="${n}"]`);
    if (!el) return;
    const idx = deckEngine.getSlideIndex(el);

    deckEngine.register(idx, {
      enter() {
        const numEl = el.querySelector('.num');
        if (numEl) gsap.fromTo(numEl, { opacity: 0, scale: .8 }, { opacity: 1, scale: 1, duration: .6, ease: 'back.out(1.5)' });
        const desc = el.querySelector('.desc');
        if (desc) gsap.fromTo(desc, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: .5, delay: .4 });
        const scribble = el.querySelector('.scribble');
        if (scribble) gsap.fromTo(scribble, { opacity: 0, rotation: -12 }, { opacity: 1, rotation: -6, duration: .5, delay: .7 });
        const fn = el.querySelector('.footnote');
        if (fn) gsap.fromTo(fn, { opacity: 0 }, { opacity: .55, duration: .4, delay: .9 });
        const sticker = el.querySelector('.sticker-float');
        if (sticker) gsap.fromTo(sticker, { scale: 0 }, { scale: 1, duration: .4, delay: .5, ease: 'back.out(2)' });
      }
    });
  });
})();
