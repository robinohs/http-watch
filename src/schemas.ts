import z from "zod";

const notifiers_schema = z.object({
    log: z.null().optional(),
}, { message: "Notifier required" });
export type NotifierConfig = z.infer<typeof notifiers_schema>;

export const input_schema = z.object({
    sites: z.array(z.string().url()),
    notifiers: notifiers_schema,
});
export type Input = z.infer<typeof input_schema>;

const site_schema = z.object({
    url: z.string().url(),
    hash: z.string(),
});
export type SiteData = z.infer<typeof site_schema>;

export const data_schema = z.object({
    sites: z.array(site_schema),
});
