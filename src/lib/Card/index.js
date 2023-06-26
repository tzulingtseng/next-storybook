import React from 'react';
import styled, { css } from 'styled-components';
import Skeleton from 'react-loading-skeleton';
import breakpoint from '../constant/breakpoint';
import propTypes from 'prop-types';

const verticalStyle = css`
    display: block;
`;

const horizontalStyle = css`
    display: inline-flex;
`;

const horizontalReverseStyle = css`
    display: inline-flex;
    flex-direction: row-reverse;
`;

const variantMap = {
    vertical: verticalStyle,
    horizontal: horizontalStyle,
    'horizontal-reverse': horizontalReverseStyle,
};

const StyledCardContainer = styled('div')`
    width: 100%;
    border: 1px solid ${(props) => props.theme.colors.grey3};
    border-radius: 1rem;
    overflow: hidden;
    ${(props) => variantMap[props.$variant] || variantMap['vertical']}
    ${breakpoint.mediaMD} {
        width: 14.5rem;
    }
`;

// 卡片封面 img or video from props ReactNode
const Cover = styled.div`
    overflow: hidden;
    width: 100%;
    height: calc(100% * 0.66);
    object-fit: cover;
    img {
        width: 100%;
        height: 100%;
        display: block;
        object-fit: cover;
    }
    ${breakpoint.mediaMD} {
        height: calc(14.5rem * 0.66);
    }
`;

// 卡片資訊
const CardContent = styled.div``;

// icons
const SpaceBetween = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

/**
 * `Card` 是一個可以顯示單個主題內容及操作的元件，通常這個主題內容包含圖片、標題、描述或是一些操作。
 */
const Card = ({ variant, cover, content, footer, children, ...props }) => {
    return (
        <StyledCardContainer $variant={variant}>
            <Cover>{cover}</Cover>
            {/* <CardContent>{content}</CardContent> */}
            {/* <CardContent>
                <div>連江縣莒光鄉田澳村67號</div>
                <div>開放時間</div>
                <div>上午8:00~下午6:30</div>
            </CardContent> */}
            <SpaceBetween>
                {children}
                {footer}
            </SpaceBetween>
        </StyledCardContainer>
    );
};

Card.propTypes = {
    variantb: propTypes.string,
};

Card.defaultProps = {
    variant: 'vertical',
};

export default Card;
