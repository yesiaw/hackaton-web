import React, { useEffect, useState } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    LineChartOutlined,
    AlertOutlined,
    LogoutOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, Spin } from 'antd';
import style from './styles.module.css';
import classNames from 'classnames/bind';
import { PATH_NAMES, PATH_ROUTES, PathValueType } from '../../routes/constants.ts';
import { useNavigate } from '@tanstack/react-router';
import { useSelector } from '@xstate/store/react';
import { userStore } from '../../../entities/User/model/userStore.ts';
import { logout } from '../../api/helpers.ts';

const cx = classNames.bind(style);

const { Header, Sider, Content } = Layout;

const AppLayout = ({ children }: { children: React.ReactNode }) => {
    const [temperature, setTemperature] = useState<string | number>('loading');
    const { first_name, last_name, middle_name } = useSelector(userStore, (state) => state.context);
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);

    const onChangeMenu = (e: { key: string }) => {
        navigate({ to: e.key });
    };

    const activePath = location.pathname;

    const getWeather = () => {
        fetch(
            'https://api.open-meteo.com/v1/forecast?latitude=55.788&longitude=37.779&current=temperature_2m'
        )
            .then((response) => response.json())
            .then((json) => setTemperature(json?.current?.temperature_2m || 0));
    };

    useEffect(() => {
        getWeather();

        setInterval(() => {
            getWeather();
        }, 60_000 * 1000);
    }, []);

    return (
        <div className={cx('wrapper')}>
            <Layout className={cx('container')}>
                <Sider className={cx('slider')} trigger={null} collapsible collapsed={collapsed}>
                    <div className={cx('user_container')}>
                        <div className={cx('user_img')}>
                            <img
                                alt="logo"
                                className="demo-logo-vertical"
                                src="public/assets/logo.jpg"
                            />
                        </div>
                    </div>
                    <div className={cx('menu_container')}>
                        <Menu
                            theme="dark"
                            mode="inline"
                            selectedKeys={[activePath]}
                            defaultSelectedKeys={[activePath]}
                            onSelect={onChangeMenu}
                            items={[
                                {
                                    key: PATH_ROUTES.forecasting,
                                    icon: <LineChartOutlined />,
                                    label: PATH_NAMES['/forecasting'],
                                },
                                {
                                    key: PATH_ROUTES.reaction,
                                    icon: <AlertOutlined />,
                                    label: PATH_NAMES['/reaction'],
                                },
                            ]}
                        />
                        <div className={cx('footer_container')}>
                            {collapsed ? null : (
                                <div className={cx('user_fio')}>
                                    <p>{last_name}</p>
                                    <p>{first_name}</p>
                                    <p>{middle_name}</p>
                                </div>
                            )}

                            <Button
                                type="primary"
                                icon={<LogoutOutlined />}
                                onClick={logout}
                                className={cx('logout_button')}
                            >
                                {collapsed ? '' : 'Выйти'}
                            </Button>
                        </div>
                    </div>
                </Sider>
                <Layout>
                    <Header className={cx('header')}>
                        <div className={cx('header_content')}>
                            <Button
                                type="text"
                                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                                onClick={() => setCollapsed(!collapsed)}
                                style={{
                                    fontSize: '16px',
                                    width: 64,
                                    height: 64,
                                }}
                            />
                            <h3>{PATH_NAMES[activePath as PathValueType]}</h3>
                        </div>

                        <h5 className={cx('weather_container')}>
                            Температура в Москве:{' '}
                            {temperature === 'loading' ? <Spin /> : temperature}
                            °C
                        </h5>
                    </Header>
                    <Content className={cx('content')}>{children}</Content>
                </Layout>
            </Layout>
        </div>
    );
};

export default AppLayout;
