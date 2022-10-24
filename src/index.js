// Set up headless browser
import { addDays, format, isEqual } from "date-fns";
import puppeteer from "puppeteer";

const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.setViewport({ width: 1920, height: 1080 });

async function captureDateRange(begin, end) {
  await page.goto(
    `https://liveuamap.com/en/time/${format(begin, "dd.MM.yyyy")}`
  );
  await page.addStyleTag({
    content: ".leaflet-marker-icon{display: none !important;}",
  });
  await page.screenshot({ path: `data/${format(begin, "yyyy-MM-dd")}.png` });
  if (!isEqual(begin, end)) {
    captureDateRange(addDays(begin, 1), end);
  }
}

await captureDateRange(new Date(2022, 1, 1), new Date(2022, 10, 24));
