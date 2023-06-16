import React, { useRef, useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';
import propTypes from 'prop-types';

const StyledContent = styled('div')(({ theme, open, height }) => ({
    height,
    overflow: 'hidden',
    transition: 'all .2s ease',
}));

const getClientHeight = (refEle) => () => {
    return refEle ? refEle.current.clientHeight : 0;
};

const onOpen = (setHeight) => {
    setTimeout(() => {
        setHeight('auto');
    }, 100);
};

const onClose = (setHeight, handleGetClientHeight) => {
    setHeight(handleGetClientHeight());
    setTimeout(() => {
        setHeight(0);
    }, 100);
};

const Collapse = ({ open, children }) => {
    const refEle = useRef(null);
    const [height, setHeight] = useState(0);

    const setHeightHandler = useCallback(() => {
        const handleGetClientHeight = getClientHeight(refEle);
        setHeight(handleGetClientHeight());
        open ? onOpen(setHeight) : onClose(setHeight, handleGetClientHeight);
    }, [refEle, open]);

    useEffect(() => {
        setHeightHandler();
    }, [setHeightHandler]);

    return (
        <StyledContent open={open} height={height}>
            <div ref={refEle}>{children}</div>
        </StyledContent>
    );
};

Collapse.propTypes = {
    open: propTypes.bool,
};

Collapse.defaultProps = {
    open: false,
};

export default Collapse;
