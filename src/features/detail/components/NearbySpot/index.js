import React from 'react'
import styled from 'styled-components';
import useGetNearybySpot from '../../hooks/useGetNearybySpot';
import TypeCarouselCards from '@/components/TypeCarouselCards';

const IntroTitle = styled.div`
    font-size: ${(props) => props.theme.fontSize.lg};
    font-weight: 600;
    margin: 1.5rem 0;
`;

const NearbySpot = ({ queryType, position }) => {
    console.log('position', position);
    /** ---------------------------------------------------------------------------------------------
     * Head title type
     */
    const handleHeadType = () => {
        switch (queryType) {
            case 'scenicSpot':
                // return t('scenic_spot.more_spot');
                return '景點'
            case 'restaurant':
                // return t('restaurant.more_spot');
                return '餐廳'
            case 'activity':
                // return t('activity.more_spot');
                return '活動'
            default:
                console.log('No match title');
        }
    };
    const { status, data, error } = useGetNearybySpot({
        queryType: queryType,
        position: position,
    })

    return (
        <>
            <IntroTitle>
                附近{handleHeadType()}
            </IntroTitle>
            <TypeCarouselCards status={status} lists={data} />
        </>
    )
}

export default NearbySpot