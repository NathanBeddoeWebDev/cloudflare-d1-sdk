import client from "../client";

const d1Client = client({
  accountId: process.env.CLOUDFLARE_ACCOUNT_ID ?? "",
  apiKey: process.env.CLOUDFLARE_API_KEY ?? "",
  apiEmail: process.env.CLOUDFLARE_API_EMAIL ?? "",
  databaseId: process.env.CLOUDFLARE_DATABASE_ID ?? "",
});

d1Client.query("SELECT * FROM textEntries").then((data) => {
  console.log("Query complete", data);
});
