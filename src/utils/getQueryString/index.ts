export const getQueryString = (name: string) => {
    const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`);
    const r = window.location.search.substr(1).match(reg);
    // eslint-disable-next-line
    if (r != null) {
        return r[2];
    }
    return null;
};
