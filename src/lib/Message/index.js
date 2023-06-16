import React, { useEffect } from 'react';
import styled from 'styled-components';
import propTypes from 'prop-types';
import Icon from '../Icon';
import Typography from '../Typography';

const ICON_MAP = {
    info: 'fa-info-circle',
    success: 'fa-check-circle',
    warning: 'fa-exclamation-circle',
    danger: 'fa-exclamation-triangle',
};

const getIconColor = (theme) => ({
    info: theme.colors.info,
    success: theme.colors.success,
    warning: theme.colors.warning,
    danger: theme.colors.danger,
});

const StyledIcon = styled(Icon)(({ theme, type }) => ({
    marginRight: theme.getSpacing(1),
    color: getIconColor(theme)[type],
}));

const StyledMessageContainer = styled('div')(() => ({
    justifyContent: 'center',
    position: 'fixed',
    display: 'flex',
    width: '100vw',
    left: 0,
    top: 0,
}));

const activeStyle = (active) => {
    return active
        ? {
              top: 20,
              opacity: 1,
          }
        : {};
};

const StyledMessage = styled('div')(({ theme, active }) => ({
    position: 'fixed',
    top: 0,
    opacity: 0,
    transition: 'all .3s ease',
    zIndex: 1000,
    minWidth: 300,
    margin: 'auto',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    boxShadow: '0px 2px 3px rgba(0, 0, 0, 0.17)',
    borderRadius: theme.radius,
    backgroundColor: theme.colors.white,
    border: `1px solid ${theme.colors.grey1}`,
    padding: `${theme.getSpacing(1)}px ${theme.getSpacing(2)}px`,
    ...activeStyle(active),
}));

const Message = ({ open, onClose, duration, content, type, ...props }) => {
    useEffect(() => {
        if (open) {
            setTimeout(() => {
                onClose();
            }, duration);
        }
    }, [open]);
    return (
        <StyledMessageContainer>
            <StyledMessage {...props} active={open}>
                <StyledIcon type={type} icon={ICON_MAP[type]}></StyledIcon>
                <Typography>{content}</Typography>
            </StyledMessage>
        </StyledMessageContainer>
    );
};

Message.prototype = {
    open: propTypes.bool,
    content: propTypes.string,
    duration: propTypes.number,
    type: propTypes.oneOf(['info', 'success', 'warning', 'danger']),
};

Message.defaultProps = {
    open: false,
    content: '',
    type: 'info',
    duration: 2500,
};

export default Message;
