import { useMutation } from '@tanstack/react-query';
import api from '../../../../shared/api/api.ts';
import { message } from 'antd';
import { ErrorResponse, TokensResponse } from '../../../../shared/api/types.ts';
import { setRefreshTokenToStorage, setTokenToStorage } from '../../../../shared/api/helpers.ts';
import { useUser } from '../../../../entities/User/model/useUser.ts';

export type RegisterType = {
    first_name: string;
    last_name: string;
    middle_name: string;
    email: string;
    username: string;
    password: string;
};

export const useRegister = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const { mutateAsync, ...other } = useMutation<TokensResponse, ErrorResponse, RegisterType>({
        mutationFn: api.register,
    });

    const onError = (error: ErrorResponse) => {
        const message = error?.response?.data?.error_message || 'Произошла ошибка';
        messageApi.open({
            type: 'error',
            content: message,
        });
    };

    const { getUser } = useUser({ onError });

    const onSuccess = async (response: TokensResponse) => {
        if (response.access_token && response.refresh_token) {
            setTokenToStorage(response.access_token);
            setRefreshTokenToStorage(response.refresh_token);

            await getUser();
        }
    };

    const register = async (values: RegisterType) => {
        await mutateAsync(values, { onError, onSuccess });
    };

    return { register, contextHolder, ...other };
};
