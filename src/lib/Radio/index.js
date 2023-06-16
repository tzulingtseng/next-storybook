import React from 'react';
import styled, { css } from 'styled-components';
import propTypes from 'prop-types';

const StyledRaio = styled.label`
    position: relative;
    display: flex;
    align-items: center;
    padding-left: 30px;
    opacity: 1;

    &:before {
        content: '';
        position: 'absolute';
        left: 0;
        width: 20px;
        height: 20px;
        border-radius: 100%;
        background-color: #60c4f8;
    }
`;

const Radio = () => {
    return <StyledRaio></StyledRaio>;
};

export default Radio;
