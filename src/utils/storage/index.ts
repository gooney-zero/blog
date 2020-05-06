import { logError } from '../log';

export class CustomStorage {
    public static get<T = any>(key: string): T | undefined {
        try {
            return JSON.parse(window.sessionStorage.getItem(key) as string);
        } catch (e) {
            logError(e);
        }
    }
    public static set(key: string, val: any) {
        try {
            window.sessionStorage.setItem(key, JSON.stringify(val));
        } catch (e) {
            logError(e);
        }
    }
    public static remove(key: string) {
        try {
            window.sessionStorage.removeItem(key);
        } catch (e) {
            logError(e);
        }
    }
    public static clear() {
        try {
            window.sessionStorage.clear();
        } catch (e) {
            logError(e);
        }
    }
}
