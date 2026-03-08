import type { Locale } from '@/i18n/routing';

type Messages = Record<string, unknown>;

let messagesCache: Record<Locale, Messages> = {} as Record<Locale, Messages>;

async function loadMessages(locale: Locale): Promise<Messages> {
  if (messagesCache[locale]) return messagesCache[locale];
  const mod = await import(`../../messages/${locale}.json`);
  messagesCache[locale] = mod.default as Messages;
  return messagesCache[locale];
}

export function getMessagesSync(locale: Locale): Messages {
  if (messagesCache[locale]) return messagesCache[locale];
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const mod = require(`../../messages/${locale}.json`);
    const messages = (mod && typeof mod === 'object' && 'default' in mod ? mod.default : mod) as Messages;
    messagesCache[locale] = messages ?? {};
    return messagesCache[locale];
  } catch {
    messagesCache[locale] = {};
    return messagesCache[locale];
  }
}

export function getTranslations(locale: Locale, namespace: string) {
  const messages = getMessagesSync(locale);
  const ns = (messages[namespace] as Record<string, string>) || {};
  return (key: string) => ns[key] ?? key;
}

export type TranslationFn = (key: string) => string;
