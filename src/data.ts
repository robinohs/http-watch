import { readYML, writeYML } from "./fs.ts";
import { data_schema, Input, input_schema, SiteData } from "./schemas.ts";

export async function readInput(input_path: string): Promise<Input> {
    const input = await input_schema.safeParseAsync(
        await readYML(input_path),
    );
    if (!input.success) {
        console.error(
            "Data in data.yml is invalid.",
            input.error.issues[0].message,
            "at",
            input.error.issues[0].path,
        );
        Deno.exit(1);
    }
    return input.data;
}

export async function readCache(data_path: string): Promise<SiteData[]> {
    const data = await data_schema.safeParseAsync(
        await readYML(data_path),
    );
    let found_hashes: SiteData[] = [];
    if (!data.success) {
        console.error("Data in hashes.yml is invalid. Resetting file.");
    } else {
        found_hashes = data.data.sites;
    }
    return found_hashes;
}

export async function writeSiteHashes(path: string, hashes: SiteData[]) {
    const write_hash = {
        sites: hashes,
    };
    const data = await data_schema.safeParseAsync(write_hash);
    if (!data.success) {
        console.error("New site data to cache is invalid.");
        Deno.exit(1);
    }
    await writeYML(path, data.data);
}
