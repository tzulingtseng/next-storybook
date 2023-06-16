import React, { Fragment } from 'react';
import styled from 'styled-components';
import propTypes from 'prop-types';
import Card from '../Card';
import CardHeader from '../CardHeader';
import CardBody from '../CardBody';
import CardFooter from '../CardFooter';
import Button from '../Button';
import Mask from '../Mask';
import ButtonClose from '../ButtonClose';

const StyledDialog = styled('div')({
    position: 'relative',
});

const footerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
};

const Dialog = ({
    dialogOpen,
    title,
    subtitle,
    children,
    confirmText,
    cancelText,
    onConfirm,
    onCancel,
    ...props
}) => {
    if (!dialogOpen) return <Fragment />;

    return (
        <Mask>
            <StyledDialog>
                <Card style={props.style}>
                    <CardHeader title={title} subtitle={subtitle}>
                        <ButtonClose onClick={onCancel}></ButtonClose>
                    </CardHeader>
                    <CardBody>{children}</CardBody>
                    <CardFooter style={footerStyle}>
                        <Button variant="outlined" onClick={onCancel}>
                            {cancelText}
                        </Button>
                        <Button variant="filled" onClick={onConfirm}>
                            {confirmText}
                        </Button>
                    </CardFooter>
                </Card>
            </StyledDialog>
        </Mask>
    );
};

Dialog.propTypes = {
    open: propTypes.bool,
    title: propTypes.string,
    subtitle: propTypes.string,
    confirmText: propTypes.string,
    cancelText: propTypes.string,
    onConfirm: propTypes.func,
    onCancel: propTypes.func,
    onEnter: propTypes.func,
    onExited: propTypes.func,
};

Dialog.defaultProps = {
    open: true,
    title: '',
    subtitle: '',
    confirmText: '確認',
    cancelText: '取消',
    onConfirm: () => false,
    onCancel: () => false,
    onEnter: () => false,
    onExited: () => false,
};

export default Dialog;
