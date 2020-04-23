const _toString = Object.prototype.toString;
// const hasOwnProperty = Object.prototype.hasOwnProperty;
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18
export const fmtDate = (date: Date, fmt: string) => {
    // author: meizz
    const o = {
        'M+': date.getMonth() + 1, // 月份
        'd+': date.getDate(), // 日
        'h+': date.getHours(), // 小时
        'm+': date.getMinutes(), // 分
        's+': date.getSeconds(), // 秒
        'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
        S: date.getMilliseconds() // 毫秒
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, String(date.getFullYear()).substr(4 - RegExp.$1.length));
    }
    for (const k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
            fmt = fmt.replace(
                RegExp.$1,
                RegExp.$1.length === 1
                    ? (o as any)[k]
                    : ('00' + (o as any)[k]).substr(String((o as any)[k]).length)
            );
        }
    }
    return fmt;
};
export function isUndef(v: any): v is null | undefined {
    return v === undefined || v === null;
}
export function isDef(v: any) {
    return v !== undefined && v !== null;
}
export function isNotEmptyStr(v: any) {
    return v !== '';
}
export function isTrue(v: boolean): v is true {
    return v === true;
}
export function isFalse(v: boolean): v is false {
    return v === false;
}
export function isPrimitive(value: any) {
    return typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean';
}
export function isObject(obj: any): obj is object {
    return obj !== null && typeof obj === 'object';
}
export function isPlainObject(obj: any): obj is IObj {
    return toTypeString(obj) === '[object Object]';
}
export function toTypeString(value: unknown): string {
    return _toString.call(value);
}
