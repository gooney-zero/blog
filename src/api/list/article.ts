import { fetchPost } from "../fetch";

/**
 * @description 获取文章
 * @author wenguang zhang
 */
export const getArticlesApi = fetchPost({
  url: '/api/v1/getArticleList'
})
/**
 * @description 通过id获取文章
 * @author wenguang zhang
 */
export const getArticleByIdApi = fetchPost({
  url: '/api/v1/getArticleById'
})