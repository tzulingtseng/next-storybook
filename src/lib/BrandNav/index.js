import React from 'react';
import styled from 'styled-components';

const StyledBrandNav = styled.div`
    height: 2rem;
    width: auto;
    background-color: ${(props) => props.theme.colors.transparent};
    display: flex;
    align-items: center;
    margin-left: 0px;
    transform: translateX(-1.5rem);
    transition: all 200ms ease 150ms;
`;

const BrandNav = ({ isHeaderShow, children, ...props }) => {
    return (
        <StyledBrandNav $isHeaderShow={isHeaderShow} style={props}>
            {children}
        </StyledBrandNav>
    );
};

export default BrandNav;
