import { ReactionType } from '../config/constants.ts';

export const generateTableData = (data: ReactionType[]): ReactionType[] => {
    return data.map((el) => ({
        key: el.unom,
        ...el,
    }));
};

export const getTEC = (data: ReactionType[]) => {
    return data.reduce((acc, cur) => {
        acc.push(cur.heat_supply_source);

        return Array.from(new Set(acc));
    }, [] as string[]);
};

export const getTECForSelect = (data: string[]) => {
    return data.map((el) => ({ label: el, value: el }));
};

export const filterFOR = (data: ReactionType[], filter: { TEC: string; address: string }) => {
    return data.filter((el) => {
        return (
            el.heat_supply_source === filter.TEC &&
            el.address_tp.toLowerCase().includes(filter.address.toLowerCase())
        );
    });
};
