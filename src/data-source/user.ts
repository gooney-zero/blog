import { registerApi, loginApi } from 'src/api/list/user';
import { IResData } from 'src/types/api/common';
import { logError } from 'src/utils/log';
import { ReqRegisterBody } from 'src/types/api/user/request/register';
import { ReqLoginBody } from 'src/types/api/user/request/login';

export async function registerServe(body: ReqRegisterBody) {
    try {
        return (await registerApi<IResData>(body)).data.body;
    } catch (error) {
        logError(error);
    }
}

export async function loginServe(body: ReqLoginBody) {
    try {
        return (await loginApi<IResData>(body)).data.body;
    } catch (error) {
        logError(error);
    }
}
