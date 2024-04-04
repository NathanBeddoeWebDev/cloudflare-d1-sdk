import client from '../client'

const d1Client = client({
    accountId: process.env.CLOUDFLARE_ACCOUNT_ID ?? "",
    apiKey: process.env.CLOUDFLARE_API_KEY ?? "",
    apiEmail: process.env.CLOUDFLARE_API_EMAIL ?? "",
    databaseId: process.env.CLOUDFLARE_DATABASE_ID ?? ""
})

console.log(await d1Client.listDatabases());