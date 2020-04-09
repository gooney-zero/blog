import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './index.less';
import './marked.css';
import markdown from 'src/utils/markdown';
import BlogMain from 'src/components/Main';

export default function Article() {
  const { id } = useParams();
  const article = markdown.marked(`
  > hello world
  \`\`\`javascript
  function name() {

  }
  \`\`\`
  `);
  const [articleDetail, setArticleDetail] = useState({
    _id: '',
    author: '夜尽天明',
    category: [],
    comments: [],
    create_time: '',
    desc: '',
    id: 16,
    img_url: '',
    numbers: 0,
    keyword: [],
    like_users: [],
    meta: { views: 0, likes: 0, comments: 0 },
    origin: 0,
    state: 1,
    tags: [],
    title: '',
    update_time: '111',
    content: ''
  });
  useEffect(() => {
    article.then(res => {
      setArticleDetail({
        ...articleDetail,
        content: res,
      })
    })

  }, [])

  return (
    <BlogMain>
      <header className="article-main-title">
        <div className="article-main-title_date"><span>Apr 5, 2020</span></div>
        <h1 className="article-main-title_txt"> 这是一个标题 </h1>
      </header>
      <section>

        <div
          id="content"
          className="article-detail"
          dangerouslySetInnerHTML={{
            __html: articleDetail.content
              ? articleDetail.content
              : '',
          }}
        />
      </section>
    </BlogMain>
  )
}