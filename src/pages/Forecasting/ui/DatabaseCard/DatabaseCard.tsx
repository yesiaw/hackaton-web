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
                <p className={cx('title')}>Просмотр прогнозов</p>
                <p className={cx('subtitle')}>
                    Вы можете просмотреть результаты прогнозов, которые были загружены ранее
                </p>
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
                            label: 'Прогноз от 12.06.24',
                        },
                        {
                            value: 'file2',
                            label: 'Прогноз от 15.06.24',
                        },
                        {
                            value: 'file3',
                            label: 'Прогноз от 17.06.24',
                        },
                    ]}
                />
                <Button className={cx('open_button')} onClick={onChange}>
                    Открыть прогноз
                </Button>
            </div>
        </div>
    );
};

export default DatabaseCard;
