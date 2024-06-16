import React, { useRef, useState } from 'react';
import { Button, Table } from 'antd';
import { useForecasting } from '../../../../entities/Forecasting/model/useForecasting.ts';
import { PAGINATION_TYPE } from '../../../../shared/api/types.ts';
import {
    convertToRowKeys,
    generateTableData,
} from '../../../../entities/Forecasting/lib/helpers.ts';
import { ModalContent } from '../ModalContent';
import { columns } from '../../config/constants.ts';

const ForecastingTable: React.FC = () => {
    const totalElements = useRef(0);
    const [modal, setModal] = useState<Map<any, any> | null>(null);
    const [pagination, setPagination] = useState<PAGINATION_TYPE>({
        current: 1,
        pageSize: 30,
    });
    const [selectedRow, setSelectedRow] = useState<Map<any, any>>(new Map());
    const selectedRowKeys = convertToRowKeys(selectedRow);

    const {
        data: data,
        isFetching,
        isSuccess,
    } = useForecasting({
        queryKeys: [pagination.current],
        params: pagination,
    });

    if (isSuccess) {
        totalElements.current = data.count;
    }

    const onChangePage = (props: Partial<PAGINATION_TYPE>) => {
        setPagination(props as PAGINATION_TYPE);
    };

    const onSelect = (props: any) => {
        if (selectedRow.has(props.key)) {
            selectedRow.delete(props.key);

            setSelectedRow(new Map(selectedRow));
        } else {
            selectedRow.set(props.key, props);

            setSelectedRow(new Map(selectedRow));
        }
    };

    const onSelectAll = (_a: any, _b: any, changeRows: any[]) => {
        changeRows.forEach((el) => {
            if (selectedRow.has(el.key)) {
                selectedRow.delete(el.key);
            } else {
                selectedRow.set(el.key, el);
            }
            setSelectedRow(new Map(selectedRow));
        });
    };

    const onOpenModal = () => {
        setModal(selectedRow);
    };

    const onCloseModal = () => {
        setModal(null);
    };

    const rowSelection = {
        selectedRowKeys: Array.from(selectedRowKeys),
        onSelect,
        onSelectAll,
    };
    const hasSelected = selectedRowKeys.length > 0;

    return (
        <div>
            <div style={{ marginBottom: 16 }}>
                <Button type="primary" onClick={onOpenModal} disabled={!hasSelected}>
                    Показать на карте
                </Button>
                <span style={{ marginLeft: 8 }}>
                    {hasSelected ? `Выбрано ${selectedRowKeys.length}` : ''}
                </span>
            </div>
            <Table
                pagination={{ ...pagination, total: totalElements.current, showSizeChanger: false }}
                onChange={onChangePage}
                rowSelection={rowSelection}
                columns={columns}
                dataSource={generateTableData(data?.data || [])}
                loading={isFetching}
            />
            <ModalContent open={modal} closeModal={onCloseModal} />
        </div>
    );
};

export default ForecastingTable;
