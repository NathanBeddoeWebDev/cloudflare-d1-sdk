import client from '../client'

const d1Client = client({
    accountId: process.env.CLOUDFLARE_ACCOUNT_ID ?? "",
    apiKey: process.env.CLOUDFLARE_API_KEY ?? "",
    apiEmail: process.env.CLOUDFLARE_API_EMAIL ?? "",
    databaseId: process.env.CLOUDFLARE_DATABASE_ID ?? ""
})

console.log(process.env.CLOUDFLARE_DATABASE_ID)


const query = await d1Client.queryDatabase("SELECT * FROM test")

// run query 1000 times
for (let i = 0; i < 1000; i++) {
    // get current ime
    const start = Date.now()
    d1Client.queryDatabase("SELECT * FROM textEntries").then(() => {
        console.log("Query complete")
    })
    const end = Date.now()
}