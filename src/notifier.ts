import { NotifierConfig } from "./schemas.ts";

export type Notifier = {
    run: (url: string) => Promise<void>;
};

export function createNotifiers(notifier_config: NotifierConfig): Notifier[] {
    const notifiers: Notifier[] = [];
    console.log(notifier_config);
    if (notifier_config.log || notifier_config.log === null) {
        notifiers.push({
            // deno-lint-ignore require-await
            run: async (url) => {
                console.log(`Content of '${url}' has changed.`);
            },
        });
    }
    return notifiers;
}
