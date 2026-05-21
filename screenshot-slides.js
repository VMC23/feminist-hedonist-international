const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 2 });

  const filePath = 'file://' + path.resolve('presentation.html');
  await page.goto(filePath, { waitUntil: 'networkidle0', timeout: 30000 });

  // Wait for fonts to load
  await page.evaluate(() => document.fonts.ready);
  await new Promise(r => setTimeout(r, 2000));

  const slideCount = await page.evaluate(() =>
    document.querySelectorAll('.slide').length
  );
  console.log(`Found ${slideCount} slides`);

  // Screenshot slide 0 first (already active with enter() called by init)
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: path.resolve('slide-images/slide-01.png'), type: 'png' });
  console.log('✔ slide-01.png');

  for (let i = 1; i < slideCount; i++) {
    // Use the engine's goTo to properly trigger enter/leave handlers + GSAP
    await page.evaluate((idx) => {
      window.deckEngine.goTo(idx);
    }, i);

    // Wait for GSAP animations to complete
    await new Promise(r => setTimeout(r, 2500));

    const num = String(i + 1).padStart(2, '0');
    const outPath = path.resolve(`slide-images/slide-${num}.png`);
    await page.screenshot({ path: outPath, type: 'png' });
    console.log(`✔ slide-${num}.png`);
  }

  await browser.close();
  console.log(`\nDone — ${slideCount} slides saved to slide-images/`);
})();
