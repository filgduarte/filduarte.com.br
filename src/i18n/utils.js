import { content, defaultLang } from './content';

export function getLangFromUrl(url) {
    const [, lang] = url.pathname.split('/');
    if (lang in content) return lang;
    return defaultLang;
}

export function useTranslations(lang) {
    return function t(key) {
        return content[lang][key] || content[defaultLang][key];
    }
}