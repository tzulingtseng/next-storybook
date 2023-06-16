import React from 'react';
import styled, { css } from 'styled-components';
import ButtonClose from '../ButtonClose';

const MenuContainer = styled.div`
    width: 280px;
    // height: 100%;
    max-height: 100vh;
    overflow-y: scroll;
    overscroll-behavior: contain;
    background-color: rgb(255, 255, 255);
    text-align: left;
    padding: 24px 0;
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
