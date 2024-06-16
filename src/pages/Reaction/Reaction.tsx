// import classNames from 'classnames/bind';
// import style from './styles.module.css';
//
// const cx = classNames.bind(style);

import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

const Reaction = () => {
    return (
        <div>
            Reaction
            <MapContainer
                style={{ height: 500, width: 500 }}
                center={[51.505, -0.09]}
                zoom={13}
                attributionControl={false}
                scrollWheelZoom={false}
            >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker eventHandlers={{ click: () => null }} position={[51.505, -0.09]}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    );
};

export default Reaction;
