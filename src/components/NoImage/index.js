import React from 'react';
import styled, { css } from 'styled-components';
import breakpoint from '@/lib/constant/breakpoint';

const StyledNoImg = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f5fdff;
    color: #60797c;
`;
const StyledNoImgContent = styled.div``;

const NoImage = () => {
    return (
        <StyledNoImg>
            <StyledNoImgContent>
                <div>此景點尚未提供照片</div>
            </StyledNoImgContent>
        </StyledNoImg>
    );
};

export default NoImage;
