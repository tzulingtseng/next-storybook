import React from 'react';
import styled from 'styled-components';
import breakpoint from '@/lib/constant/breakpoint';

const StyledContainer = styled.div`
    position: relative;
    min-height: 100vh;
    padding-bottom: 8rem;
    ${breakpoint.mediaXS} {
        padding-bottom: 5rem;
    }
`;

const Container = ({ children }) => {
    return <StyledContainer>{children}</StyledContainer>;
};

export default Container;
