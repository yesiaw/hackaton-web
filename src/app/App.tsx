import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient, router } from './config';
import { RouterProvider } from '@tanstack/react-router';
import { useSelector } from '@xstate/store/react';
import { appStore } from './model/appStore.ts';

const App = () => {
    const isAuth = useSelector(appStore, (state) => state.context.isAuth);

    return (
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} context={{ isAuth }} />
        </QueryClientProvider>
    );
};

export default App;
