import { Outlet, useNavigate } from '@tanstack/react-router';
import { PATH_ROUTES } from '../routes/constants.ts';
import { useLayoutEffect } from 'react';
import { Layout } from '../ui/Layout';
import { AuthLayout } from '../ui/AuthLayout';
import { useSelector } from '@xstate/store/react';
import { appStore } from '../../app/model/appStore.ts';

const AuthProvider = () => {
    const isAuth = useSelector(appStore, (state) => state.context.isAuth);

    const navigate = useNavigate();
    useLayoutEffect(() => {
        if (!isAuth) {
            navigate({ to: PATH_ROUTES.login });
        }
    }, []);
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
