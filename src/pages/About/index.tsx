import React from 'react';
import './index.less';
import BlogMain from 'src/components/Main';
import { GITHUB_LINK } from 'src/constants/common';

export default function About() {
  return (
    <BlogMain>
      <section className="about">
        <h1 className="about-title">About</h1>
        <div className="about-content">
          <p className="about-content-txt">关于我，是一个XXX，搭建此博客只为了巩固计算机知识，有任何建议或者问题都可以联系我</p>
          <p>联系方式：</p>
          <ul className="about-content-way">
            <li>Github: {GITHUB_LINK}</li>
            <li>邮箱: 5guang@163.com</li>
          </ul>
        </div>
      </section>
    </BlogMain>
  )
}