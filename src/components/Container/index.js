import React from 'react';
import styled from 'styled-components';

const StyledContainer = styled.div`
    position: relative;
    min-height: 100vh;
    padding-bottom: 8rem;
`;

const Container = ({ children }) => {
    return <StyledContainer>{children}</StyledContainer>;
};

export default Container;
