import { useState } from 'react';
import classNames from 'classnames/bind';
import style from './styles.module.css';
import { CloudUploadOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Upload, UploadFile, message, UploadProps, Input } from 'antd';

const cx = classNames.bind(style);

const UploadCard = () => {
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [uploading, setUploading] = useState(false);

    const handleUpload = () => {
        const formData = new FormData();
        fileList.forEach((file) => {
            formData.append('files[]', file as any);
        });
        setUploading(true);
        // You can use any AJAX library you like
        fetch('https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload', {
            method: 'POST',
            body: formData,
        })
            .then((res) => res.json())
            .then(() => {
                setFileList([]);
                message.success('upload successfully.');
            })
            .catch(() => {
                message.error('upload failed.');
            })
            .finally(() => {
                setUploading(false);
            });
    };

    const props: UploadProps = {
        onRemove: (file) => {
            const index = fileList.indexOf(file);
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);
            setFileList(newFileList);
        },
        beforeUpload: (file) => {
            setFileList([...fileList, file]);

            return false;
        },
        fileList,
    };
    return (
        <div className={cx('container')}>
            <div className={cx('icon_container')}>
                <CloudUploadOutlined />
            </div>
            <div className={cx('text_container')}>
                <p className={cx('title')}>Прогнозирование данных</p>
                <p className={cx('time')}>Время прогноза ~ 5 мин.</p>
                <p className={cx('subtitle')}>
                    Для создания нового прогноза вам необходимо загрузить необходимые файлы
                </p>
            </div>
            <div className={cx('actions_container')}>
                <Upload {...props}>
                    <Button className={cx('select_button')} icon={<UploadOutlined />}>
                        Выбрать файлы
                    </Button>
                </Upload>
                <Input placeholder="Введите название прогноза" />
                <Button
                    type="primary"
                    onClick={handleUpload}
                    disabled={fileList.length === 0}
                    loading={uploading}
                >
                    {uploading ? 'Загрузка' : 'Начать прогнозирование'}
                </Button>
            </div>
        </div>
    );
};

export default UploadCard;
