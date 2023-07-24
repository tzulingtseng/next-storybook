import React, { Fragment } from 'react'
import styled from 'styled-components';
import useGetNearybySpot from '../../hooks/useGetNearybySpot';
import TypeCarouselCards from '@/components/TypeCarouselCards';

const IntroTitle = styled.div`
    font-size: ${(props) => props.theme.fontSize.lg};
    font-weight: 600;
    margin: 1.5rem 0;
`;

const NearbySpot = ({ queryType, position, spotId, title, bageText }) => {
    const { status, data, error } = useGetNearybySpot({
        queryType: queryType,
        position: position,
        spotId: spotId,
    })

    return (
        <>
            {status === 'success' && data && data.length > 0 &&
                <Fragment>
                    <IntroTitle>
                        {title}
                    </IntroTitle>
                    <TypeCarouselCards
                        hasPagination={true}
                        status={status}
                        lists={data}
                        detailBageText={bageText}
                        type={queryType}
                    />  </Fragment>}
        </>
    )
}

export default NearbySpot