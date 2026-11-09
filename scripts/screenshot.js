const { chromium } = require('playwright-core');
const [,, url, outDir] = process.argv;
(async () => {
  const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
  const sizes = [['desktop', 1440, 900, false], ['mobile', 375, 812, true]];
  for (const [name, w, h, mobile] of sizes) {
    const page = await browser.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 1, isMobile: mobile, hasTouch: mobile });
    await page.goto(url, { waitUntil: 'networkidle' });
    const total = await page.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < total; y += h / 2) { await page.evaluate((y) => window.scrollTo(0, y), y); await page.waitForTimeout(120); }
    await page.evaluate(() => window.scrollTo(0, 0)); await page.waitForTimeout(900);
    const sw = await page.evaluate(() => [document.documentElement.scrollWidth, window.innerWidth]);
    console.log(name, 'scrollWidth/innerWidth', sw.join('/'), 'height', total);
    if (sw[0] > sw[1]) {
      const wide = await page.evaluate(() => [...document.querySelectorAll('body *')].filter(e => e.getBoundingClientRect().right > window.innerWidth + 1).slice(0, 8).map(e => e.tagName + '.' + e.className + ' ' + Math.round(e.getBoundingClientRect().right)));
      console.log('overflowing:', wide);
    }
    await page.screenshot({ path: `${outDir}/${name}.png`, fullPage: true });
    await page.close();
  }
  await browser.close();
})();
