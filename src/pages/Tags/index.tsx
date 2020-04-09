import React from "react";
import BlogMain from "src/components/Main";
import { Link } from "react-router-dom";

export default function Tags() {
  return (
    <BlogMain>
      <h1 className="posts-main-title">Tags</h1>
      {[{ time: 2020, list: 2 }, { time: 2019, list: 3 }].map((time, idx) => (
        <div key={idx} className="posts-main-list">
          <div className="posts-main-list-time">{time.time}</div>
          <ul className="posts-main-list-ul">
            {Array.from({ length: time.list }, (v, i) => i + 1).map((v, i) => (
              <li key={i}>
                <Link to={`/tags/${v}`} className="posts-main-list-ul-a" >
                  <span>golang</span>
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