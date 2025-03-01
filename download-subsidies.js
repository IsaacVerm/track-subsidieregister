const { chromium } = require('playwright');

(async () => {
    // Launch browser
    const browser = await chromium.launch({
        headless: true,
        slowMo: 500
    });
    const context = await browser.newContext();
    const page = await context.newPage();

    try {
        // Step 1: Open the website
        await page.goto('https://subsidieregister.vlaanderen.be');
        console.log('Website opened');

        // Step 2: Click the search button
        await page.click('#btn_zoek');
        console.log('Initial search button clicked');

        // Step 3: Accept cookies
        await page.click('#c-p-bn');
        console.log('Cookies accepted');

        // Step 4: Enter "Damme" in the municipality field
        await page.click('#P3_GEMEENTE');
        await page.type('input.a-PopupLOV-search[aria-label="Search"]', 'Damme');
        // await page.fill('#P3_GEMEENTE', 'Damme');
        // await page.click('li[data-id="31006"]');
        await page.keyboard.press('Enter');

        // this didn't work
        // it sets the value of the input field to "Damme"
        // but the website doesn't recognize it
        // await page.$eval('#P3_GEMEENTE', (el, value) => {
        //     el.value = value;
        //     // Trigger events to notify the application
        //     el.dispatchEvent(new Event('input', { bubbles: true }));
        //     el.dispatchEvent(new Event('change', { bubbles: true }));
        // }, 'Damme');
        console.log('Entered "Damme" in the municipality field');

        // Step 5: Click the search button again
        await page.click('#btn_zoek');
        console.log('Search button clicked after entering Damme');

        // Step 6: Click the CSV export button to download
        // https://playwright.dev/docs/downloads
        const downloadPromise = page.waitForEvent('download');
        await page.click('#btn_exporteer_csv');
        console.log('CSV export button clicked, download should start');
        const download = await downloadPromise;
        await download.saveAs('./subsidies-damme.csv');

        // Wait a bit for the download to complete
        await page.waitForTimeout(5000);

    } catch (error) {
        console.error('An error occurred:', error);
    } finally {
        // Close the browser
        await browser.close();
        console.log('Browser closed');
    }
})();