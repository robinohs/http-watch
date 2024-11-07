import { assert } from "@std/assert/assert";
import type { NotifierConfig } from "./schemas.ts";
import { Telegraf } from "telegraf";
export type Notifier = {
    run: (url: string) => Promise<void>;
};

export function createNotifiers(notifier_config: NotifierConfig): Notifier[] {
    const notifiers: Notifier[] = [];
    if (notifier_config.log) {
        notifiers.push({
            run: createLogNotifier(notifier_config),
        });
    }
    if (notifier_config.telegram) {
        notifiers.push({
            run: createTelegramNotifier(notifier_config),
        });
    }
    return notifiers;
}

function createLogNotifier(
    config: NotifierConfig,
): (url: string) => Promise<void> {
    assert(config.log);
    // deno-lint-ignore require-await
    return async (url: string) => {
        assert(config.log);
        console.log(`Content of '${url}' has changed.`);
    };
}

function createTelegramNotifier(
    config: NotifierConfig,
): (url: string) => Promise<void> {
    return async (url: string) => {
        assert(config.telegram);
        const bot = new Telegraf(config.telegram.token);
        for (const chat_id of config.telegram.chat_ids) {
            await bot.telegram.sendMessage(
                chat_id,
                `Content of '${url}' has changed.`,
            );
        }
    };
}
