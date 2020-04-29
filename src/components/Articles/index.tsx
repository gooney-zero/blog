import React from 'react';
import { PATH_NAME } from 'src/constants/route';
import { getTime } from 'src/utils/date/date';
import { Link } from 'react-router-dom';
import './index.less';
import { ArticleList } from 'src/types/api/article/response/getArticles';

interface PropsPlainArticle {
    articleList: ArticleList[];
    title: string;
}

export function Articles({ title, articleList }: PropsPlainArticle) {
    const times = articleList
        .map((v) => new Date(v.createdTime).getFullYear())
        .reduce<number[]>((pre, nex) => (pre.includes(nex) ? [...pre] : [...pre, nex]), []);
    return (
        <div>
            <h1 className="posts-title">{title}</h1>
            {times.map((time) => (
                <div key={time} className="archive-main-list">
                    <div className="archive-main-list-time">{time}</div>
                    <ul className="archive-main-list-ul">
                        {articleList.map((v, i) => (
                            <li key={i}>
                                <Link
                                    to={`${PATH_NAME.MAIN}/article/${v.articleId}`}
                                    className="archive-main-list-ul-a"
                                >
                                    <span>{v.title}</span>
                                    <span>{getTime(v.createdTime)}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}
