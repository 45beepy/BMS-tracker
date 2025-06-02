const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const axios = require('axios');
const express = require('express');

puppeteer.use(StealthPlugin());

const app = express();

const URL = 'https://in.bookmyshow.com/movies/pondicherry/thug-life/buytickets/ET00375421/20250605';
const DISCORD_WEBHOOK = 'your_webhook';
const THEATRE_KEYWORD = 'providence'; 

let notified = false;

app.get('/', (req, res) => {
  res.send('🎬 BookMyShow Watcher for Thug Life - PVR alert bot is alive!');
});
app.listen(3000, () => {
  console.log('✅ Express keep-alive server started on port 3000');
});

async function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function checkForTheatre() {
  console.log(`\n🔄 Checking theatres at ${new Date().toLocaleString()}`);

  let browser;
  try {
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();

    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) ' +
      'AppleWebKit/537.36 (KHTML, like Gecko) ' +
      'Chrome/114.0.0.0 Safari/537.36'
    );

    await page.setExtraHTTPHeaders({
      'Accept-Language': 'en-US,en;q=0.9',
      'Referer': 'https://in.bookmyshow.com/',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8'
    });

    await page.goto(URL, { waitUntil: 'networkidle2' });

    await delay(2000 + Math.random() * 3000);

    const content = await page.content();

    const theatreFound = content.toLowerCase().includes(THEATRE_KEYWORD);

    if (theatreFound && !notified) {
      console.log(`🎯 "${THEATRE_KEYWORD}" FOUND! Sending alert to Discord...`);
      await axios.post(DISCORD_WEBHOOK, {
        content: `🎉 *${THEATRE_KEYWORD.toUpperCase()}* is now listed for *Thug Life* at Pondicherry on June 5, 2025!\n🎟️ Book now: ${URL}`
      });
      notified = true;
    } else if (!theatreFound) {
      console.log(`❌ "${THEATRE_KEYWORD}" not listed yet. Sending check-in...`);
      await axios.post(DISCORD_WEBHOOK, {
        content: `🔍 *${THEATRE_KEYWORD.toUpperCase()}* is **not available** yet for Thug Life at Pondicherry on June 5.\nChecked at ${new Date().toLocaleTimeString()}.`
      });
    } else {
      console.log('✅ Already notified. No repeat alert sent.');
    }
  } catch (err) {
    console.error('🚨 Error during check:', err.message);
    try {
      await axios.post(DISCORD_WEBHOOK, {
        content: `🚨 Error while checking theatres: ${err.message}`
      });
    } catch {}
  } finally {
    if (browser) await browser.close();
  }
}

console.log('🚀 Bot started. Watching for PVR listing for Thug Life every 2 minutes...');
checkForTheatre();
setInterval(checkForTheatre, 2 * 60 * 1000);
