import { Modal } from 'antd';
import { MapContainer, Polygon, TileLayer, useMap } from 'react-leaflet';
import { ReactionType } from '../../config/constants.ts';
import { useEffect } from 'react';

const ComponentResize = ({ coord }: any) => {
    const map = useMap();

    setTimeout(() => {
        map.invalidateSize();
    }, 0);

    useEffect(() => {
        map.invalidateSize();
    }, [coord]);

    return null;
};

const ModalContent = ({
    open,
    closeModal,
}: {
    open: ReactionType[] | null;
    closeModal: VoidFunction;
}) => {
    const [lat, long] = JSON.parse(open?.[0]?.geodata_center_y || '[]');
    const TEC = open?.[0].heat_supply_source;
    // @ts-ignore
    const getMarkers = (markers: [a: number, b: number]) => markers.map(([a, b]) => [b, a]);

    const redOptions = { color: 'red' };

    return (
        <Modal
            width="100vh"
            title={`Карта полигонов ${TEC}`}
            open={Boolean(open)}
            onClose={closeModal}
            onOk={closeModal}
            onCancel={closeModal}
            cancelText="Закрыть"
            centered
            destroyOnClose
        >
            <MapContainer
                style={{ height: 536 }}
                center={[long, lat]}
                zoom={15}
                attributionControl={false}
            >
                <ComponentResize coord={[lat, long]} />
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {open &&
                    open.map((el) => (
                        <Polygon
                            pathOptions={redOptions}
                            positions={getMarkers(JSON.parse(el.geodata_y))}
                        />
                    ))}
            </MapContainer>
        </Modal>
    );
};

export default ModalContent;
