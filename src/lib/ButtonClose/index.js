import React from 'react';
import styled from 'styled-components';

const StyledButtonClose = styled.div`
    position: relative;
    cursor: pointer;
    width: 2rem;
    height: 2rem;
    border-radius: 100%;
    border: 2px solid ${(props) => props.theme.colors.grey3};
    transition: transform 0.5s;
    &:before,
    &:after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform-origin: center;
        width: 60%;
        height: 2px;
        background-color: ${(props) => props.theme.colors.grey3};
        transition: transform 0.5s;
        margin-top: -1px;
        margin-left: -30%;
    }
    &:before {
        transform: rotate(45deg);
    }
    &:after {
        transform: rotate(-45deg);
    }
    &:hover:before {
        transform: rotate(225deg);
    }
    &:hover:after {
        transform: rotate(135deg);
    }
`;

const ButtonClose = ({ onClick }) => {
    return <StyledButtonClose onClick={onClick}></StyledButtonClose>;
};

export default ButtonClose;
