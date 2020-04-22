import React, { useEffect, useState } from "react";
import './index.less';
import Card from 'antd/es/card';
import Divider from 'antd/es/divider';
import 'antd/es/divider/style/index.less';
import 'antd/es/card/style/index.less';
import { getArticlesServe } from "src/data-source/article";
import { HTTP_STATUS, ICONT_SCRIPT_URL } from "src/constants/common";
import { ArticleList } from "src/types/api/article/response/getArticles";
import { TagItem } from "src/types/api/tag/response/getTags";
import { message } from 'antd';
import { useHistory } from "react-router";
import { Icon } from "src/components/Icon";

interface PostsState {
  articleList: ArticleList[],
  count: number,
  tags: TagItem[]
}


export default function Posts() {
  const history = useHistory();
  const [state, setState] = useState<PostsState>({
    articleList: [],
    count: 0,
    tags: [],
  })
  useEffect(() => {
    getArticlesServe().then(res => {
      const { status: { code, msg }, data } = res!;
      if (code !== HTTP_STATUS.SUCCESS) {
        message.error(msg)
      } else {
        setState({
          ...state,
          articleList: data.articleList,
          count: data.count,
        })
      }
    })
  }, [])

  const desc = (v: ArticleList) => (
    <div className="card-meat">
      <div className="card-meat-desc">
        <p> {v.desc}</p>
      </div>
      <Divider />
      <div className="card-meat-info">
        <div className="card-meat-info-author">
          <p className="card-meat-info-txt"> <Icon className="card-meat-info-iconfont" type="icon-user" /><span>{v.creator}</span></p>
        </div>
        <p className="card-meat-info-txt"> <Icon className="card-meat-info-iconfont" type="icon-43shijian" /><span>{v.createdTime}</span></p>
      </div>
    </div>
  )
  const title = (title: string) => (<h1>{title}</h1>);
  return (
    <section>
      <div className="posts-header">
        <h1 className="posts-title">文章</h1>
        <h1 className="posts-title"><Icon type="icon-xiezuo" /></h1>
      </div>
      {state.articleList.map(v => (
        <div onClick={() => history.push({ pathname: `/main/article/${v.articleId}` })} style={{ marginBottom: '20px' }}>
          <Card
            hoverable
          >
            <Card.Meta title={title(v.title)} description={desc(v)} />
          </Card>

        </div>
      ))}
    </section>
  )
}