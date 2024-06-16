import { createRootRouteWithContext, createRoute, redirect } from '@tanstack/react-router';
import { PATH_ROUTES } from './constants.ts';
import { Forecasting } from '../../pages/Forecasting';
import { Reaction } from '../../pages/Reaction';
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
    beforeLoad: () => {
        throw redirect({
            to: PATH_ROUTES.forecasting,
        });
    },
    component: Forecasting,
});

const emptyPath = createRoute({
    getParentRoute: () => rootRoute,
    path: PATH_ROUTES.emptyPath,
    beforeLoad: () => {
        throw redirect({
            to: PATH_ROUTES.forecasting,
        });
    },
    component: Forecasting,
});

const forecastingRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: PATH_ROUTES.forecasting,
    component: Forecasting,
});

const reactionRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: PATH_ROUTES.reaction,
    component: Reaction,
});

export const routeTree = rootRoute.addChildren([
    loginRoute,
    registerRoute,
    anyRoute,
    forecastingRoute,
    reactionRoute,
    emptyPath,
]);
