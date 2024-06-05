import React from 'react';
import type { FormProps } from 'antd';
import { Button, Form, Input } from 'antd';
import classNames from 'classnames/bind';
import style from './styles.module.css';
import { Link } from '@tanstack/react-router';
import { PATH_ROUTES } from '../../../shared/routes/constants.ts';
import { RegisterType, useRegister } from './model/useRegister.ts';

const cx = classNames.bind(style);

const Login: React.FC = () => {
    const { isPending, contextHolder, register } = useRegister();

    const onFinish: FormProps<RegisterType>['onFinish'] = async (values) => {
        await register(values);
    };
    return (
        <div className={cx('container')}>
            {contextHolder}
            <p className={cx('title')}>Регистрация</p>
            <Form layout="vertical" onFinish={onFinish} autoComplete="on">
                <Form.Item
                    label="Имя"
                    name="first_name"
                    rules={[{ required: true, message: 'Это обязательное поле!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Фамилия"
                    name="last_name"
                    rules={[{ required: true, message: 'Это обязательное поле!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Отчество"
                    name="middle_name"
                    rules={[{ required: true, message: 'Это обязательное поле!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Email"
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
};

export default Login;
