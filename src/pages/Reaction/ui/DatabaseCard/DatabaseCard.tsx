import classNames from 'classnames/bind';
import style from './styles.module.css';
import { DatabaseOutlined } from '@ant-design/icons';
import { Button, Select } from 'antd';

const cx = classNames.bind(style);

const DatabaseCard = ({ onChange }: { onChange: VoidFunction }) => {
    return (
        <div className={cx('container')}>
            <div className={cx('icon_container')}>
                <DatabaseOutlined />
            </div>
            <div className={cx('text_container')}>
                <p className={cx('title')}>Реагирование</p>
                <p className={cx('subtitle')}>Модель реагирования на уже произошедшее событие</p>
            </div>
            <div className={cx('actions_container')}>
                <Select
                    className={cx('search_container')}
                    showSearch
                    placeholder="Выберите файл прогноза"
                    allowClear
                    // onChange={onChange}
                    // onSearch={onSearch}
                    options={[
                        {
                            value: 'file1',
                            label: 'Событие от 12.06.24',
                        },
                        {
                            value: 'file2',
                            label: 'Событие от 15.06.24',
                        },
                        {
                            value: 'file3',
                            label: 'Событие от 17.06.24',
                        },
                    ]}
                />
                <Button className={cx('open_button')} onClick={onChange}>
                    Открыть событие
                </Button>
            </div>
        </div>
    );
};

export default DatabaseCard;
