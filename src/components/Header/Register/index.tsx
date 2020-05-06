import React, { useState } from 'react';
import { $sync } from 'src/utils/sync';
import { registerServe } from 'src/data-source/user';
import { HTTP_STATUS } from 'src/constants/common';
import { message, Input, Button, Modal, Form } from 'antd';
import { store, layout, tailLayout } from 'src/constants/user';
import md5 from 'blueimp-md5';

interface RegisterProps {
    setVisible: (bol: boolean) => void;
    visible: boolean;
    success: () => void;
}
export function Register({ setVisible, visible, success }: RegisterProps) {
    const [registerLoading, setRegisterLoading] = useState(false);
    const onFinish = (values: typeof store) => {
        values = {
            ...values,
            password: md5(values.password)
        };
        try {
            setRegisterLoading(true);
            $sync(async () => {
                const {
                    status: { code, msg }
                } = (await registerServe(values))!;
                setRegisterLoading(false);
                if (code !== HTTP_STATUS.SUCCESS) {
                    message.warn(msg);
                } else {
                    success();
                    message.success('注册成功!');
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
            cancelText="取消"
            okText="注册"
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
                    <Button loading={registerLoading} type="primary" htmlType="submit">
                        注册
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
}
