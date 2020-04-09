import React from 'react';
import './index.less';
import MenuLink from 'src/components/MenuLink';
import { GithubOutlined, CopyrightOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { GITHUB_LINK } from 'src/constants/common';

export default function Home() {
  const style: React.CSSProperties = {
    textAlign: "center"
  }
  return (
    <div className="home">
      <div className="home-head">
        <h1 className="home-head-title">憨憨</h1>
        <p className="home-head-motto">You only live once,but if you do it right,once is enough.</p>
        <a style={style} href={GITHUB_LINK} target="_blank" rel="noopener noreferrer"><GithubOutlined /></a>
        <nav className="home-head-nav">
          <ul>
            <li><MenuLink to="/posts" label="Posts" /></li>
            <li><MenuLink to="/tags" label="Tags" /></li>
            <li><MenuLink to="/about" label="About" /></li>
          </ul>
        </nav>
      </div>
      <footer className="home-footer">
        <CopyrightOutlined /> {new Date().getFullYear()} 5guang Inc. All rights reserved.
      </footer>
    </div>
  )
}