import React from 'react'
import styled from 'styled-components';
import useGetNearybySpot from '../../hooks/useGetNearybySpot';
import TypeCarouselCards from '@/components/TypeCarouselCards';

const IntroTitle = styled.div`
    font-size: ${(props) => props.theme.fontSize.lg};
    font-weight: 600;
    margin: 1.5rem 0;
`;

const NearbySpot = ({ queryType, position, spotId, title }) => {
    const { status, data, error } = useGetNearybySpot({
        queryType: queryType,
        position: position,
        spotId: spotId,
    })

    return (
        <>
            <IntroTitle>
                {title}
            </IntroTitle>
            <TypeCarouselCards status={status} lists={data} />
        </>
    )
}

export default NearbySpot