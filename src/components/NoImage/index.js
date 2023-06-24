import React from 'react';
import styled, { css } from 'styled-components';

const StyledNoImg = styled.div`
    width: 100%;
    height: calc(17.5rem * 0.66);
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f5fdff;
    color: #60797c;
`;

const NoImage = () => {
    return (
        <StyledNoImg>
            <div>
                <div>此景點尚未提供照片</div>
            </div>
        </StyledNoImg>
    );
};

export default NoImage;
