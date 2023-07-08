import React, { useState } from 'react';
import styled, { useTheme } from 'styled-components';
import Icon from '@/lib/Icon';

import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

const SelectWrapper = styled.div`
    width: 8rem; // TODO:確認寬度
    height: 100%;
    display: inline-block; // TODO:完成後，改成
    position: relative;
    cursor: pointer;
    font-size: ${(props) => props.theme.fontSize.sm};
    // TODO:refactor reset
    ul,
    li {
        margin: 0;
        padding: 0;
        list-style: none;
    }
`;

const SelectBoxWrapper = styled.div`
    width: 100%;
    height: 100%;
    border-radius: 0.5rem;
    display: inline-flex;
    margin-bottom: 0.25rem;
    padding: 0rem 0.75rem;
    background-color: ${(props) => props.theme.colors.white};
    z-index: 1;
    position: relative;
    border: 1px solid
        ${(props) =>
            props.$isOpen
                ? props.theme.colors.grey2
                : props.theme.colors.grey3};
    &:hover {
        border: 1px solid ${(props) => props.theme.colors.grey2};
    }
`;

const SelectBox = styled.div`
    width: 100%;
    display: inline-flex;
    justify-content: space-between;
    align-items: center;
`;

const SelectItems = styled.div`
    overflow-y: scroll;
    text-align: left;
    position: absolute;
    transition: all 0.2s ease;
    transform: ${(props) =>
        props.$isOpen ? 'translateY(0%)' : 'translateY(-30%)'};
    display: ${(props) => (props.$isOpen ? 'block' : 'none')};
    opacity: ${(props) => (props.$isOpen ? 1 : 0)};
    width: 100%;
    height: 400%;

    border: 1px solid ${(props) => props.theme.colors.grey3};
    background-color: ${(props) => props.theme.colors.white};
    box-shadow: rgba(0, 0, 0, 0.12) 0px 3px 6px -4px,
        rgba(0, 0, 0, 0.08) 0px 6px 16px 0px,
        rgba(0, 0, 0, 0.05) 0px 9px 28px 8px;
    border-radius: 0.5rem;
    li {
        width: 100%;
        padding: 0.5rem 0.75rem;
        // border-bottom: 1px solid ${(props) => props.theme.colors.grey3};
    }
    li:last-child {
        border-bottom: none;
    }
    li:hover {
        background-color: ${(props) => props.theme.colors.grey0};
    }
`;

const SelectIcon = styled(Icon)`
    transition: all 0.2s ease;
    transform: ${(props) =>
        props.$isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
`;

const Select = ({
    placeholder,
    options,
    selectedValue,
    setSelectedValue,
    selectedCounty,
    setSelectedCounty,
    ...props
}) => {
    const { locale } = useRouter();
    const [open, setOpen] = useState(false);
    const [isAllCounty, setisAllCounty] = useState(false);
    const theme = useTheme();

    const { t } = useTranslation('common');

    const selectCounty = (e) => {
        if (e.target.innerHTML === t('countyOptions.all')) {
            setSelectedCounty('');
            setisAllCounty(true);
        } else {
            setSelectedCounty(e.target.innerHTML);
        }

        setOpen(false);
    };

    return (
        <SelectWrapper>
            <SelectBoxWrapper
                role="button"
                onClick={() => {
                    setOpen(!open);
                }}
                $isOpen={open}
            >
                <SelectBox>
                    <div>
                        {selectedCounty !== ''
                            ? selectedCounty
                            : isAllCounty
                            ? t('countyOptions.all')
                            : t('countyOptions.placeholder')}
                    </div>
                    <SelectIcon
                        $isOpen={open}
                        icon="fa-angle-down"
                        size="1rem"
                    />
                </SelectBox>
            </SelectBoxWrapper>
            {/* options */}
            <SelectItems $isOpen={open}>
                <ul>
                    <li
                        onClick={(e) => {
                            selectCounty(e);
                        }}
                    >
                        {t('countyOptions.all')}
                    </li>
                    {t('countyOptions.area', {
                        returnObjects: true,
                    }).map((item) => {
                        return (
                            <li
                                role="option"
                                key={item.id}
                                onClick={(e) => {
                                    selectCounty(e);
                                }}
                                // TODO:優化寫法，placeholder 的選項需亮色
                                // style={{
                                //     color:
                                //         selectedCounty === item
                                //             ? theme.colors.primary
                                //             : theme.colors.black,
                                // }}
                            >
                                {item.name}
                            </li>
                        );
                    })}
                </ul>
            </SelectItems>
        </SelectWrapper>
    );
};

export default Select;
