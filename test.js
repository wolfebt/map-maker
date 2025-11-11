
const { chromium } = require('playwright-chromium');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const filePath = path.join(__dirname, 'index.html');
  const url = 'file://' + filePath;

  console.log(`Navigating to ${url}`);
  await page.goto(url);

  // Wait for the graphics options button and click it to reveal the generate map button
  await page.waitForSelector('#graphicsBtn');
  await page.click('#graphicsBtn');

  await page.waitForSelector('#generateBaseMapBtn');
  await page.click('#generateBaseMapBtn');

  // Wait for the modal and click confirm
  await page.waitForSelector('#modalConfirm');
  await page.click('#modalConfirm');

  await page.screenshot({ path: 'screenshot.png' });

  await browser.close();
})();
