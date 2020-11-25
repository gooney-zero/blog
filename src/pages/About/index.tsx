import React from 'react';
import './index.less';
import { GITHUB_LINK } from 'src/constants/common';

export default function About() {
  return (
    <div>
      <section className="about">
        <h1 className="about-title">关于</h1>
        <div className="about-content">
          <p className="about-content-txt">关于我，是一个XXX，搭建此博客只为了巩固计算机知识，有任何建议或者问题都可以联系我</p>
          <p>联系方式：</p>
          <ul className="about-content-way">
            <li>Github: {GITHUB_LINK}</li>
            <li>邮箱: wenguangzhang2020@outlook.com.cn</li>
          </ul>
        </div>
      </section>
    </div>
  )
}