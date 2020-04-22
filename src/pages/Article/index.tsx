import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './index.less';
import './marked.css';
import markdown from 'src/utils/markdown';
import { getTime } from 'src/utils/date/date';
import { HTTP_STATUS } from 'src/constants/common';
import { getArticleByIdServe } from 'src/data-source/article';
import { message } from 'antd';
import { TagItem } from 'src/types/api/tag/response/getTags';

interface ArticleState {
  title: string
  content: string
  state: number
  createdTime: string
  creator: string
  tags: TagItem[]
}

export default function Article() {
  const { id } = useParams();
  const [state, setState] = useState<ArticleState>({
    creator: '',
    state: 1,
    tags: [],
    title: '',
    createdTime: '',
    content: ''
  });
  useEffect(() => {
    getArticleByIdServe(parseInt(id!)).then(res => {
      const { status: { code, msg }, data } = res!;
      if (code !== HTTP_STATUS.SUCCESS) {
        message.error(msg)
      } else {
        setState({
          ...state,
          tags: data.tags || [],
          title: data.articleList[0].title,
          createdTime: data.articleList[0].createdTime,
          content: markdown.marked(data.articleList[0].content)
        })
      }
    })
  }, [])

  return (
    <div>
      <header className="article-main-title">
        <div className="article-main-title_date"><span>{getTime(state.createdTime)}</span></div>
        <h1 className="article-main-title_txt"> {state.title} </h1>
      </header>
      <section>

        <div
          id="content"
          className="article-detail"
          dangerouslySetInnerHTML={{
            __html: state.content
              ? state.content
              : '',
          }}
        />
      </section>
    </div>
  )
}