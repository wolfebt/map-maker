const { test, expect } = require('@playwright/test');
const path = require('path');

test('Graphics Options panel functionality', async ({ page }) => {
  // Navigate to the local HTML file
  const filePath = path.join(__dirname, 'index.html');
  await page.goto(`file://${filePath}`);

  // Expand the terrain panel to ensure its content is visible for the initialization check
  await page.locator('#terrainHeader').click();

  // Wait for the app to be fully initialized by waiting for a dynamic element
  await page.waitForSelector('div[data-terrain="water"]');

  // 1. Find and click the "Graphics Options" button
  const graphicsBtn = page.locator('#graphicsBtn');
  await expect(graphicsBtn).toBeVisible();

  // Click the button to expand the panel
  await graphicsBtn.click();

  // 2. Verify the content of the panel is now visible
  const graphicsContent = page.locator('#graphicsContent');
  await expect(graphicsContent).toBeVisible();

  // 3. Verify specific controls inside the panel
  await expect(page.locator('#layerList')).toBeVisible();
  await expect(page.locator('#addLayerBtn')).toBeVisible();
  await expect(page.locator('#gridColorPicker')).toBeVisible();
  await expect(page.locator('#generateBaseMapBtn')).toBeVisible();

  // 4. Click the button again to collapse
  await graphicsBtn.click();

  // 5. Verify the content is hidden again
  await expect(graphicsContent).not.toBeVisible();
});
