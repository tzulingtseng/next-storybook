import React, { useState, useEffect } from 'react';
import styled, { useTheme } from 'styled-components';
import Icon from '@/lib/Icon';

import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

const SelectWrapper = styled.div`
    width: 4rem; // TODO:確認寬度
    display: inline-block; // TODO:完成後，改成
    border-radius: 0.25rem;
    position: relative;
    cursor: pointer;
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
    margin-bottom: 0.25rem;
    padding: 0.5rem 0.75rem;
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
    position: absolute;
    transition: all 0.2s ease;
    transform: ${(props) =>
        props.$isOpen ? 'translateY(0%)' : 'translateY(-30%)'};
    display: ${(props) => (props.$isOpen ? 'block' : 'none')};
    opacity: ${(props) => (props.$isOpen ? 1 : 0)};
    width: 100%;
    height: auto;
    border: 1px solid ${(props) => props.theme.colors.grey3};
    background-color: ${(props) => props.theme.colors.white};
    box-shadow: rgba(0, 0, 0, 0.12) 0px 3px 6px -4px,
        rgba(0, 0, 0, 0.08) 0px 6px 16px 0px,
        rgba(0, 0, 0, 0.05) 0px 9px 28px 8px;
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

const Select = ({ placeholder, options, ...props }) => {
    const [open, setOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState('zhHant');
    const [selectedItem, setSelectedItem] = useState('中');
    const [active, setActive] = useState(false);
    const theme = useTheme();
    const { locale, locales, push } = useRouter();
    const { t } = useTranslation('common');
    // const changeLanguage = (l, selectedValue) => {
    //     console.log('changeLanguage', selectedValue);
    //     push('/travel', undefined, { locale: selectedValue });
    // };
    const handleSelect = (e) => {
        setSelectedItem(e.target.innerText);
        setSelectedValue(e.currentTarget.getAttribute('value'));
        setOpen(false);
    };
    // useEffect(() => {
    //     push('/travel', undefined, { locale: selectedValue });
    // }, [selectedValue]);
    return (
        <SelectWrapper>
            {/* placeholder */}
            <SelectBoxWrapper
                role="button"
                onClick={() => {
                    setOpen(!open);
                }}
                $isOpen={open}
            >
                <SelectBox>
                    <div>
                        {selectedItem
                            ? t(`langOptions.${selectedValue}`)
                            : t(`langOptions.placeholder`)}
                    </div>
                    <SelectIcon $isOpen={open} icon="fa-angle-down" size={20} />
                </SelectBox>
            </SelectBoxWrapper>
            {/* options */}
            <SelectItems $isOpen={open}>
                <ul>
                    {options.map((item, i) => (
                        <li
                            role="option"
                            key={i}
                            value={item.value}
                            onClick={(e) => {
                                handleSelect(e);
                            }}
                            // TODO:優化寫法，placeholder 的選項需亮色
                            style={{
                                color:
                                    selectedItem === item.label
                                        ? theme.colors.primary
                                        : theme.colors.black,
                            }}
                        >
                            {t(`langOptions.${item.value}`)}
                        </li>
                    ))}
                </ul>
            </SelectItems>
        </SelectWrapper>
    );
};

export default Select;
