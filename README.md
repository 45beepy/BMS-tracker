
# 🎬 BookMyShow PVR Theatre Watcher Bot

This Node.js bot watches the [BookMyShow Thug Life booking page](https://in.bookmyshow.com/movies/pondicherry/thug-life/buytickets/ET00375421/20250605) and sends a **Discord alert** when **PVR** is listed as a theatre.

## 🔔 What It Does

- Checks if **PVR** appears on the BookMyShow listing page for **Thug Life** in Pondicherry (June 5, 2025).
- Sends a notification to a specified **Discord webhook** when PVR is listed.
- Sends a status message every 2 minutes if PVR is not listed.
- Uses Puppeteer Stealth to avoid being blocked.

---

## 🚀 Setup Instructions

### 1. Clone this Repo or Create a Replit

> You can run this project locally or on [Replit](https://replit.com) for free.

### 2. Install Dependencies

\`\`\`bash
npm install puppeteer-extra puppeteer-extra-plugin-stealth axios express
\`\`\`

> Puppeteer will auto-download Chromium.

---

### 3. Configure Your Discord Webhook

Create a Discord webhook and copy the URL.

In \`index.js\`, replace:

\`\`\`js
const DISCORD_WEBHOOK = 'YOUR_DISCORD_WEBHOOK_URL';
\`\`\`

with your webhook URL.

---

### 4. Run the Bot

\`\`\`bash
node index.js
\`\`\`

---

## 💡 How It Works

- The bot uses \`puppeteer-extra\` with the stealth plugin to scrape the BookMyShow page.
- It matches the text \`pvr\` (case insensitive) in the HTML.
- If found, it sends a **one-time alert**.
- If not found, it sends a "not listed" status every 2 minutes.

---

## 📸 Example Discord Alerts

**When PVR is listed:**
\`\`\`
🎉 PVR is now listed for Thug Life at Pondicherry on June 5, 2025!
🎟️ Book now: https://in.bookmyshow.com/movies/pondicherry/thug-life/buytickets/ET00375421/20250605
\`\`\`

**If not listed yet:**
\`\`\`
🔍 PVR is not available yet for Thug Life at Pondicherry on June 5.
Checked at 7:02:01 PM.
\`\`\`

---

## 🛠 Dependencies

- puppeteer-extra
- puppeteer-extra-plugin-stealth
- axios
- express

---

## 🧠 Notes

- Make sure to keep the script running to continue monitoring.
- You can deploy this bot on free services like **Replit**, **Render**, or your own server.
- Avoid frequent scraping to prevent IP blocks from BookMyShow.

---

Let me know if you'd like a **button to auto-deploy this on Replit** or **GitHub repo setup help**!
