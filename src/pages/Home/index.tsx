import React from 'react';
import './index.less';
import MenuLink from 'src/components/MenuLink';
import { GithubOutlined, CopyrightOutlined } from '@ant-design/icons';

import { GITHUB_LINK } from 'src/constants/common';
import { PATH_NAME } from 'src/constants/route';
import { Photo } from 'src/components/Photo';

export default function Home() {
    const style: React.CSSProperties = {
        textAlign: 'center'
    };
    return (
        <div className="home">
            <div className="home-head">
                <div className="home-head-avatar">
                    <Photo size={100} />
                </div>
                <h1 className="home-head-title">幻光</h1>
                <p className="home-head-motto">
                    You only live once,but if you do it right,once is enough.
                </p>
                <a style={style} href={GITHUB_LINK} target="_blank" rel="noopener noreferrer">
                    <GithubOutlined />
                </a>
                <nav className="home-head-nav">
                    <ul>
                        <li>
                            <MenuLink to={PATH_NAME.POSTS} label="文章" />
                        </li>
                        <li>
                            <MenuLink to={PATH_NAME.TAG} label="标签" />
                        </li>
                        <li>
                            <MenuLink to={PATH_NAME.Archive} label="归档" />
                        </li>
                        <li>
                            <MenuLink to={PATH_NAME.ABOUT} label="关于" />
                        </li>
                    </ul>
                </nav>
            </div>
            <footer className="home-footer">
                <CopyrightOutlined /> {new Date().getFullYear()} 5guang Inc. All rights reserved.
            </footer>
        </div>
    );
}
