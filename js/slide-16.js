/* Workshop/discussion slides — 14, 22 */
(function () {
  [14, 22].forEach(n => {
    const el = document.querySelector(`[data-slide="${n}"]`);
    if (!el) return;
    const idx = deckEngine.getSlideIndex(el);
    deckEngine.register(idx, {
      enter() {
        const title = el.querySelector('.workshop-title');
        if (title) gsap.fromTo(title, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: .7, ease: 'power3.out' });
        const instructions = el.querySelector('.workshop-instructions');
        if (instructions) gsap.fromTo(instructions, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: .5, delay: .4 });
        const qr = el.querySelector('.qr-area');
        if (qr) gsap.fromTo(qr, { opacity: 0, scale: .8 }, { opacity: 1, scale: 1, duration: .5, delay: .6, ease: 'back.out(1.5)' });
        const sticker = el.querySelector('.sticker-deco');
        if (sticker) gsap.fromTo(sticker, { scale: 0 }, { scale: 1, duration: .4, delay: .5, ease: 'back.out(2)' });
      }
    });
  });
})();
