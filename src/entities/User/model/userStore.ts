import { createStore } from '@xstate/store';

export type UserType = {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    middle_name: string;
};

const initialState: UserType = {
    id: '',
    email: '',
    first_name: '',
    last_name: '',
    middle_name: '',
};
export const userStore = createStore(initialState, {
    setUser: {
        id: (_, event: { id: string }) => event.id,
        email: (_, event: { email: string }) => event.email,
        first_name: (_, event: { first_name: string }) => event.first_name,
        last_name: (_, event: { last_name: string }) => event.last_name,
        middle_name: (_, event: { middle_name: string }) => event.middle_name,
    },
});
