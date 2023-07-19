import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import breakpoint from '@/lib/constant/breakpoint';

const errorStyle = css`
    border: 1px solid ${(props) => props.theme.color.error};
    &:hover {
        border: 1px solid ${(props) => props.theme.color.error};
    }
`;

const disabledStyle = css`
    border: 1px solid ${(props) => props.theme.color.disable};
    cursor: not-allowed;
    background: ${(props) => props.theme.color.disable}22;
    .text-field__input {
        cursor: not-allowed;
        background: none;
    }
    &:hover {
        border: 1px solid ${(props) => props.theme.color.disable};
    }
`;

const StyledTextField = styled.div`
    display: inline-flex;
    align-items: center;
    border: 1px solid ${(props) => props.theme.colors.grey3};
    background-color: ${(props) => props.theme.colors.white};
    border-radius: 0.5rem;
    padding: 0rem 0.75rem;
    width: 100%;
    margin-bottom:1rem;
    height: 100%;
    &:hover {
        border: 1px solid ${(props) => props.theme.colors.grey2};
    }

    ${(props) => (props.$isError ? errorStyle : null)}
    ${(props) => (props.$isDisabled ? disabledStyle : null)}
    ${breakpoint.mediaSM}{
        width: 45%;
        
    }
`;

const Input = styled.input`
    outline: none;
    border: none;
    font-size: ${(props) => props.theme.fontSize.sm};
    color: #333;
    width: 100%;
    // border: 1px solid #ddd;
    background-color: ${(props) => props.theme.colors.white};
`;

/**
 * `TextField` 是一個允許用戶輸入和編輯文字的元件。
 */
const TextField = ({
    className,
    prefix,
    suffix,
    isError,
    isDisabled,
    ...props
}) => (
    <StyledTextField
        className={className}
        $isError={isError}
        $isDisabled={isDisabled}
    >
        {prefix}
        <Input
            type="text"
            className="text-field__input"
            disabled={isDisabled}
            {...props}
        />
        {suffix}
    </StyledTextField>
);

TextField.propTypes = {
    /**
     * 客製化 class 樣式
     */
    className: PropTypes.string,
    /**
     * 前綴元件
     */
    prefix: PropTypes.element,
    /**
     * 後綴元件
     */
    suffix: PropTypes.element,
    /**
     * 佔位文字
     */
    placeholder: PropTypes.string,
    /**
     * 錯誤狀態
     */
    isError: PropTypes.bool,
    /**
     * 禁用狀態
     */
    isDisabled: PropTypes.bool,
    /**
     *  狀態改變的 callback function
     */
    onChange: PropTypes.func,
};

TextField.defaultProps = {
    className: '',
    prefix: null,
    suffix: null,
    placeholder: '',
    isError: false,
    isDisabled: false,
    onChange: () => { },
};

export default TextField;
