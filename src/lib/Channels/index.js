import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { useTranslation } from 'next-i18next';

const ChannelContainer = styled('div')`
    display: flex;
    align-items: center;
    width: 100%;
`;

const CategoryContainer = styled('div')`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 0.5rem 1rem;
`;

const ButtonContainer = styled('div')`
    width: 1.5rem;
    height: 1.5rem;
    cursor: pointer;
    position: relative;
    // border-top: 2px solid ${(props) => props.theme.colors.grey2};
    // border-bottom: 2px solid ${(props) => props.theme.colors.grey2};
    &:before,
    &:after {
        content: '';
        width: 100%;
        height: 2px;
        display: block;
        position: absolute;

        background-color: ${(props) => props.theme.colors.grey2};
    }
    &:before {
        top: 2px;
    }
    &:after {
        bottom: 2px;
    }
`;

const ButtonLine = styled('div')`
    width: 100%;
    height: 2px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background-color: ${(props) => props.theme.colors.grey2};
`;

const Item = styled('div')`
    font-size: ${(props) => props.theme.fontSize.sm};
`;

const Channels = ({ handleHamburgerContainerShow }) => {
    const { t } = useTranslation('home');
    return (
        <ChannelContainer>
            <CategoryContainer>
                <ButtonContainer onClick={handleHamburgerContainerShow}>
                    <ButtonLine></ButtonLine>
                </ButtonContainer>
                {t('category', { returnObjects: true }).map((item, i) => (
                    <Item key={i}>{item}</Item>
                ))}
            </CategoryContainer>
        </ChannelContainer>
    );
};

export default Channels;
