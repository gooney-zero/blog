import { TagItem } from "../../tag/response/getTags";

export interface ResArticlesBody {
  articleList: ArticleList[]
  count: number
  tags: TagItem[] | null
}
export interface ArticleList {
  title: string
  desc: string
  content: string
  articleId: number
  creator: string
  state: number
  createdTime: string
}