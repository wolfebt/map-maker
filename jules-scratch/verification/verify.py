from playwright.sync_api import sync_playwright, expect
import os

def run_verification(playwright):
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page()

    # Get the absolute path to the HTML file
    html_file_path = os.path.abspath('index.html')

    # Go to the local HTML file
    page.goto(f'file://{html_file_path}')

    # Wait for the map to generate
    page.wait_for_selector('#mapCanvas')

    # --- Test Custom Terrain ---
    # Open the terrain panel
    page.locator('#terrainHeader').click()

    # Add a custom terrain
    custom_terrain_name_input = page.locator('#customTerrainName')
    expect(custom_terrain_name_input).to_be_visible(timeout=10000)
    custom_terrain_name_input.fill('Lava Rock')
    page.locator('#customTerrainColor').fill('#ff0000')
    page.locator('#addCustomTerrainBtn').click()

    # Select the custom terrain
    lava_rock_swatch = page.locator('div[data-terrain="lava-rock"]')
    expect(lava_rock_swatch).to_be_visible(timeout=10000)
    lava_rock_swatch.click()

    # Paint a hex with the new terrain
    page.locator('#mapCanvas').click(position={'x': 400, 'y': 300})

    # --- Test Custom Object ---
    # Open the object panel
    page.locator('#objectHeader').click()

    # Add a custom object
    custom_object_name_input = page.locator('#customObjectName')
    expect(custom_object_name_input).to_be_visible(timeout=10000)
    custom_object_name_input.fill('Portal')
    page.locator('#customObjectSymbol').fill('🌀')
    page.locator('#addCustomObjectBtn').click()

    # Select the custom object
    portal_swatch = page.locator('div[data-object-key="Custom.portal"]')
    expect(portal_swatch).to_be_visible(timeout=10000)
    portal_swatch.click()

    # Place the custom object
    page.locator('#mapCanvas').click(position={'x': 450, 'y': 300})

    # --- Test Inspector ---
    # Use the inspector tool
    page.locator('#toolInspectorBtn').click()
    page.locator('#mapCanvas').click(position={'x': 400, 'y': 300})

    # Wait for the modal to appear
    modal = page.locator('.modal-backdrop')
    expect(modal).to_be_visible(timeout=10000)

    # Take a screenshot
    page.screenshot(path='jules-scratch/verification/verification.png')

    browser.close()

with sync_playwright() as playwright:
    run_verification(playwright)