const puppeteer = require("puppeteer-extra");
const stealth = require("puppeteer-extra-plugin-stealth");


const { executablePath } = require("puppeteer");

const puppeteerConfig = {
  launch: {
    // Path to the Chromium executable on your system
    executablePath: executablePath(), 
    headless: true, // Set to false for headful mode
    args: ["--no-sandbox", "--disable-http2"],
  },
};


let dataObj;
puppeteer.use(stealth());
const scrapeInfo = async (string) => {
  const url = "https://nepsealpha.com/stocks/" + string + "/info";
  const browser = await puppeteer.launch({ ...puppeteerConfig });
  const page = await browser.newPage();
  await page.setViewport({
    width: 400,
    height: 600,
    deviceScaleFactor: 1,
  });
  await page.goto(url);
  // await page.select(".ng-untouched.ng-pristine.ng-valid", 500);
  dataObj = await page.evaluate(() => {
    const full = document.querySelector(".skyblue-bg span").innerText;
    const symbol = full.split("Sector")[0].slice(0, -1);
    const sector = full.split(":")[1].split("\n")[0];

    const price = document
      .querySelector(".skyblue-bg h2")
      .innerText.split(" ")[4];

    // const tds = Array.from(document.querySelectorAll(".cols-md-5 "))
    const tds = Array.from(
      document.querySelectorAll(".col-md-5 .text-bold")
    ).map((el) => el.nextElementSibling.innerText);
    const other = Array.from(
      document.querySelectorAll(".col-md-4 .text-bold")
    ).map((el) => el.nextElementSibling.innerText);
    const relevant = {
      marketCapitalization: tds[0],
      paidUpCapital: tds[1],
      highLow: tds[2],
      EPS_ttm: tds[3],
      EPS_reported: tds[4],
      PE_ratio: tds[5],
      PB_ratio: tds[6],
      ROE_ttm: tds[7],
      bookValue: tds[8],
      promoterHolding: other[6],
      publicHolding: other[7],
    };
    //console.log(full, symbol, sector, price)
    return { symbol, sector, price, relevant };
  });
  await browser.close()
  return dataObj

};


module.exports = {scrapeInfo}