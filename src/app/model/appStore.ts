import { createStore } from '@xstate/store';

const initialState = {
    isAuth: false,
};
export const appStore = createStore(initialState, {
    setAuth: {
        isAuth: (_, event: { auth: boolean }) => event.auth,
    },
});
