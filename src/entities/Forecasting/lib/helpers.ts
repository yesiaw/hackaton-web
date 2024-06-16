import { Prediction } from '../model/useForecasting.ts';

export type TableDataType = Prediction & {
    key: number;
};

export const generateTableData = (data: Prediction[]): TableDataType[] => {
    return data.map((el) => ({
        key: el.id,
        ...el,
    }));
};

export const convertToRowKeys = (data: Map<any, any>) => {
    return Array.from(data).map(([key]) => key);
};

export const getAreasData = (areas: string[]) => {
    return Array.from(new Set(areas)).map((el) => ({ label: el, value: el }));
};
