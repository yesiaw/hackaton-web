import { router } from './config';
import { RouterProvider } from '@tanstack/react-router';
import { useSelector } from '@xstate/store/react';
import { userStore } from '../entities/User/model/userStore.ts';

const App = () => {
    const userId = useSelector(userStore, (state) => state.context.id);

    return <RouterProvider router={router} context={{ isAuth: Boolean(userId) }} />;
};

export default App;
