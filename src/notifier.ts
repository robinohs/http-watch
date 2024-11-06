import type { NotifierConfig } from "./schemas.ts";
import { sendMail } from "./mail.ts";

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
    if (notifier_config.mail) {
        const { hostname, from, recipients, port, username, password } =
            notifier_config.mail;
        notifiers.push({
            run: async (url) => {
                const info = await sendMail({
                    hostname,
                    port,
                    username,
                    password,
                    from,
                    recipients,
                    subject: "HTTP-Watch: Page change detected",
                    content: `Content of '${url}' has been changed.`,
                });
                console.log(info);
            },
        });
    }
    return notifiers;
}
