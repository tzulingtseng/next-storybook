import React from 'react';
import styled from 'styled-components';
import breakpoint from '@/lib/constant/breakpoint';

const StyledWrapper = styled('div')`
    max-width: auto;
    width: 90%;
    margin: 0 auto;
    ${breakpoint.mediaMD} {
        max-width: 64rem;
        width: 100%;
    }
`;

const Wrapper = ({ children }) => {
    return <StyledWrapper>{children}</StyledWrapper>;
};

export default Wrapper;
