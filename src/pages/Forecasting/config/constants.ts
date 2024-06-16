import { TableColumnsType } from 'antd';
import { TableDataType } from '../../../entities/Forecasting/lib/helpers.ts';

export const columns: TableColumnsType<TableDataType> = [
    {
        title: 'Адрес объекта',
        dataIndex: 'address',
    },
    {
        title: 'Температура подачи',
        dataIndex: 'supply_temperature',
    },
    {
        title: 'Текущая температура',
        dataIndex: 'return_temperature',
    },
    {
        title: 'Оценка здания',
        dataIndex: 'predicted_label',
    },
];
