/* Column-based argument slides — 21 (CH vs DE comparison) */
(function () {
  [22].forEach(n => {
    const el = document.querySelector(`[data-slide="${n}"]`);
    if (!el) return;
    const idx = deckEngine.getSlideIndex(el);
    deckEngine.register(idx, {
      enter() {
        const head = el.querySelector('.head');
        if (head) gsap.fromTo(head, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: .6, ease: 'power3.out' });
        const cols = el.querySelectorAll('.col');
        gsap.fromTo(cols, { opacity: 0, visibility: 'hidden', y: 30 }, { opacity: 1, visibility: 'visible', y: 0, duration: .5, stagger: .12, delay: .3, ease: 'power2.out' });
        const fn = el.querySelector('.footnote');
        if (fn) gsap.fromTo(fn, { opacity: 0 }, { opacity: .55, duration: .4, delay: 1 });
      },
      leave() {
        const cols = el.querySelectorAll('.col');
        gsap.set(cols, { opacity: 0, visibility: 'hidden', y: 30 });
      }
    });
  });
})();
