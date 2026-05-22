/* Slide 21 — 4 Ansätze stars step-through (one at a time, big) */
(function () {
  var el = document.querySelector('[data-slide="20"]');
  if (!el) return;
  var idx = deckEngine.getSlideIndex(el);
  var stars = el.querySelectorAll('.star-step');
  var dots = el.querySelectorAll('.step-dot');
  var total = stars.length;
  var step = -1;

  function showStar(n) {
    stars.forEach(function (s, i) {
      if (i === n) {
        gsap.to(s, { opacity: 1, scale: 1, rotation: gsap.utils.random(-8, 8), duration: .6, ease: 'back.out(2)' });
      } else if (i < n) {
        var xOff = -35 + i * 18;
        gsap.to(s, { opacity: .35, scale: .25, x: xOff + 'vw', y: '20vh', rotation: gsap.utils.random(-15, 15), duration: .5, ease: 'power2.inOut' });
      } else {
        gsap.set(s, { opacity: 0, scale: 0 });
      }
    });
    dots.forEach(function (d, i) {
      d.style.background = i <= n ? 'var(--tinten-schwarz)' : 'transparent';
    });
  }

  function hideAll() {
    stars.forEach(function (s) { gsap.set(s, { opacity: 0, scale: 0, x: 0, y: 0 }); });
    dots.forEach(function (d) { d.style.background = 'transparent'; });
  }

  deckEngine.register(idx, {
    enter: function (dir) {
      hideAll();
      var head = el.querySelector('.head');
      if (head) gsap.fromTo(head, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: .6, ease: 'power3.out' });
      if (dir === 'back') {
        step = total - 1;
        showStar(step);
      } else {
        step = -1;
      }
    },
    advance: function () {
      if (step < total - 1) {
        step++;
        showStar(step);
        return true;
      }
      return false;
    },
    goBack: function () {
      if (step > 0) {
        step--;
        showStar(step);
        return true;
      }
      return false;
    },
    leave: function () {
      step = -1;
      hideAll();
    }
  });
})();
