import { expect, test } from 'bun:test'
import { createBareClient } from '@tomphttp/bare-client';


test("version 3 Fetching", async() => {
    const client = await createBareClient("http://localhost:3001")

    const res = await client.fetch("https://www.google.com/images/branding/googlelogo/1x/googlelogo_light_color_272x92dp.png", {
        headers: {
            "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 9_0_4; like Mac OS X) AppleWebKit/602.11 (KHTML, like Gecko) Chrome/50.0.2765.331 Mobile Safari/536.5"
        }
    })
    console.log(res.headers)
    expect(await res.status).toBe(200)
})