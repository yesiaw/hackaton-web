import React, { useState } from 'react';
import { Button, Table } from 'antd';
import type { TableColumnsType } from 'antd';
import { useForecasting } from '../../../../entities/Forecasting/model/useForecasting.ts';

interface DataType {
    key: React.Key;
    name: string;
    age: number;
    address: string;
}

const columns: TableColumnsType<DataType> = [
    {
        title: 'Name',
        dataIndex: 'name',
    },
    {
        title: 'Age',
        dataIndex: 'age',
    },
    {
        title: 'Address',
        dataIndex: 'address',
    },
];

const data: DataType[] = [];
for (let i = 0; i < 46; i++) {
    data.push({
        key: i,
        name: `Edward King ${i}`,
        age: 32,
        address: `London, Park Lane no. ${i}`,
    });
}

const ForecastingTable: React.FC = () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

    const { data: datas } = useForecasting();
    console.log(datas);
    const [loading, setLoading] = useState(false);

    const start = () => {
        setLoading(true);
        // ajax request after empty completing
        setTimeout(() => {
            setSelectedRowKeys([]);
            setLoading(false);
        }, 1000);
    };

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;

    return (
        <div>
            <div style={{ marginBottom: 16 }}>
                <Button type="primary" onClick={start} disabled={!hasSelected} loading={loading}>
                    Показать на карте
                </Button>
                <span style={{ marginLeft: 8 }}>
                    {hasSelected ? `Выбрано ${selectedRowKeys.length}` : ''}
                </span>
            </div>
            <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
        </div>
    );
};

export default ForecastingTable;
