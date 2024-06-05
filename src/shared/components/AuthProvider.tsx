import { Outlet, useNavigate } from '@tanstack/react-router';
import { PATH_ROUTES } from '../routes/constants.ts';
import { useLayoutEffect } from 'react';
import { Layout } from '../ui/Layout';
import { AuthLayout } from '../ui/AuthLayout';
import { useSelector } from '@xstate/store/react';
import { userStore } from '../../entities/User/model/userStore.ts';
import { useUser } from '../../entities/User/model/useUser.ts';
import { getToken } from '../api/helpers.ts';
import { Skeleton } from 'antd';

const AuthProvider = () => {
    const userId = useSelector(userStore, (state) => state.context.id);

    const navigateToLogin = () => {
        navigate({ to: PATH_ROUTES.login });
    };
    const { getUser, isPending } = useUser({ onError: navigateToLogin });

    const isAuth = Boolean(userId);

    const navigate = useNavigate();

    useLayoutEffect(() => {
        if (!isAuth) {
            if (getToken()) {
                getUser();
            } else {
                navigateToLogin();
            }
        }
    }, []);

    if (isPending) {
        return <Skeleton active />;
    }
    if (isAuth) {
        return (
            <Layout>
                <Outlet />
            </Layout>
        );
    }
    return (
        <AuthLayout>
            <Outlet />
        </AuthLayout>
    );
};

export default AuthProvider;
