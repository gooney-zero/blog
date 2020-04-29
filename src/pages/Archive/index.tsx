import React from 'react';
import './index.less';
import { useGetArticles } from 'src/hooks/useArticle';
import { Articles } from 'src/components/Articles';

export function Archive() {
    const { articleList } = useGetArticles();
    return <Articles title="归档" articleList={articleList} />;
}
