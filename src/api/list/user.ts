import { fetchPost } from "../fetch";

/**
 * @description 用户登录接口
 * @author wenguang zhang
 */
export const loginApi = fetchPost({
  url: '/login',
})