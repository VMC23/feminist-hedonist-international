/* Star-card animations for all argument slides with star-field */
(function () {
  const wobblePatterns = [
    { rot: 4, y: 5, dur: 2.8 },
    { rot: -3, y: -6, dur: 3.2 },
    { rot: 5, y: 4, dur: 2.5 },
    { rot: -6, y: -4, dur: 3.6 },
    { rot: 3, y: 7, dur: 2.9 },
    { rot: -4, y: -5, dur: 3.1 },
    { rot: 6, y: 3, dur: 2.6 },
    { rot: -5, y: 6, dur: 3.4 },
    { rot: 4, y: -3, dur: 2.7 },
    { rot: -3, y: 5, dur: 3.3 },
    { rot: 5, y: -4, dur: 2.4 },
    { rot: -6, y: 3, dur: 3.0 },
  ];

  const entranceRotations = [-35, 25, -45, 30, -20, 40, -30, 35, -25, 45, -40, 20];

  /* Slides with star-field layout */
  const argSlideNums = [10, 13, 14, 24];
  let patternIdx = 0;

  argSlideNums.forEach(n => {
    const el = document.querySelector(`[data-slide="${n}"]`);
    if (!el) return;
    const idx = deckEngine.getSlideIndex(el);
    const stars = el.querySelectorAll('.star-card');
    const head = el.querySelector('.head');

    const starPatterns = [];
    stars.forEach(() => {
      starPatterns.push(patternIdx % wobblePatterns.length);
      patternIdx++;
    });

    let wobbleTweens = [];

    deckEngine.register(idx, {
      enter() {
        if (head) {
          gsap.fromTo(head,
            { clipPath: 'inset(0 100% 0 0)' },
            { clipPath: 'inset(0 0% 0 0)', duration: .6, ease: 'power3.out' }
          );
        }

        stars.forEach((star, i) => {
          const pi = starPatterns[i];
          const wp = wobblePatterns[pi];
          const entryRot = entranceRotations[pi];

          gsap.fromTo(star,
            { opacity: 0, scale: 0, rotation: entryRot },
            {
              opacity: 1, scale: 1, rotation: 0,
              duration: .7,
              delay: .25 + i * .18,
              ease: 'back.out(2.5)',
              onComplete() {
                const t = gsap.to(star, {
                  rotation: wp.rot,
                  y: '+=' + wp.y,
                  duration: wp.dur,
                  ease: 'sine.inOut',
                  yoyo: true,
                  repeat: -1
                });
                wobbleTweens.push(t);
              }
            }
          );
        });
      },

      leave() {
        wobbleTweens.forEach(t => t.kill());
        wobbleTweens = [];
        stars.forEach(star => {
          gsap.set(star, { opacity: 0, scale: 0, rotation: 0, y: 0 });
        });
      }
    });
  });
})();
