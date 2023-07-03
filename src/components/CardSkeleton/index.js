import React from 'react';
import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton';

const StyledCardContainer = styled('div')`
    width: 100%;
    border: 1px solid ${(props) => props.theme.colors.grey3};
    border-radius: 1rem;
    overflow: hidden;
    box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
`;

const Cover = styled.div`
    padding-bottom: 66.64%;
    width: 100%;
    position: relative;
    overflow: hidden;
    > span {
        position: absolute;
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
        top: 0;
        left: 0;
    }
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
