import React, { useEffect, useContext } from 'react';
import './index.less';
// import Card from 'antd/es/card';
// import Divider from 'antd/es/divider';
// import 'antd/es/divider/style/index.less';
// import 'antd/es/card/style/index.less';
import { ArticleList } from 'src/types/api/article/response/getArticles';
import { Skeleton, Divider, Card } from 'antd';
import { useHistory } from 'react-router';
import { Icon } from 'src/components/Icon';
import { useGetArticles } from 'src/hooks/useArticle';
import { USER_INFO } from 'src/constants/user';
import Cookies from 'js-cookie';
import { ProviderContext } from 'src/store';
import { CHANGE_IS_ADMIN } from 'src/store/mutation-types';

export default function Posts() {
    const history = useHistory();
    const state = useGetArticles();
    const {
        state: { isAdmin },
        dispatch
    } = useContext(ProviderContext);
    useEffect(() => {
        const admin = Cookies.get(USER_INFO.IS_ADMIN);
        dispatch({ type: CHANGE_IS_ADMIN, payload: admin === '1' });
    }, [isAdmin, dispatch]);
    const desc = (v: ArticleList) => (
        <div className="card-meat">
            <div className="card-meat-desc">
                <p> {v.desc}</p>
            </div>
            <Divider />
            <div className="card-meat-info">
                <div className="card-meat-info-author">
                    <p className="card-meat-info-txt">
                        {' '}
                        <Icon className="card-meat-info-iconfont" type="icon-user" />
                        <span>{v.creator}</span>
                    </p>
                </div>
                <p className="card-meat-info-txt">
                    {' '}
                    <Icon className="card-meat-info-iconfont" type="icon-43shijian" />
                    <span>{v.createdTime}</span>
                </p>
            </div>
        </div>
    );
    const title = (title: string) => <h1>{title}</h1>;
    return (
        <section>
            <Skeleton active loading={state.loading}>
                <div className="posts-header">
                    <h1 className="posts-title">文章</h1>
                    {isAdmin ? (
                        <h3
                            onClick={() => history.push({ pathname: '/write' })}
                            className="posts-title posts-title-write"
                        >
                            <Icon type="icon-xiezuo" />
                        </h3>
                    ) : null}
                </div>
                {state.articleList.map((v) => (
                    <div
                        key={v.articleId}
                        onClick={() => history.push({ pathname: `/main/article/${v.articleId}` })}
                        style={{ marginBottom: '20px' }}
                    >
                        <Card hoverable>
                            <Card.Meta title={title(v.title)} description={desc(v)} />
                        </Card>
                    </div>
                ))}
            </Skeleton>
        </section>
    );
}
