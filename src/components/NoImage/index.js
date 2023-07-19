import React from 'react';
import styled, { css } from 'styled-components';
import breakpoint from '@/lib/constant/breakpoint';
import { useTranslation } from 'next-i18next';

const StyledNoImg = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    top:0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f5fdff;
    color: #60797c;
    font-size: ${(props) => props.theme.fontSize.sm};
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
