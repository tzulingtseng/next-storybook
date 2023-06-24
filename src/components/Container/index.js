import React from 'react';
import styled, { css } from 'styled-components';

const StyledContainer = styled('div')`
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;
    // height: auto;
`;

const Container = ({ children }) => {
    return <StyledContainer>{children}</StyledContainer>;
};

export default Container;
