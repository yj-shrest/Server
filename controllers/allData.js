const puppeteer = require('puppeteer');
const { executablePath } = require("puppeteer");

const puppeteerConfig = {
  launch: {
    // Path to the Chromium executable on your system
    executablePath: executablePath(), 
    headless: false, // Set to false for headful mode
    args: ["--no-sandbox", "--disable-http2"],
  },
};

async function scrapeData() {
  const url = 'https://merolagani.com/LatestMarket.aspx';

  try {
    const browser = await puppeteer.launch({ ...puppeteerConfig });
    const page = await browser.newPage();
    await page.setViewport({
        width: 400,
        height: 600,
        deviceScaleFactor: 1,
      });
    await page.goto(url, { waitUntil: 'domcontentloaded' });

    const stockData = await page.evaluate(() => {
      const rows = Array.from(document.querySelectorAll('.table.live-trading tbody tr'));
      return rows.map(row => {
        const columns = Array.from(row.querySelectorAll('td'));
        return {
          symbol: columns[0].querySelector('a').textContent.trim(),
          ltp: columns[1].textContent.trim(),
          percentChange: columns[2].textContent.trim(),
          open: columns[3].textContent.trim(),
          high: columns[4].textContent.trim(),
          low: columns[5].textContent.trim(),
          quantity: columns[6].textContent.trim(),
          pClose: columns[7].textContent.trim(),
          diff: columns[8].textContent.trim(),
          // Add more properties as needed based on the table structure
        };
      });
    });

    await browser.close();
    return stockData;
  } catch (error) {
    console.error(`Error during scraping: ${error.message}`);
    return null;
  }
}

// Example usage:
// scrapeData()
//   .then(stockData => console.log(stockData))
//   .catch(error => console.error(`Scraping failed: ${error.message}`));

module.exports = { scrapeData };
