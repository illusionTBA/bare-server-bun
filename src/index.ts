import { nullBodyStatus, cacheNotModified,   } from "./utils";
const splitHeaderValue = /,\s*/g;
import VersionThree from "./v3";
const Bunserve = Bun.serve({
  port: 3001,
  async fetch(req, server) {
    const url = new URL(req.url);
    console.log(`[?] ${url}`)
    if (url.pathname === "/") {
      Bun.gc(false)

      return new Response(
        JSON.stringify({
          versions: ["v3"],
          language: "Bun",
          memoryUsage:
            Math.round((process.memoryUsage().heapUsed / 1024 / 1024) * 100) /
            100,
          project: {
            name: "bare-server-bun",
            description: "TOMPHTTP Bun Bare Server",
            repository: "https://github.com/illusionTBA/bare-server-bun",
            version: "0.1",
          },
        }),
        {
          headers: {
            "Content-Type": "Application/json",
          },
        }
      );
    }

    if (/^\/v3\/(.*)$/.test(url.pathname)) {
      return await VersionThree(req)
    }
    Bun.gc(true)
    return new Response("Not found");
  },
});

console.log(`[?] BSB Running, visit @ http://localhost:${Bunserve.port}`);
