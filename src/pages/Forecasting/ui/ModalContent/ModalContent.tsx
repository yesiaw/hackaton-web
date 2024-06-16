import classNames from 'classnames/bind';
import style from './styles.module.css';
import { Modal } from 'antd';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import { Prediction } from '../../../../entities/Forecasting/model/useForecasting.ts';

const cx = classNames.bind(style);

const ComponentResize = () => {
    const map = useMap();

    setTimeout(() => {
        map.invalidateSize();
    }, 0);

    return null;
};

const ModalContent = ({ open, closeModal }: { open: any; closeModal: VoidFunction }) => {
    const modalData = Array.from(open || []) as Prediction[];

    return (
        <Modal
            width="100vh"
            title="Карта объектов"
            open={open}
            onClose={closeModal}
            onOk={closeModal}
            onCancel={closeModal}
            cancelText="Закрыть"
            centered
        >
            <MapContainer
                style={{ height: 536 }}
                center={[55.7522, 37.6156]}
                zoom={13}
                attributionControl={false}
            >
                <ComponentResize />
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {modalData.map(([key, el]) => (
                    <Marker
                        eventHandlers={{ click: () => null }}
                        position={[
                            Number(el.coordinates.longitude),
                            Number(el.coordinates.latitude),
                        ]}
                        key={el.id}
                    >
                        <Popup>
                            <div className={cx('popup_container')}>
                                <div className={cx('item')}>
                                    <p className={cx('key')}>Адрес:</p>
                                    <p>{el.address}</p>
                                </div>
                                <div className={cx('item')}>
                                    <p className={cx('key')}>Округ:</p>
                                    <p>{el.area}</p>
                                </div>
                                <div className={cx('item')}>
                                    <p className={cx('key')}>Оценка здания:</p>
                                    <p>{el.predicted_label}</p>
                                </div>
                                <div className={cx('item')}>
                                    <p className={cx('key')}>Температура подачи:</p>
                                    <p>{el.supply_temperature}</p>
                                </div>
                                <div className={cx('item')}>
                                    <p className={cx('key')}>Текущая температура:</p>
                                    <p>{el.return_temperature}</p>
                                </div>
                                <div className={cx('item')}>
                                    <p className={cx('key')}>Кол-во этажей:</p>
                                    <p>{el.floors_number}</p>
                                </div>
                                <div className={cx('item')}>
                                    <p className={cx('key')}>Тип дома:</p>
                                    <p>{el.building_assignment}</p>
                                </div>
                                <div className={cx('item')}>
                                    <p className={cx('key')}>Тип постройки:</p>
                                    <p>{el.building_material}</p>
                                </div>
                                <div className={cx('item')}>
                                    <p className={cx('key')}>Кол-во лифтов:</p>
                                    <p>{el.elevators_number}</p>
                                </div>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </Modal>
    );
};

export default ModalContent;
