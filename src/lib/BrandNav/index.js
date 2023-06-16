import React from 'react';
import styled from 'styled-components';

const StyledBrandNav = styled('div')(({ theme, ...props }) => ({
    height: 32,
    width: 'auto',
    backgroundColor: theme.colors.white,
    display: 'flex',
    alignItems: 'center',
    marginLeft: props.$isHeaderShow ? '0px' : '24px', // 24px
    transform: props.$isHeaderShow ? 'translateX(-24px)' : 'translateX(0px)', // 0px
    transition: 'all 200ms ease 150ms',
}));

const BrandNav = ({ isHeaderShow, children, ...props }) => {
    return (
        <StyledBrandNav $isHeaderShow={isHeaderShow} style={props}>
            {children}
        </StyledBrandNav>
    );
};

export default BrandNav;
