import React from 'react';
import dynamic from 'next/dynamic';

// 只在需要時才進行加載，可以提升頁面的初次加載速度，並減少不必要的資源浪
const DynamicMap = dynamic(() => import('src/features/detail/components/map'), {
    ssr: false,
});
const TransportInfo = ({ position }) => {
    const location = [position.PositionLat, position.PositionLon];
    return <DynamicMap position={location}>transportInfo</DynamicMap>;
};

export default TransportInfo;
