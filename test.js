const { test, expect } = require('@playwright/test');
const fs = require('fs');

test('should open graphics options and generate a map', async ({ page }) => {
  const url = 'http://localhost:8000';

  console.log(`Navigating to ${url}`);
  await page.goto(url);

  console.log('Waiting for #graphicsBtn...');
  await page.waitForSelector('#graphicsBtn', { timeout: 5000 });
  console.log('#graphicsBtn found. Clicking...');
  await page.click('#graphicsBtn');

  console.log('Waiting for #generateBaseMapBtn...');
  await page.waitForSelector('#generateBaseMapBtn', { timeout: 5000 });
  console.log('#generateBaseMapBtn found. Clicking...');
  await page.click('#generateBaseMapBtn');

  console.log('Waiting for #modalConfirm...');
  await page.waitForSelector('#modalConfirm', { timeout: 5000 });
  console.log('#modalConfirm found. Clicking...');
  await page.click('#modalConfirm');

  console.log('Taking screenshot...');
  const screenshotPath = 'screenshot.png';
  await page.screenshot({ path: screenshotPath });
  console.log('Screenshot taken.');

  // Verify that the screenshot was created
  expect(fs.existsSync(screenshotPath)).toBe(true);
});
