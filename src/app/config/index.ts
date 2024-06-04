import { QueryClient } from '@tanstack/react-query';
import { Router } from '@tanstack/react-router';
import { routeTree } from '../../shared/routes/routes.tsx';

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        },
    },
});

export const router = new Router({
    routeTree,
    context: {
        isAuth: undefined!,
    },
});

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router;
    }
}
