import { assert } from "@std/assert/assert";
import type { Notifier } from "./notifier.ts";
import type { SiteData } from "./schemas.ts";

export async function findSiteDifferences(
    old_data: SiteData[],
    new_data: SiteData[],
    notifiers: Notifier[],
) {
    assert(notifiers.length > 0, "No notifiers configured!");
    assert(new_data.length > 0, "No hashes found!");

    for (const { url, hash } of new_data) {
        const old = old_data.find(({ url: old_url }) => old_url === url);
        if (!old || old.hash === hash) continue;
        for (const notifier of notifiers) {
            await notifier.run(url);
        }
    }
}
