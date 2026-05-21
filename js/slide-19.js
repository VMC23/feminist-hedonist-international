/* Quote entrance — slides 18, 19, 25 */
(function () {
  [19, 20, 25].forEach(n => {
    const el = document.querySelector(`[data-slide="${n}"]`);
    if (!el) return;
    const idx = deckEngine.getSlideIndex(el);
    deckEngine.register(idx, {
      enter() {
        gsap.fromTo(el.querySelector('.q-mark'), { opacity: 0, scale: .5 }, { opacity: .4, scale: 1, duration: .4, ease: 'back.out(2)' });
        gsap.fromTo(el.querySelector('.q'), { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: .6, delay: .2 });
        gsap.fromTo(el.querySelector('.cite'), { opacity: 0 }, { opacity: 1, duration: .3, delay: .7 });
        const stamp = el.querySelector('.stamp');
        if (stamp) gsap.fromTo(stamp, { scale: 0, rotation: -20 }, { scale: 1, rotation: -9, duration: .4, delay: .5, ease: 'back.out(2)' });
      }
    });
  });
})();
