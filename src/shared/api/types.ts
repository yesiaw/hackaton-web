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

export type PARAMS_TYPE = {
    page: number;
    page_size: number;
};

export type PAGINATION_TYPE = {
    current: number;
    pageSize: number;
};
