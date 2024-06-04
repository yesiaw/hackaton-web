import React from 'react';
import type { FormProps } from 'antd';
import { Button, Form, Input } from 'antd';
import classNames from 'classnames/bind';
import style from './styles.module.css';
import { PATH_ROUTES } from '../../../shared/routes/constants.ts';
import { Link } from '@tanstack/react-router';
import { appStore } from '../../../app/model/appStore.ts';

const cx = classNames.bind(style);

type FieldType = {
    username?: string;
    password?: string;
};

const Login: React.FC = () => {
    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        appStore.send({
            type: 'setAuth',
            auth: true,
        });
        console.log('Success:', values);
    };

    return (
        <div className={cx('container')}>
            <p className={cx('title')}>Вход</p>
            <Form layout="vertical" onFinish={onFinish} autoComplete="on">
                <Form.Item
                    label="Имя пользователя"
                    name="username"
                    rules={[{ required: true, message: 'Это обязательное поле!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Пароль"
                    name="password"
                    rules={[{ required: true, message: 'Это обязательное поле!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item>
                    <div className={cx('action_container')}>
                        <Button type="primary" htmlType="submit">
                            Войти
                        </Button>
                        <Link to={PATH_ROUTES.register}>
                            <Button type="text">Регистрация</Button>
                        </Link>
                    </div>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Login;
