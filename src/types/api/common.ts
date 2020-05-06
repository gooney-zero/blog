export interface IResData<T = EmptyInterface> {
    body: IResDataBody<T>;
    head: IResDataHead;
}
export interface IResDataBody<T> {
    status: IStatus;
    data: T;
}
interface IResDataHead {
    token: string;
}
export interface IStatus {
    code: number;
    msg: string;
}
