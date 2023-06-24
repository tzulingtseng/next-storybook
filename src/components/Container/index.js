import React from 'react';
import styled, { css } from 'styled-components';
import breakpoint from '@/lib/constant/breakpoint';

const StyledContainer = styled('div')`
    max-width: auto;
    width: 90%;
    margin: 0 auto;
    ${breakpoint.mediaMD}{
        max-width: 64rem;
        width: 100%;
    },
    ${breakpoint.mediaLG}{
        max-width: 75rem;
        width: 100%;
    },
`;

const Container = ({ children }) => {
    return <StyledContainer>{children}</StyledContainer>;
};

export default Container;
