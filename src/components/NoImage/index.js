import React from 'react';
import styled, { css } from 'styled-components';
import breakpoint from '@/lib/constant/breakpoint';

const StyledNoImg = styled.div`
    width: 100%;
    padding-top: 66.64%;
    background-color: #f5fdff;
    color: #60797c;
    position: relative;
    ${breakpoint.mediaMD} {
        height: 14.5rem;
    }
`;
const StyledNoImgContent = styled.div`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
`;

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
