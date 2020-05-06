import { fetchPost } from '../fetch';

/**
 * @description 用户注册接口
 * @author wenguang zhang
 */
export const registerApi = fetchPost({
    url: '/api/user/register'
});

/**
 * @description 用户登录接口
 * @author wenguang zhang
 */
export const loginApi = fetchPost({
    url: '/api/user/login'
});
