import React, { useState } from 'react';
import './index.less';
import { GithubOutlined } from '@ant-design/icons';
import MenuLink from '../MenuLink';
import { GITHUB_LINK } from 'src/constants/common';
import { useHistory } from 'react-router';
import { PATH_NAME } from 'src/constants/route';
import { Button, Modal, Form, Input, Checkbox } from 'antd';
import { registerServe } from 'src/data-source/user';
import { $sync } from 'src/utils/sync';

export function BlogHeader() {
    const history = useHistory();
    const [visible, setVisible] = useState(false);
    const layout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 12 }
    };
    const store = {
        username: 'username',
        password: 'password',
        nickname: 'nickname',
        email: 'email'
    };
    const tailLayout = {
        wrapperCol: { offset: 6, span: 12 }
    };
    const onFinish = (values: typeof store) => {
        $sync(async () => {
            const {
                status: { code, msg }
            } = (await registerServe(values))!;
        });
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
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
                <div>
                    <a style={{ paddingRight: '10px' }}>登录</a>
                    <a onClick={() => setVisible(true)}>注册</a>
                </div>
            </div>
            <Modal
                keyboard={false}
                maskClosable={false}
                destroyOnClose
                cancelText="取消"
                okText="注册"
                centered
                footer={null}
                visible={visible}
            >
                <Form
                    {...layout}
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={(v: any) => onFinish(v)}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label="用户名"
                        name={store.username}
                        rules={[{ required: true, message: '请输入用户名' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="密码"
                        name={store.password}
                        rules={[{ required: true, message: '请输入密码' }]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        label="邮箱"
                        name={store.email}
                        rules={[{ required: true, message: '请输入邮箱' }]}
                    >
                        <Input type="email" />
                    </Form.Item>

                    <Form.Item
                        label="昵称"
                        name={store.nickname}
                        rules={[{ required: true, message: '请输入昵称' }]}
                    >
                        <Input type="text" />
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            注册
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}
