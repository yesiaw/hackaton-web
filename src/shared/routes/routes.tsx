import { createRootRouteWithContext, createRoute, redirect } from '@tanstack/react-router';
import { PATH_ROUTES } from './constants.ts';
import { Home } from '../../pages/Home';
import { Login } from '../../pages/Auth/Login';
import { Registration } from '../../pages/Auth/Registration';
import AuthProvider from '../components/AuthProvider.tsx';
import { MyRouterContext } from './types.ts';

const rootRoute = createRootRouteWithContext<MyRouterContext>()({
    component: AuthProvider,
});

const loginRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: PATH_ROUTES.login,
    component: Login,
    beforeLoad: ({ context }) => {
        if (context.isAuth) {
            throw redirect({
                to: '/',
            });
        }
    },
});

const registerRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: PATH_ROUTES.register,
    component: Registration,
    beforeLoad: ({ context }) => {
        if (context.isAuth) {
            throw redirect({
                to: '/',
            });
        }
    },
});

const anyRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: PATH_ROUTES.anyPath,
    component: Home,
});

const homeRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: PATH_ROUTES.home,
    component: Home,
});

export const routeTree = rootRoute.addChildren([loginRoute, registerRoute, anyRoute, homeRoute]);
