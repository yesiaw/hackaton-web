import { createStore } from '@xstate/store';

const initialState = {
    access_token: '',
    refresh_token: '',
};
export const appStore = createStore(initialState, {
    setToken: {
        access_token: (_, event: { access_token: string }) => event.access_token,
        refresh_token: (_, event: { refresh_token: string }) => event.refresh_token,
    },
});
