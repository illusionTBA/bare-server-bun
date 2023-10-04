import { cacheNotModified, nullBodyStatus, flattenHeader, defaultCachePassHeaders} from "./utils";
const VersionThree = async (req: Request): Promise<Response> => {
  const Bareheaders = req.headers.get("x-bare-headers");
  const Bareurl = req.headers.get("x-bare-url");
  const passHeaders = [...defaultCachePassHeaders]
  if (!Bareurl){
    return new Response(JSON.stringify({}), {
      headers: { "content-type": "application/json" },
    });}

  const request = new Request(`${Bareurl}`);
  const cache = new URL(request.url).searchParams.has("cache");
  const json = JSON.parse(Bareheaders as string) as Record<
    string,
    string | string[]
  >;

  for (const header in json) {
    const value = json[header];

    if (typeof value === "string") {
      request.headers.append(header, value);
    }
  }
  const abort = new AbortController();
  const res = await fetch(request, {
    signal: abort.signal,
  });

  // @ts-ignore
  req.signal.onabort = () => abort.abort();

  const resHeaders = new Headers();

  for (const header of passHeaders) {
    if (!(header in res.headers)) continue;
    console.log(header, flattenHeader(res.headers.get(header)!))
    resHeaders.set(header, flattenHeader(res.headers.get(header)!))
  }
  



  if (res.status !== cacheNotModified) {
    resHeaders.set("x-bare-status", res.status.toString());
    resHeaders.set("x-bare-status-text", res.statusText.toString());
    resHeaders.set("x-bare-headers", JSON.stringify(res.headers));
  }


  let responseBody = await res.blob()
  
  

  

  const responseInit: ResponseInit = {
    status: res.status,
    statusText: res.statusText,
    headers: resHeaders,  
  };
  Bun.gc(true);
  return new Response(
    nullBodyStatus.includes(res.status) ? undefined : responseBody,
    responseInit
  );
};

export default VersionThree;
