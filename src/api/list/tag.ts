import { fetchGet, customRequest } from "../fetch";



/**
 * @description 获取所有标签
 * @author wenguang zhang
 */
export const getTagsApi = fetchGet({
  url: '/api/v1/tags'
})

/**
 * @description 添加标签
 * @author wenguang zhang
 */
export const addTagApi = customRequest({
  url: '/api/v1/tags',
  method: 'post'
})

/**
 * @description 删除标签
 * @author wenguang zhang
 */
export const delTagApi = customRequest({
  url: '/api/v1/tags',
  method: 'delete'
})

/**
 * @description 修改标签
 * @author wenguang zhang
 */
export const updateTagApi = customRequest({
  url: '/api/v1/tags',
  method: 'put'
})