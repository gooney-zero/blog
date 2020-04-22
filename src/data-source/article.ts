import { logError } from "src/utils/log";
import { getArticlesApi, getArticleByIdApi } from "src/api/list/article";
import { IResData } from "src/types/api/common";
import { ReqGetArticlesBody } from "src/types/api/article/request/getArticles";
import { ResArticlesBody } from "src/types/api/article/response/getArticles";


export async function getArticlesServe(body: ReqGetArticlesBody = {}) {
  try {
    return (await getArticlesApi<IResData<ResArticlesBody>>(body)).data.body;
  } catch (error) {
    logError(error);
  }
}
export async function getArticleByIdServe(id: number) {
  try {
    return (await getArticleByIdApi<IResData<ResArticlesBody>>({ id })).data.body;
  } catch (error) {
    logError(error);
  }
}