import React from 'react';
import styled, { css } from 'styled-components';
import ButtonClose from '../ButtonClose';

const MenuContainer = styled.div`
    width: 100%;
    // height: 100%;
    max-height: 100vh;
    overflow-y: scroll;
    overscroll-behavior: contain;
    background-color: ${(props) => props.theme.colors.white};
    text-align: left;
    padding: 1.5rem 0;
`;

const Menu = ({ children, ...props }) => {
    return (
        <MenuContainer {...props}>
            {children}
            {/* <ButtonClose></ButtonClose> */}
            {/* icon */}
            {/* 最新 */}
            {/* 第一區塊 */}
            {/* 第二區塊 */}
            {/* 關於我們 */}
            {/* 社群 icons */}
            {/* buttons */}
        </MenuContainer>
    );
};

export default Menu;
