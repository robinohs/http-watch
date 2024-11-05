import { encodeHex } from "@std/encoding/hex";
import { SiteData } from "./schemas.ts";

async function hashWebpage(url: string): Promise<string | null> {
    const site_content = await fetch(url);
    if (site_content.status !== 200) {
        console.warn(`Could not get ${url}. Skipping...`);
        return null;
    }
    const body = await site_content.bytes();
    return encodeHex(await crypto.subtle.digest("SHA-256", body));
}

export async function hashWebpages(urls: string[]): Promise<SiteData[]> {
    const new_hashes = [];
    for (const url of urls) {
        const current_hash = await hashWebpage(url);
        if (!current_hash) continue;
        new_hashes.push({
            url: url,
            hash: current_hash,
        });
    }
    return new_hashes;
}
