import React, { useEffect, useState } from "react";
import { ReqGetTagsBody } from "src/types/api/tag/request/getTags";
import { getTagsApiServe } from "src/data-source/tag";
import { TagItem } from "src/types/api/tag/response/getTags";
import { HTTP_STATUS } from "src/constants/common";
import Tag from 'antd/es/tag';
import 'antd/es/tag/style/index.less';
import { message } from "antd";

interface TagState {
  list: TagItem[];
  count: number;
  closable: boolean;
}


async function invokeGetTagsApiServe(body: ReqGetTagsBody = {}) {
  const data = (await getTagsApiServe(body))!
  return data;
}

export default function Tags() {
  const [state, setState] = useState<TagState>({
    list: [],
    count: 0,
    closable: true,
  })
  useEffect(() => {
    invokeGetTagsApiServe().then(res => {
      const { status: { code, msg }, data } = res;
      if (code !== HTTP_STATUS.SUCCESS) {
        message.error(msg)
      } else {
        setState({
          ...state,
          list: data.tagList,
          count: data.count
        })
      }
    })
  }, [])
  return (
    // <div>
    //   <h1 className="posts-main-title">标签</h1>
    //   {timeArr.map((time, idx) => (
    //     <div key={idx} className="posts-main-list">
    //       <div className="posts-main-list-time">{time}</div>
    //       <ul className="posts-main-list-ul">
    //         {state.list.map((v, i) => (
    //           <li key={i}>
    //             <Link to={`/tags/${v}`} className="posts-main-list-ul-a" >
    //               <span>{v.name}</span>
    //               <span>{getTime(v.createdTime)}</span>
    //             </Link>
    //           </li>
    //         ))}
    //       </ul>
    //     </div>
    //   ))}
    // </div>
    <div >
      <h1 className="posts-title">标签云</h1>
      <div>
        <div className="flex-v-l">
          {state.list.map(v => (
            <Tag title={v.name} color={'#' + Math.random().toString(16).substr(-6)} closable={state.closable} key={v.id}>{v.name}</Tag>
          ))}
        </div>
      </div>

    </div>

  )
}
