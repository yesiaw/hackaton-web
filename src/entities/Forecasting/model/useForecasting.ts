import { useInfiniteQuery } from '@tanstack/react-query';
import api from '../../../shared/api/api.ts';
export const FORECASTING_KEY = 'forecasting';
export const useForecasting = ({ queryKeys = [], params = {}, options = {} } = {}) =>
    // @ts-ignore
    useInfiniteQuery({
        queryKey: [FORECASTING_KEY, ...queryKeys],
        queryFn: ({ pageParam = 1 }) =>
            api.getForecasting({ ...params, page: pageParam as number, size: 100 }),
        // @ts-ignore
        getNextPageParam: ({ next }) => {
            if (typeof next === 'string') {
                const url = new URL(next);
                return url.searchParams.get('page');
            }

            return null;
        },
        ...options,
    });
