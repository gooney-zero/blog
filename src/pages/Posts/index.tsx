import React from "react";
import { Link } from 'react-router-dom';
import './index.less';
import BlogMain from "src/components/Main";

export default function Posts() {

  return (

    // <div className="posts">
    //   <BlogHeader />
    //   <main className="posts-main">
    //     <h1 className="posts-main-title">Posts</h1>
    //     {[{ time: 2020, list: 2 }, { time: 2019, list: 20 }].map((time, idx) => (
    //       <div key={idx} className="posts-main-list">
    //         <div className="posts-main-list-time">{time.time}</div>
    //         <ul className="posts-main-list-ul">
    //           {Array.from({ length: time.list }, (v, i) => i + 1).map((v, i) => (
    //             <li key={i}>
    //               <Link to={`/posts/${v}`} className="posts-main-list-ul-a" >
    //                 <span>我的第{v}篇博客</span>
    //                 <span>Feb 28</span>
    //               </Link>
    //             </li>
    //           ))}
    //         </ul>
    //       </div>
    //     ))}
    //   </main>
    //   <BlogFooter />
    // </div>
    <BlogMain>
      <h1 className="posts-main-title">Posts</h1>
      {[{ time: 2020, list: 2 }, { time: 2019, list: 20 }].map((time, idx) => (
        <div key={idx} className="posts-main-list">
          <div className="posts-main-list-time">{time.time}</div>
          <ul className="posts-main-list-ul">
            {Array.from({ length: time.list }, (v, i) => i + 1).map((v, i) => (
              <li key={i}>
                <Link to={`/posts/${v}`} className="posts-main-list-ul-a" >
                  <span>我的第{v}篇博客</span>
                  <span>Feb 28</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </BlogMain>
  )
}