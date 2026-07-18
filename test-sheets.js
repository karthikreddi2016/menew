// Verify Google Sheets contents
require('dotenv').config({ path: '.env.local' });
const { google } = require('googleapis');

async function verify() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });

  const sheets = google.sheets({ version: 'v4', auth });
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: 'Sheet1!A:B',
  });

  console.log("📋 Google Sheet Contents:");
  console.log("========================");
  if (res.data.values) {
    res.data.values.forEach((row, i) => {
      console.log(`Row ${i + 1}: ${row[0]} | ${row[1] || ''}`);
    });
  } else {
    console.log("(empty)");
  }
}

verify().catch(e => console.error("Error:", e.message));
