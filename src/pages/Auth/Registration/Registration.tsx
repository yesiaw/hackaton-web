import React from 'react';
import type { FormProps } from 'antd';
import { Button, Form, Input } from 'antd';
import classNames from 'classnames/bind';
import style from './styles.module.css';
import { Link } from '@tanstack/react-router';
import { PATH_ROUTES } from '../../../shared/routes/constants.ts';

const cx = classNames.bind(style);

type FieldType = {
    username?: string;
    password?: string;
};

const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values);
};

const Login: React.FC = () => (
    <div className={cx('container')}>
        <p className={cx('title')}>Регистрация</p>
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
                        Зарегистрироваться
                    </Button>
                    <Link to={PATH_ROUTES.login}>
                        <Button type="text">Вход</Button>
                    </Link>
                </div>
            </Form.Item>
        </Form>
    </div>
);

export default Login;
