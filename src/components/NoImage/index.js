import React from 'react';
import styled, { css } from 'styled-components';
import breakpoint from '@/lib/constant/breakpoint';
import { useTranslation } from 'next-i18next';

const StyledNoImg = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f5fdff;
    color: #60797c;
    &:hover {
        transform: scale(1.2);
        transition: transform 0.5s;
    }
`;
const StyledNoImgContent = styled.div``;

const NoImage = () => {
    const { t } = useTranslation('common');
    return (
        <StyledNoImg>
            <StyledNoImgContent>
                <div>{t(`carouselConfig.noImg`)}</div>
            </StyledNoImgContent>
        </StyledNoImg>
    );
};

export default NoImage;
