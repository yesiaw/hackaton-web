import classNames from 'classnames/bind';
import style from './styles.module.css';

import { DatabaseCard } from './ui/DatabaseCard';
import { UploadCard } from './ui/UploadCard';
import { ForecastingTable } from './ui/Table';
const cx = classNames.bind(style);

const Forecasting = () => {
    return (
        <div className={cx('container')}>
            <DatabaseCard />
            <UploadCard />
            <ForecastingTable />
        </div>
    );
};

export default Forecasting;
