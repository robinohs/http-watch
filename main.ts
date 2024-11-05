import { readCache, readInput, writeSiteHashes } from "./src/data.ts";
import { findSiteDifferences } from "./src/lib.ts";
import { createNotifiers } from "./src/notifier.ts";
import { hashWebpages } from "./src/web.ts";

import { join, resolve } from "@std/path";

const home = Deno.env.get("HOME");
if (!home) {
    console.error("Could not load 'HOME' var from env.");
    Deno.exit(1);
}
const input_path = resolve(home, ".http-watch", "input.yml");
const cache_path = resolve(home, ".http-watch", "cache.yml");
const { sites, notifiers: notifier_config } = await readInput(input_path);
const notifiers = createNotifiers(notifier_config);
const cache = await readCache(cache_path);
const new_hashes = await hashWebpages(sites);
findSiteDifferences(cache, new_hashes, notifiers);
await writeSiteHashes(cache_path, new_hashes);
