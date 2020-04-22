import React from "react";
import { Link } from "react-router-dom";
import { ROUTER_NAMW } from "src/constants/route";
import './index.less';


export function Archive() {

  return (
    <div>
      <h1 className="posts-title">归档</h1>
      {[{ time: 2020, list: 2 }, { time: 2019, list: 20 }].map((time, idx) => (
        <div key={idx} className="archive-main-list">
          <div className="archive-main-list-time">{time.time}</div>
          <ul className="archive-main-list-ul">
            {Array.from({ length: time.list }, (v, i) => i + 1).map((v, i) => (
              <li key={i}>
                <Link to={`${ROUTER_NAMW.MAIN}/article/${v}`} className="archive-main-list-ul-a" >
                  <span>我的第{v}篇博客</span>
                  <span>Feb 28</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}