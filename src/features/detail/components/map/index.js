import React from 'react';
import styled, { css } from 'styled-components';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';

const Map = ({ position }) => {
    const customIcon = new Icon({
        iconUrl: '/images/marker-icon.png',
        iconSize: [40, 40],
    });

    return (
        <MapContainer center={position} zoom={15}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png"
            />
            <Marker position={position} icon={customIcon}></Marker>
        </MapContainer>
    );
};

export default Map;
