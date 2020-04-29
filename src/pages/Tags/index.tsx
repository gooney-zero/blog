import React, { useEffect, useState } from 'react';
import { getTagsApiServe } from 'src/data-source/tag';
import { TagItem } from 'src/types/api/tag/response/getTags';
import { HTTP_STATUS } from 'src/constants/common';
import Tag from 'antd/es/tag';
import 'antd/es/tag/style/index.less';
import { message } from 'antd';
import { useHistory } from 'react-router';
import { PATH_NAME } from 'src/constants/route';

interface TagState {
    list: TagItem[];
    count: number;
    closable: boolean;
}

export default function Tags() {
    const h = useHistory();
    const [state, setState] = useState<TagState>({
        list: [],
        count: 0,
        closable: true
    });
    useEffect(() => {
        getTagsApiServe().then((res) => {
            const {
                status: { code, msg },
                data
            } = res!;
            if (code !== HTTP_STATUS.SUCCESS) {
                message.error(msg);
            } else {
                setState({
                    ...state,
                    list: data.tagList,
                    count: data.count
                });
            }
        });
        // eslint-disable-next-line
    }, []);
    return (
        <div>
            <h1 className="posts-title">标签云</h1>
            <div>
                <div className="flex-c-c">
                    {state.list.map((v) => (
                        <Tag
                            onClick={() =>
                                h.push({
                                    pathname: `${PATH_NAME.PLAIN_POSTS}/${v.id}?title=${encodeURI(
                                        v.name
                                    )}`
                                })
                            }
                            title={v.name}
                            color={'#' + Math.random().toString(16).substr(-6)}
                            closable={state.closable}
                            key={v.id}
                        >
                            {v.name}
                        </Tag>
                    ))}
                </div>
            </div>
        </div>
    );
}
