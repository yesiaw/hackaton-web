import { useMutation } from '@tanstack/react-query';
import api from '../../../../shared/api/api.ts';
import { message } from 'antd';
import { setRefreshTokenToStorage, setTokenToStorage } from '../../../../shared/api/helpers.ts';
import { ErrorResponse, TokensResponse } from '../../../../shared/api/types.ts';
import { useUser } from '../../../../entities/User/model/useUser.ts';

export type LoginType = {
    email: string;
    password: string;
};

export const useLogin = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const { mutateAsync, ...other } = useMutation<TokensResponse, ErrorResponse, LoginType>({
        mutationFn: api.login,
    });

    const onError = (error: ErrorResponse) => {
        messageApi.open({
            type: 'error',
            content: error.response.data.error_message || 'Произошла ошибка',
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

    const login = async (values: LoginType) => {
        await mutateAsync(values, { onError, onSuccess });
    };

    return { login, contextHolder, ...other };
};
