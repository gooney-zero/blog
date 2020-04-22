import React from 'react';
import './index.less';
import { GithubOutlined } from '@ant-design/icons'
import MenuLink from '../MenuLink';
import { GITHUB_LINK } from 'src/constants/common';
import { useHistory } from 'react-router';
import { ROUTER_NAMW } from 'src/constants/route';

export function BlogHeader() {
  const history = useHistory()
  return (
    <div className="blog-header">
      <div className="blog-header-wrap">
        <div>
          <nav className="blog-header-nav">
            <p onClick={() => history.push("/")} className="blog-header-nav-title">首页</p>
            <ul className="blog-header-nav-ul">
              <li><MenuLink to={ROUTER_NAMW.POSTS} label="文章" /></li>
              <li><MenuLink to={ROUTER_NAMW.TAG} label="标签" /></li>
              <li><MenuLink to={ROUTER_NAMW.Archive} label="归档" /></li>
              <li><MenuLink to={ROUTER_NAMW.ABOUT} label="关于" /></li>
            </ul>
          </nav>
        </div>
        <a rel="noopener noreferrer" target="_blank" href={GITHUB_LINK} className="blog-header-icon"><GithubOutlined /></a>
      </div>
    </div>
  )
}