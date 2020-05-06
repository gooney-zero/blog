import axios, { AxiosResponse, AxiosRequestConfig, Method } from 'axios';
import Cookies from 'js-cookie';
import { USER_INFO } from 'src/constants/user';

interface IRequestConfig {
    url: string;
    method: Method;
    async?: boolean;
}
interface IPostConfig {
    url: string;
    body: any;
}

interface IRequestHeader {
    token: string;
}

function obj2url(obj: IObj) {
    return Object.keys(obj)
        .map((v) => `${v}=${obj[v]}`)
        .join('&');
}

function getReqHeaders(): IRequestHeader {
    // const token = CustomStorage.get('token')
    const token = Cookies.get(USER_INFO.TOKEN) || '';
    return {
        token
    };
}

axios.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        Object.assign(config.headers, getReqHeaders());
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export function fetchGet(
    config: Omit<IRequestConfig, 'method'>
): <T>(body: IObj) => Promise<AxiosResponse<T>> {
    const { url } = config;
    return (body = {}) => {
        return axios.get(`${url}?${obj2url(body)}`);
    };
}

export function fetchPost(
    config: Omit<IRequestConfig, 'method'>
): <T>(body: IObj) => Promise<AxiosResponse<T>> {
    const { url } = config;
    return (body) => {
        return reload({ url, body });
    };
}
export function customRequest(
    config: IRequestConfig,
    cleanout = true
): <T>(body: any) => Promise<AxiosResponse<T>> {
    const { url, method } = config;
    return (body) => {
        return axios({
            data: cleanout ? afterHandle(body) : body,
            url,
            method
        });
    };
}
async function reload({ url, body }: IPostConfig): Promise<any> {
    try {
        const promise = await axios.post(url, afterHandle(body));
        return promise;
    } catch (e) {
        // logError(e);
    }
}

function afterHandle(body: any) {
    const head = {};
    const jsonData = {
        head,
        body
    };
    return jsonData;
}
