import React, { useState, useEffect } from 'react';
import { Articles } from 'src/components/Articles';
import { ArticleList } from 'src/types/api/article/response/getArticles';
import { $sync } from 'src/utils/sync';
import { getArticlesByTagidServe } from 'src/data-source/article';
import { useParams } from 'react-router';
import { HTTP_STATUS } from 'src/constants/common';
import { message } from 'antd';
import { getQueryString } from 'src/utils/getQueryString';

export function PlainPosts() {
    const { id } = useParams();
    let title = getQueryString('title');
    if (!title) {
        title = '';
    }
    title = decodeURI(title);
    const [articleList, setArticleList] = useState<ArticleList[]>([]);
    useEffect(() => {
        $sync(async () => {
            const {
                status: { code, msg },
                data
            } = (await getArticlesByTagidServe(parseInt(id!, 10)))!;
            if (code !== HTTP_STATUS.SUCCESS) {
                message.error(msg);
            } else {
                setArticleList(data.articleList);
            }
        });
        // eslint-disable-next-line
    }, []);
    return <Articles title={title} articleList={articleList} />;
}
