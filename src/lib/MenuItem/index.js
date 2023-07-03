import React, { Fragment, useState } from 'react';
import styled from 'styled-components';
import Icon from '../Icon';
import Typography from '../Typography';

// container
const StyledMenuContainer = styled.div`
    display: flex;
    cursor: pointer;
    flex-direction: row;
    justify-content: space-between;
    padding: 1rem 3rem;
`;

// icon
const MenuIcon = styled(Icon)(({ theme }) => ({
    fontSize: '1rem',
    color: theme.colors.grey2,
}));

// text
const MenuText = styled(Typography)(({ theme }) => ({
    color: theme.colors.grey2,
}));

// extent
const MenuExtent = styled(Icon)(({ theme, hasChild, open }) => ({
    color: theme.colors.grey2,
    opacity: hasChild ? 1 : 0,
    transition: 'all .2s ease',
    transform: open ? 'rotate(270deg)' : 'rotate(90deg)',
}));

const MenuItem = ({ children, text, icon, open, hasChild, ...props }) => {
    return (
        <StyledMenuContainer {...props}>
            {/* <MenuIcon icon={icon} /> */}
            <MenuText variant="content">{text}</MenuText>
            <MenuExtent open={open} hasChild={hasChild} icon="fa-angle-right" />
        </StyledMenuContainer>
    );
};

export default MenuItem;
