/* Slide 02 — Multi-phase step-through:
   Phase 1: Logos accumulate in random order (9 clicks)
   Phase 2: Stars one-at-a-time (3 clicks)
   Phase 3: 1991 text card (1 click)
   Phase 4: 1991 images one-at-a-time (2 clicks)
   Phase 5: 2019 images one-at-a-time (4 clicks) */
(function () {
  var el = document.querySelector('[data-slide="2"]');
  if (!el) return;
  var idx = deckEngine.getSlideIndex(el);

  var logos = el.querySelectorAll('.logo-item');
  var logoField = el.querySelector('.logo-field');
  var text1991El = el.querySelector('.phase-text-1991');
  var phase1991 = el.querySelector('.phase-1991');
  var phase2019 = el.querySelector('.phase-2019');
  var imgs1991 = el.querySelectorAll('.img-1991');
  var imgs2019 = el.querySelectorAll('.img-2019');
  var stars = el.querySelectorAll('.star-step');
  var dots = el.querySelectorAll('.step-dot');

  var totalLogos = logos.length;
  var starStart = totalLogos;
  var totalStars = stars.length;
  var text1991Step = starStart + totalStars;
  var img1991Start = text1991Step + 1;
  var totalImgs1991 = imgs1991.length;
  var img2019Start = img1991Start + totalImgs1991;
  var totalImgs2019 = imgs2019.length;
  var totalSteps = img2019Start + totalImgs2019;

  var step = -1;

  /* Shuffle logo appearance order */
  var logoOrder = [];
  for (var i = 0; i < totalLogos; i++) logoOrder.push(i);
  function shuffle(arr) {
    for (var j = arr.length - 1; j > 0; j--) {
      var k = Math.floor(Math.random() * (j + 1));
      var tmp = arr[j]; arr[j] = arr[k]; arr[k] = tmp;
    }
  }
  function resetLogoOrder() { shuffle(logoOrder); }

  function hideAll() {
    gsap.set(logoField, { opacity: 1 });
    logos.forEach(function (l) { gsap.set(l, { opacity: 0, scale: .5 }); });
    gsap.set(text1991El, { opacity: 0, pointerEvents: 'none' });
    gsap.set(phase1991, { opacity: 0, pointerEvents: 'none' });
    gsap.set(phase2019, { opacity: 0, pointerEvents: 'none' });
    imgs1991.forEach(function (im) { gsap.set(im, { opacity: 0 }); });
    imgs2019.forEach(function (im) { gsap.set(im, { opacity: 0 }); });
    stars.forEach(function (s) { gsap.set(s, { opacity: 0, scale: 0, x: 0, y: 0 }); });
    dots.forEach(function (d) { d.style.background = 'transparent'; });
  }

  function hideOtherPhases(keep) {
    if (keep !== 'logos') gsap.to(logoField, { opacity: 0, duration: .2 });
    if (keep !== 'text1991') gsap.set(text1991El, { opacity: 0, pointerEvents: 'none' });
    if (keep !== '1991') { gsap.set(phase1991, { opacity: 0, pointerEvents: 'none' }); imgs1991.forEach(function (im) { gsap.set(im, { opacity: 0 }); }); }
    if (keep !== '2019') { gsap.set(phase2019, { opacity: 0, pointerEvents: 'none' }); imgs2019.forEach(function (im) { gsap.set(im, { opacity: 0 }); }); }
    if (keep !== 'stars') {
      stars.forEach(function (s) { gsap.set(s, { opacity: 0, scale: 0, x: 0, y: 0 }); });
      dots.forEach(function (d) { d.style.background = 'transparent'; });
    }
  }

  function showLogos(upToStep) {
    hideOtherPhases('logos');
    gsap.set(logoField, { opacity: 1 });
    var shownSet = {};
    for (var i = 0; i <= upToStep; i++) shownSet[logoOrder[i]] = true;
    logos.forEach(function (l, idx) {
      if (shownSet[idx]) {
        gsap.to(l, { opacity: 1, scale: 1, duration: .45, ease: 'back.out(1.8)' });
      } else {
        gsap.set(l, { opacity: 0, scale: .5 });
      }
    });
  }

  function showStar(n) {
    hideOtherPhases('stars');
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
      d.style.background = i <= n ? 'var(--wissen-cream)' : 'transparent';
    });
  }

  function showText1991() {
    hideOtherPhases('text1991');
    gsap.set(text1991El, { pointerEvents: 'auto' });
    gsap.fromTo(text1991El, { opacity: 0 }, { opacity: 1, duration: .5, ease: 'power2.out' });
  }

  function showImgPhase(phaseEl, imgs, imgIdx) {
    hideOtherPhases(phaseEl === phase1991 ? '1991' : '2019');
    gsap.set(phaseEl, { opacity: 1, pointerEvents: 'auto' });
    imgs.forEach(function (im, i) {
      if (i === imgIdx) {
        gsap.fromTo(im, { opacity: 0 }, { opacity: 1, duration: .5, ease: 'power2.out' });
      } else {
        gsap.set(im, { opacity: 0 });
      }
    });
  }

  function renderStep(s) {
    if (s >= 0 && s < totalLogos) {
      showLogos(s);
    } else if (s >= starStart && s < text1991Step) {
      showStar(s - starStart);
    } else if (s === text1991Step) {
      showText1991();
    } else if (s >= img1991Start && s < img2019Start) {
      showImgPhase(phase1991, imgs1991, s - img1991Start);
    } else if (s >= img2019Start && s < totalSteps) {
      showImgPhase(phase2019, imgs2019, s - img2019Start);
    }
  }

  deckEngine.register(idx, {
    enter: function (dir) {
      hideAll();
      resetLogoOrder();
      var head = el.querySelector('.head');
      if (head) gsap.fromTo(head, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: .6, ease: 'power3.out' });
      if (dir === 'back') {
        step = totalSteps - 1;
        renderStep(step);
      } else {
        step = -1;
      }
    },
    advance: function () {
      if (step < totalSteps - 1) {
        step++;
        renderStep(step);
        return true;
      }
      return false;
    },
    goBack: function () {
      if (step > 0) {
        step--;
        renderStep(step);
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
