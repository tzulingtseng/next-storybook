import React from 'react';
import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton';

const StyledCardContainer = styled('div')`
    width: 14.5rem;
    border: 1px solid ${(props) => props.theme.colors.grey3};
    border-radius: 1rem;
    overflow: hidden;
    display: inline-block;
    .react-loading-skeleton {
        display: block;
    }
`;

const Cover = styled.div`
    overflow: hidden;
    width: 100%;
    height: calc(14.5rem * 0.66);
    object-fit: cover;
`;

const SpaceBetween = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0.75rem 1rem;
    .react-loading-skeleton {
        margin-bottom: -0.1rem;
    }
`;

const CardSkeleton = () => {
    return (
        <StyledCardContainer>
            <Cover>
                <Skeleton height="100%" />
            </Cover>
            <SpaceBetween>
                <Skeleton count={3} height="1rem" />
                <Skeleton height="2.5rem" />
            </SpaceBetween>
        </StyledCardContainer>
    );
};

export default CardSkeleton;
