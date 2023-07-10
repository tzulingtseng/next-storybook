import React from 'react';
import styled from 'styled-components';
import propTypes from 'prop-types';
import '@fortawesome/fontawesome-free/css/all.css';

const StyledIcon = styled('span')(({ size: fontSize, style }) => ({
    fontSize,
    ...style,
}));

const Icon = ({ icon, ...props }) => {
    return (
        <StyledIcon {...props}>
            <i className={`fas ${icon}`}></i>
        </StyledIcon>
    );
};

Icon.propTypes = {
    icon: propTypes.string,
    size: propTypes.string,
    style: propTypes.object,
};

Icon.defaultProps = {
    icon: '',
    size: '1rem',
    style: {},
};

export default Icon;
