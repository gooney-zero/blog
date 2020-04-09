import React from 'react';
import './index.less';
import { GithubOutlined } from '@ant-design/icons'
import MenuLink from '../MenuLink';
import { GITHUB_LINK } from 'src/constants/common';
import { useHistory } from 'react-router';

export default function Header() {
  const history = useHistory()
  return (
    <div className="blog-header">
      <div className="blog-header-wrap">
        <div>
          <nav className="blog-header-nav">
            <p onClick={() => history.push("/")} className="blog-header-nav-title">憨憨</p>
            <ul className="blog-header-nav-ul">
              <li><MenuLink to="/posts" label="Posts" /></li>
              <li><MenuLink to="/Tags" label="Tags" /></li>
              <li><MenuLink to="/about" label="About" /></li>
            </ul>
          </nav>
        </div>
        <a target="_blank" href={GITHUB_LINK} className="blog-header-icon"><GithubOutlined /></a>
      </div>
    </div>
  )
}