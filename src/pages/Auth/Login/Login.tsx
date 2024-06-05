import React from 'react';
import type { FormProps } from 'antd';
import { Button, Form, Input } from 'antd';
import classNames from 'classnames/bind';
import style from './styles.module.css';
import { PATH_ROUTES } from '../../../shared/routes/constants.ts';
import { Link } from '@tanstack/react-router';
import { LoginType, useLogin } from './model/useLogin.ts';

const cx = classNames.bind(style);

const Login: React.FC = () => {
    const { login, isPending, contextHolder } = useLogin();

    const onFinish: FormProps<LoginType>['onFinish'] = async (values) => {
        await login(values);
    };

    return (
        <>
            {contextHolder}
            <div className={cx('container')}>
                <p className={cx('title')}>Вход</p>
                <Form layout="vertical" onFinish={onFinish} autoComplete="on">
                    <Form.Item
                        label="Имя пользователя"
                        name="email"
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
                            <Button disabled={isPending} type="primary" htmlType="submit">
                                Войти
                            </Button>
                            <Link to={PATH_ROUTES.register}>
                                <Button type="text">Регистрация</Button>
                            </Link>
                        </div>
                    </Form.Item>
                </Form>
            </div>
        </>
    );
};

export default Login;
