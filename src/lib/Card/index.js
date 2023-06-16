import React from 'react';
import styled, { css } from 'styled-components';
import propTypes from 'prop-types';

const verticalStyle = css`
    display: inline-flex;
    flex-direction: column;
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
    border: 1px solid #ddd;
    border-radius: 4px;
    overflow: hidden;
    ${(props) => variantMap[props.$variant] || variantMap['vertical']}
`;

// 卡片封面 img or video from props ReactNode
const Cover = styled.div`
    overflow: hidden;
    width: 300px;
    img {
        width: 100%;
        display: block;
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
    console.log('variant', variant);
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
