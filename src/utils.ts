export type BareHeaders = Record<string, string | string[]>;
export const nullBodyStatus = [101, 204, 205, 304];

export const forbiddenForwardHeaders: string[] = [
	'connection',
	'transfer-encoding',
	'host',
	'connection',
	'origin',
	'referer',
];

export const forbiddenPassHeaders: string[] = [
	'vary',
	'connection',
	'transfer-encoding',
	'access-control-allow-headers',
	'access-control-allow-methods',
	'access-control-expose-headers',
	'access-control-max-age',
	'access-control-request-headers',
	'access-control-request-method',
];

export const defaultForwardHeaders: string[] = ['accept-encoding', 'accept-language'];


export const defaultPassHeaders: string[] = [
	'content-encoding',
	'content-length',
	'last-modified',
];

// defaults if the client provides a cache key
export const defaultCacheForwardHeaders: string[] = [
	'if-modified-since',
	'if-none-match',
	'cache-control',
];

export const defaultCachePassHeaders: string[] = ['cache-control', 'etag'];

export const cacheNotModified = 304;

export function flattenHeader(value: string | string[]) {
	return Array.isArray(value) ? value.join(', ') : value;
}


export function mapHeadersFromArray(from: string[], to: BareHeaders) {
	for (const header of from) {
		if (header.toLowerCase() in to) {
			const value = to[header.toLowerCase()];
			delete to[header.toLowerCase()];
			to[header] = value;
		}
	}

	return to;
}


export function rawHeaderNames(raw: string[]) {
	const result: string[] = [];

	for (let i = 0; i < raw.length; i += 2) {
		if (!result.includes(raw[i])) result.push(raw[i]);
	}

	return result;
}