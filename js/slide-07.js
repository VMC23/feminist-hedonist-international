/* CTA entrance — slides 7, 15 */
(function () {
  [8, 16].forEach(n => {
    const el = document.querySelector(`[data-slide="${n}"]`);
    if (!el) return;
    const idx = deckEngine.getSlideIndex(el);
    deckEngine.register(idx, {
      enter() {
        const title = el.querySelector('.cta-title');
        if (title) gsap.fromTo(title, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: .8, ease: 'power3.out' });
        const sub = el.querySelector('.cta-sub');
        if (sub) gsap.fromTo(sub, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: .4, delay: .5 });
        const detail = el.querySelector('.cta-detail');
        if (detail) gsap.fromTo(detail, { opacity: 0 }, { opacity: 1, duration: .4, delay: .7 });
        const sticker = el.querySelector('.sticker-deco');
        if (sticker) gsap.fromTo(sticker, { scale: 0, rotation: -15 }, { scale: 1, rotation: 12, duration: .5, delay: .4, ease: 'back.out(2)' });
        const contacts = el.querySelectorAll('.contact-item');
        if (contacts.length) gsap.fromTo(contacts, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: .4, stagger: .1, delay: .5 });
      }
    });
  });
})();
