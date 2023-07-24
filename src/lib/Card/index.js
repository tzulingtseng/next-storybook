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
    border: 1px solid ${(props) => props.theme.colors.grey3};
    border-radius: 1rem;
    overflow: hidden;
    box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
    ${(props) => variantMap[props.$variant] || variantMap['vertical']};
`;

// 卡片封面 img or video from props ReactNode
const Cover = styled.div`
    padding-bottom: 66.64%;
    width: 100%;
    position: relative;
    overflow: hidden;
    img {
        position: absolute;
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
        top: 0;
        left: 0;
        &:hover {
            transform: scale(1.2);
            transition: transform 0.5s;
        }
    }
`;
const Badge = styled.span`
    position: absolute;
    left: 0.5rem;
    bottom: 0.5rem;
    margin-right:0.2rem;
    font-size: 1rem;
    font-weight: 700;
    color: ${(props) => props.theme.colors.white};
    text-shadow: 0 1px 2px #e18d0e;
    padding: 0.1rem 0.5rem;
    border-radius: 1rem;
    background: linear-gradient(45deg, #ffaf1e, #ffd56e);
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
const Card = ({
    variant,
    cover,
    content,
    footer,
    badgeNumber,
    children,
    bageText,
    ...props
}) => {
    return (
        <StyledCardContainer $variant={variant}>
            <Cover>
                {cover}
                {bageText && <Badge >{bageText}</Badge>}
            </Cover>
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
