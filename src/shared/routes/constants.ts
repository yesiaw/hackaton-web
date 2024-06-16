export const PATH_ROUTES = {
    login: '/login',
    register: '/register',
    forecasting: '/forecasting',
    reaction: '/reaction',
    anyPath: '*',
    emptyPath: '/',
} as const;

type PathKeysType = keyof typeof PATH_ROUTES;
export type PathValueType = (typeof PATH_ROUTES)[PathKeysType];

export const PATH_NAMES: { [key in PathValueType]: string } = {
    [PATH_ROUTES.forecasting]: 'Прогнозирование',
    [PATH_ROUTES.reaction]: 'Реагирование',
    [PATH_ROUTES.anyPath]: '404',
    [PATH_ROUTES.register]: 'Регистрация',
    [PATH_ROUTES.login]: 'Логин',
    [PATH_ROUTES.emptyPath]: '',
};
