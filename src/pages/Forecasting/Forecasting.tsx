import classNames from 'classnames/bind';
import style from './styles.module.css';

import { DatabaseCard } from './ui/DatabaseCard';
import { UploadCard } from './ui/UploadCard';
import { ForecastingTable } from './ui/Table';
import { useState } from 'react';
const cx = classNames.bind(style);

const Forecasting = () => {
    const [visible, setVisible] = useState(false);
    return (
        <div className={cx('container')}>
            <UploadCard />
            <DatabaseCard onChange={() => setVisible(true)} />
            {visible && <ForecastingTable />}
        </div>
    );
};

export default Forecasting;
