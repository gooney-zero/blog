import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './index.less';
import './marked.css';
import markdown from 'src/utils/markdown';
import { getTime } from 'src/utils/date/date';
import { HTTP_STATUS } from 'src/constants/common';
import { getArticleByIdServe } from 'src/data-source/article';
import { message, Skeleton, Tag } from 'antd';
import { TagItem } from 'src/types/api/tag/response/getTags';
import { $sync } from 'src/utils/sync';

interface ArticleState {
    title: string;
    content: string;
    state: number;
    createdTime: string;
    creator: string;
    tags: TagItem[];
}

export default function Article() {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [state, setState] = useState<ArticleState>({
        creator: '',
        state: 1,
        tags: [],
        title: '',
        createdTime: '',
        content: ''
    });
    useEffect(() => {
        try {
            setLoading(true);
            $sync(async () => {
                const {
                    status: { code, msg },
                    data
                } = (await getArticleByIdServe(parseInt(id!, 10)))!;
                setLoading(false);
                if (code !== HTTP_STATUS.SUCCESS) {
                    message.error(msg);
                } else {
                    setState({
                        ...state,
                        tags: data.tags || [],
                        title: data.articleList[0].title,
                        createdTime: data.articleList[0].createdTime,
                        content: markdown.marked(data.articleList[0].content)
                    });
                }
            });
        } catch (error) {
            setLoading(false);
        }
        // eslint-disable-next-line
    }, []);

    return (
        <Skeleton active loading={loading}>
            <header className="article-main-title">
                <div className="article-main-title_date flex-sb-c">
                    <span>{getTime(state.createdTime)}</span>

                    <div>
                        {state.tags.map((v) => (
                            <Tag
                                title={v.name}
                                color={'#' + Math.random().toString(16).substr(-6)}
                                key={v.id}
                            >
                                {v.name}
                            </Tag>
                        ))}
                    </div>
                </div>
                <h1 className="article-main-title_txt"> {state.title} </h1>
            </header>
            <section>
                <div
                    id="content"
                    className="article-detail"
                    dangerouslySetInnerHTML={{
                        __html: state.content ? state.content : ''
                    }}
                />
            </section>
        </Skeleton>
    );
}
