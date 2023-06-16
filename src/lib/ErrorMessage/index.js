import React from 'react';
import styled from 'styled-components';
import breakpoint from '../constant/breakpoint';

const StyedErrorMessage = styled('div')(({ theme, props }) => ({
    // display: props.errorMessage ? 'block' : 'none',
    color: theme.colors.danger,
    paddingLeft: theme.getSpacing(1),
    [breakpoint.mediaLG]: {
        paddingLeft: theme.getSpacing(15),
    },
}));

const ErrorMessage = ({ children, ...props }) => {
    return (
        <>
            {props.errorMessage && (
                <StyedErrorMessage {...props}>{children}</StyedErrorMessage>
            )}
        </>
    );
};

export default ErrorMessage;
