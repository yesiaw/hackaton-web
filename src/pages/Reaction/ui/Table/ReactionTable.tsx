import React, { useEffect, useMemo, useState } from 'react';
import { Button, Input, Select, Table } from 'antd';
import classNames from 'classnames/bind';
import style from './styles.module.css';
import { columns, ReactionType, tableData, TECForSelect } from '../../config/constants.ts';
import { filterFOR } from '../../lib/helpers.ts';
import { ModalContent } from '../ModalContent';

const cx = classNames.bind(style);

const { Search } = Input;

const ForecastingTable: React.FC = () => {
    const [TEC, setTEC] = useState<string>(TECForSelect[0].value);
    const [address, setAddress] = useState('');
    const [selected, setSelected] = useState<null | ReactionType[]>(null);
    const [openModal, setOpenModal] = useState<null | ReactionType[]>(null);

    const filteredData = useMemo(() => filterFOR(tableData, { TEC, address }), [TEC, address]);

    const rowSelection = {
        onChange: (_: any, row: ReactionType[]) => {
            setSelected(row);
        },
    };

    const onOpenModal = () => {
        if (selected) {
            setOpenModal(selected);
        }
    };

    const onCloseModal = () => {
        setOpenModal(null);
    };

    useEffect(() => {
        setSelected(null);
    }, [filteredData]);

    return (
        <div className={cx('table_container')}>
            <div style={{ marginBottom: 16, marginTop: 16 }}>
                <Button type="primary" onClick={onOpenModal} disabled={!selected?.length}>
                    Показать на карте
                </Button>
            </div>
            <div className={cx('actions_container')}>
                <Search
                    placeholder="Поиск по адресу"
                    onSearch={(value) => setAddress(value)}
                    className={cx('input')}
                />
                <Select
                    showSearch
                    placeholder="Фильтр по ТЭЦ"
                    value={TEC}
                    onChange={setTEC}
                    options={TECForSelect}
                    className={cx('select')}
                />
            </div>
            <Table
                rowSelection={rowSelection}
                columns={columns}
                dataSource={filteredData}
                className={cx('table')}
                sticky
            />
            <ModalContent open={openModal} closeModal={onCloseModal} />
        </div>
    );
};

export default ForecastingTable;
