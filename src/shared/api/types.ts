export type ErrorResponse = {
    response: {
        data: {
            error_message: string;
        };
        status: number;
    };
};

export type TokensResponse = {
    access_token: string;
    refresh_token: string;
    token_type: string;
};
