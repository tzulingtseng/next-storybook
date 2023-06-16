import React, { useState, useRef, useLayoutEffect } from 'react';
import styled, { css } from 'styled-components';
import propTypes from 'prop-types';
import { useColor } from '../../hooks/useColor';

// 背景匡
const SwitchButton = styled.label`
    position: relative;
    width: ${(props) => props.$switchWidth}px;
    height: ${(props) => props.$thumbSize}px;
    display: flex;
    background-color: ${(props) => props.$switchColor};
    border-radius: ${(props) => props.$thumbSize}px;
    box-sizing: content-box;
    margin-left: 50px;
    margin-top: 20px;
    border: 4px solid ${(props) => props.$switchColor};
    transition: background-color 0.2s ease;
`;

// 控制點
const Thumb = styled.div`
    position: absolute;
    left: ${(props) =>
        props.$isChecked
            ? props.$switchWidth - props.$thumbSize + 'px'
            : '0px'};
    // 狀態開啟時，內容寬 - 控制點直徑
    top: 0;
    width: ${(props) => props.$thumbSize}px;
    height: ${(props) => props.$thumbSize}px;
    background-color: ${(props) => props.$thumbColor};
    border-radius: 100%;
    cursor: ${(props) => (props.$isDisabled ? 'not-allowed' : 'pointer')};
    transition: transform 0.2s ease;
    boxshadow: 0px 0px 2px rgba(0, 0, 0, 0.7);
`;

// 狀態的內容
const Label = styled.div`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: ${(props) =>
        props.$isChecked
            ? props.$switchWidth - props.$labelWidth + 'px'
            : '0px'}; // 狀態關閉時，控制點直徑
    padding: 0 calc(${(props) => props.$thumbSize}px / 3); // 控制點
    white-space: nowrap;
    font-size: ${(props) => props.$thumbSize * 0.83}px; // TODO:
    color: ${(props) => props.$labelColor};
`;

/**
 * Switch 元件是一個開關的選擇器。 在我們表示開關狀態，或兩種狀態之間的切換時，很適合使用。和 Checkbox 的區別是， Checkbox 一般只用來標記狀態是否被選取， 需要提交之後才會生效，而 Switch 則會在觸發的當下直接觸發狀態的改變。
 */
const Switch = ({
    setSwitchColor,
    setThumbColor,
    setLabelColor,
    themeColor,
    size,
    isDisabled,
    checkedChildren,
    unCheckedChildren,
    ...props
}) => {
    const labelRef = useRef(null);
    const { makeColor } = useColor();

    const [labelWidth, setLabelWidth] = useState(0);
    const [isChecked, setIsChecked] = useState(false);
    const switchColor = makeColor({
        themeColor: setSwitchColor,
        isDisabled: !isChecked,
    });
    const thumbColor = makeColor({ themeColor: setThumbColor });
    const labelColor = makeColor({ themeColor: setLabelColor });

    const handleChecked = () => setIsChecked(!isChecked);

    const thumbSize = size === 'small' ? 12 : 18;
    const switchWidth = labelWidth + thumbSize;

    useLayoutEffect(() => {
        // 當 label 為空字串，留一點寬度讓 switch 不要變得太短，能夠相對於 thumbSize 來計算，未來如果我想要微調 switch 的大小的時候，我只要去調整 thumb size，其他的部分就能夠相對於 thumb size 的比例做調整
        const minLabelSize = thumbSize * 1.2;
        const currentLabelWidth = labelRef?.current?.clientWidth;
        if (currentLabelWidth) {
            setLabelWidth(
                currentLabelWidth < minLabelSize
                    ? minLabelSize
                    : labelRef?.current?.clientWidth
            );
        }
    }, [labelRef?.current?.clientWidth, thumbSize]);

    return (
        <SwitchButton
            $isChecked={isChecked}
            $switchWidth={switchWidth}
            $thumbSize={thumbSize}
            $switchColor={switchColor}
            onClick={isDisabled ? null : handleChecked}
        >
            <Thumb
                $isChecked={isChecked}
                $isDisabled={isDisabled}
                $switchWidth={switchWidth}
                $thumbSize={thumbSize}
                $thumbColor={thumbColor}
            ></Thumb>
            <Label
                $isChecked={isChecked}
                ref={labelRef}
                $switchWidth={switchWidth}
                $thumbSize={thumbSize}
                $labelWidth={labelWidth}
                $labelColor={labelColor}
            >
                {checkedChildren ? checkedChildren : unCheckedChildren}
            </Label>
        </SwitchButton>
    );
};

Switch.propTypes = {
    /**
     * 背景匡顏色
     */
    setSwitchColor: propTypes.oneOfType([
        propTypes.oneOf(['primary', 'secondary', 'white']),
        propTypes.string,
    ]),
    /**
     * 控制點顏色
     */
    setThumbColor: propTypes.oneOfType([
        propTypes.oneOf(['primary', 'secondary', 'white']),
        propTypes.string,
    ]),
    /**
     * 文字顏色
     */
    setLabelColor: propTypes.oneOfType([
        propTypes.oneOf(['primary', 'secondary', 'white']),
        propTypes.string,
    ]),
    /**
     * 禁用狀態
     */
    isDisabled: propTypes.bool,
    /**
     * 開啟狀態的內容
     */
    checkedChildren: propTypes.string,
    /**
     * 關閉狀態的內容
     */
    unCheckedChildren: propTypes.string,
    /**
     * 	開關大小
     */
    size: propTypes.oneOf[('default', 'small')],
    /**
     * 狀態改變的 callback function
     */
    onChange: propTypes.func,
};

Switch.defaultProps = {
    setSwitchColor: 'primary',
    setThumbColor: 'white',
    setLabelColor: 'white',
    isDisabled: false,
    checkedChildren: '',
    unCheckedChildren: '',
    size: 'default',
    onChange: () => {},
};
export default Switch;
