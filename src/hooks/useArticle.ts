import { useState, useEffect } from 'react';
import { getArticlesServe } from 'src/data-source/article';
import { HTTP_STATUS } from 'src/constants/common';
import { message } from 'antd';
import { ArticleList } from 'src/types/api/article/response/getArticles';
import { TagItem } from 'src/types/api/tag/response/getTags';
interface PostsState {
    articleList: ArticleList[];
    count: number;
    tags: TagItem[];
    loading: boolean;
}
export function useGetArticles() {
    const [state, setState] = useState<PostsState>({
        articleList: [],
        count: 0,
        tags: [],
        loading: true
    });
    useEffect(() => {
        getArticlesServe().then((res) => {
            const {
                status: { code, msg },
                data
            } = res!;
            if (code !== HTTP_STATUS.SUCCESS) {
                message.error(msg);
            } else {
                setState({
                    ...state,
                    articleList: data.articleList,
                    count: data.count,
                    loading: false
                });
            }
        });
        // eslint-disable-next-line
    }, []);
    return state;
}
