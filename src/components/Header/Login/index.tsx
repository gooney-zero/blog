import React, { useState, useContext } from 'react';
import { Modal, Form, Input, Button, message } from 'antd';
import { store, layout, tailLayout, USER_INFO } from 'src/constants/user';
import { loginServe } from 'src/data-source/user';
import { $sync } from 'src/utils/sync';
import { HTTP_STATUS } from 'src/constants/common';
import Cookies from 'js-cookie';
import md5 from 'blueimp-md5';
import { encode } from 'punycode';
import { ProviderContext } from 'src/store';
import { CHANGE_IS_ADMIN } from 'src/store/mutation-types';
interface LoginProps {
    setVisible: (bol: boolean) => void;
    visible: boolean;
    success: (nickname: string) => void;
}
export function Login({ setVisible, visible, success }: LoginProps) {
    const [registerLoading, setRegisterLoading] = useState(false);
    const { dispatch } = useContext(ProviderContext);
    const onFinish = (values: typeof store) => {
        const password = md5(values.password);
        try {
            setRegisterLoading(true);
            $sync(async () => {
                const {
                    body: {
                        status: { code, msg },
                        data
                    },
                    head: { token }
                } = (await loginServe({
                    username: values.username,
                    password,
                    adminPassword: values.adminPassword
                }))!;
                setRegisterLoading(false);
                if (code !== HTTP_STATUS.SUCCESS) {
                    message.warn(msg);
                } else {
                    success(data.nickname);
                    message.success('登陆成功!');
                    Cookies.set(USER_INFO.TOKEN, token, { expires: 7 });
                    dispatch({ type: CHANGE_IS_ADMIN, payload: data.isAdmin === 1 });
                    Cookies.set(USER_INFO.IS_ADMIN, String(data.isAdmin), { expires: 7 });
                    Cookies.set(USER_INFO.NICKNAME, encode(data.nickname), { expires: 7 });
                }
            });
        } catch (error) {
            setRegisterLoading(false);
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <Modal
            keyboard={false}
            maskClosable={false}
            destroyOnClose
            centered
            onCancel={() => setVisible(false)}
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
                <Form.Item label="管理员密码" name={store.adminPassword}>
                    <Input.Password placeholder="可不填写" />
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Button loading={registerLoading} type="primary" htmlType="submit">
                        登录
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
}
