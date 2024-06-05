import { useMutation } from '@tanstack/react-query';
import api from '../../../shared/api/api.ts';
import { userStore, UserType } from './userStore.ts';
import { ErrorResponse } from '../../../shared/api/types.ts';

export const useUser = ({ onError }: { onError: (response: ErrorResponse) => void }) => {
    const { mutateAsync, ...other } = useMutation<UserType, ErrorResponse, null>({
        mutationFn: api.getUser,
    });

    const onUserSuccess = (response: UserType) => {
        userStore.send({
            type: 'setUser',
            id: response.id,
            email: response.email,
            first_name: response.first_name,
            last_name: response.last_name,
            middle_name: response.middle_name,
        });
    };

    const getUser = async () => {
        await mutateAsync(null, { onError, onSuccess: onUserSuccess });
    };

    return { getUser, ...other };
};
