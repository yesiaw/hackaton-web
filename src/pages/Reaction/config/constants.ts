import { generateTableData, getTEC, getTECForSelect } from '../lib/helpers.ts';
import mockData from '../../../entities/Reaction/config/mock.json';

export type ReactionType = {
    tp_number: string;
    address_tp: string;
    heat_supply_source: string;
    short_address: string;
    unom: number;
    ods_number: string;
    ods_address: string;
    consumer: string;
    geodata_y: string;
    geodata_center_y: string;
};

export const columns = [
    {
        title: 'Номер объекта',
        dataIndex: 'tp_number',
    },
    {
        title: 'Адрес объекта',
        dataIndex: 'address_tp',
    },
    {
        title: 'Потребитель',
        dataIndex: 'consumer',
    },
];

export const tableData = generateTableData(mockData);
const TEC = getTEC(mockData);
export const TECForSelect = getTECForSelect(TEC);
