import { ensureFile } from "@std/fs/ensure-file";
import { parse, stringify } from "@std/yaml";

export async function readYML(path: string): Promise<unknown> {
    await ensureFile(path);
    const decoder = new TextDecoder("utf-8");
    const content_raw = await Deno.readFile(path);
    const content = decoder.decode(content_raw);
    return parse(content);
}

export async function writeYML(path: string, data: unknown) {
    await ensureFile(path);
    const content = stringify(data);
    const encoder = new TextEncoder();
    const content_raw = encoder.encode(content);
    await Deno.writeFile(path, content_raw);
}
