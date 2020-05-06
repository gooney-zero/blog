import React, { useState, useEffect, useContext } from 'react';
import './index.less';
import MenuLink from '../MenuLink';
import { useHistory } from 'react-router';
import { PATH_NAME } from 'src/constants/route';
import { Register } from './Register';
import { Login } from './Login';
import Cookies from 'js-cookie';
import { Menu, Dropdown } from 'antd';
import { USER_INFO } from 'src/constants/user';
import { Icon } from '../Icon';
import { decode } from 'punycode';
import { ProviderContext } from 'src/store';
import { CHANGE_IS_LOGIN, CHANGE_IS_ADMIN } from 'src/store/mutation-types';

export function BlogHeader() {
    const history = useHistory();
    const [visible, setVisible] = useState(false);
    const { state, dispatch } = useContext(ProviderContext);
    const [nickname, setNickname] = useState('');
    const [loginVisible, setLoginVisible] = useState(false);
    const logout = () => {
        Cookies.remove(USER_INFO.NICKNAME);
        Cookies.remove(USER_INFO.TOKEN);
        Cookies.remove(USER_INFO.IS_ADMIN);
        dispatch({ type: CHANGE_IS_LOGIN, payload: false });
        dispatch({ type: CHANGE_IS_ADMIN, payload: false });
    };
    const menu = (
        <Menu>
            <Menu.Item>
                <span onClick={() => logout()}>
                    退出登录
                    <Icon type="logout" />
                </span>
            </Menu.Item>
        </Menu>
    );
    useEffect(() => {
        const nickname = Cookies.get(USER_INFO.NICKNAME);
        const token = Cookies.get(USER_INFO.TOKEN);
        if (token && nickname) {
            dispatch({ type: CHANGE_IS_LOGIN, payload: true });
            setNickname(decode(nickname));
        }
        // eslint-disabled-line
    }, [nickname, dispatch]);
    const successCallback = (nickname: string) => {
        dispatch({ type: CHANGE_IS_LOGIN, payload: true });
        setNickname(nickname);
        setLoginVisible(false);
    };
    const registerSuccess = () => {
        setVisible(false);
        setLoginVisible(true);
    };
    return (
        <div className="blog-header">
            <div className="blog-header-wrap">
                <div>
                    <nav className="blog-header-nav">
                        <p onClick={() => history.push('/')} className="blog-header-nav-title">
                            首页
                        </p>
                        <ul className="blog-header-nav-ul">
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
                {/* <a
                    rel="noopener noreferrer"
                    target="_blank"
                    href={GITHUB_LINK}
                    className="blog-header-icon"
                >
                    <GithubOutlined />
                </a> */}
                {state.islogin ? (
                    <Dropdown overlay={menu}>
                        <div className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
                            <p>{nickname}</p>
                        </div>
                    </Dropdown>
                ) : (
                    <div>
                        <a
                            href="void(0)"
                            onClick={() => setLoginVisible(true)}
                            style={{ paddingRight: '10px' }}
                        >
                            登录
                        </a>
                        <a href="void(0)" onClick={() => setVisible(true)}>
                            注册
                        </a>
                    </div>
                )}
            </div>
            <Register success={registerSuccess} visible={visible} setVisible={setVisible} />
            <Login visible={loginVisible} success={successCallback} setVisible={setLoginVisible} />
        </div>
    );
}
