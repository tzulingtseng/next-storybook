import React from 'react';
import styled from 'styled-components';
import propTypes from 'prop-types';

const StyledTypography = styled('p')(
    ({ theme, style, variant = 'content' }) => ({
        margin: 0,
        color: theme.colors.black,
        ...theme.typography[variant],
        ...style,
    })
);

const Typography = ({ children, ...props }) => {
    return <StyledTypography {...props}>{children}</StyledTypography>;
};

Typography.propTypes = {
    style: propTypes.object,
    variant: propTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'content']),
};

Typography.defaultProps = {
    style: {},
    variant: 'content',
};

export default Typography;
