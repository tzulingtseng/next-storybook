import React from 'react';
import styled from 'styled-components';

const StyledButtonCloseWrapper = styled('div')(({ theme }) => ({
    display: 'flex',
    // position: 'absolute',
    // top: '50%',
    // right: theme.getSpacing(4),
    // transform: 'translateY(-50%)',
}));
const StyledButtonClose = styled('div')(({ theme }) => ({
    justifyContent: 'end',
    position: 'relative',
    cursor: 'pointer',
    width: 32,
    height: 32,
    borderRadius: '100%',
    border: `2px solid ${theme.colors.grey1}`,
    transition: `transform 0.5s`,
    '&:before, &:after': {
        content: '""',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transformOrigin: 'center',
        width: '60%',
        height: 2,
        backgroundColor: theme.colors.grey1,
        transition: `transform 0.5s`,
        marginTop: -1,
        marginLeft: '-30%',
    },
    '&:before': {
        transform: 'rotate(45deg)',
    },
    '&:after': {
        transform: 'rotate(-45deg)',
    },
    '&:hover:before': {
        transform: 'rotate(225deg)',
    },
    '&:hover:after': {
        transform: 'rotate(135deg)',
    },
}));

const ButtonClose = ({ onClick }) => {
    return (
        <StyledButtonCloseWrapper onClick={onClick}>
            <StyledButtonClose></StyledButtonClose>
        </StyledButtonCloseWrapper>
    );
};

export default ButtonClose;
