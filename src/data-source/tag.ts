import { getTagsApi, addTagApi, updateTagApi, delTagApi } from "src/api";
import { ReqGetTagsBody } from "src/types/api/tag/request/getTags";
import { ResGetTagsBody } from "src/types/api/tag/response/getTags";
import { IResData } from "src/types/api/common";
import { logError } from "src/utils/log";
import { ReqAddTagBody } from "src/types/api/tag/request/postTag";
import { ReqUpdateTagBody } from "src/types/api/tag/request/updateTag";
import { ReqDelTagBody } from "src/types/api/tag/request/delTag";

export async function getTagsApiServe(body: ReqGetTagsBody = {}) {
  try {
    return (await getTagsApi<IResData<ResGetTagsBody>>(body)).data.body;
  } catch (error) {
    logError(error);
  }
}
export async function addTagsApiServe(body: ReqAddTagBody) {
  try {
    return (await addTagApi<IResData>(body)).data.body;
  } catch (error) {
    logError(error);
  }
}
export async function updateTagApiServe(body: ReqUpdateTagBody) {
  try {
    return (await updateTagApi<IResData>(body)).data.body;
  } catch (error) {
    logError(error);
  }
}
export async function delTagApiServe(body: ReqDelTagBody) {
  try {
    return (await delTagApi<IResData>(body)).data.body;
  } catch (error) {
    logError(error);
  }
}