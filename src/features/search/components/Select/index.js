import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import breakpoint from '@/lib/constant/breakpoint';
import Icon from '@/lib/Icon';

import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

const SelectWrapper = styled.div`
    width: ${(props) => props.$locale === 'en' ? '12rem' : '9rem'};
    height: 100%;
    display: inline-block;
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
    padding: 0.75rem 0.75rem;
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
    max-height: 10rem;
    z-index:1;
    border: 1px solid ${(props) => props.theme.colors.grey3};
    background-color: ${(props) => props.theme.colors.white};
    box-shadow: rgba(0, 0, 0, 0.12) 0px 3px 6px -4px,
        rgba(0, 0, 0, 0.08) 0px 6px 16px 0px,
        rgba(0, 0, 0, 0.05) 0px 9px 28px 8px;
    border-radius: 0.5rem;
    ul{
        li{
            width: 100%;
            padding: 0.5rem 0.75rem;
            &:last-child {
                border-bottom: none;
            }
            &:hover {
                background-color: ${(props) => props.theme.colors.grey0};
            }
        }
    }
`;

const SelectItemsLi = styled.li`
    color:${(props) => props.$isSelected ? props.theme.colors.primary : props.theme.colors.black};
`

const SelectIcon = styled(Icon)`
    transition: all 0.2s ease;
    transform: ${(props) =>
        props.$isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
`;

const Select = ({
    setSelectedCountyText,
    setSelectedCountyValue,
    selectedCountyValue,
    locale
}) => {
    const [open, setOpen] = useState(false);
    const [selectedCountyIndex, setSelectedCountyIndex] = useState(0);

    const countySelectRef = useRef(null)
    const countyOptionsRef = useRef(null)

    const { t } = useTranslation('common');

    const selectCounty = (e, index) => {
        if (e.target.innerHTML === t('countyOptions.all')) {
            setSelectedCountyText('');
            setSelectedCountyValue('');
        } else {
            setSelectedCountyText(e.target.innerHTML);
            setSelectedCountyValue(e.target.attributes.value.value);
            setSelectedCountyIndex(index);
        }

        setOpen(false);
    };

    // 監聽點擊事件，以便在點擊空白處時關閉選單
    useEffect(() => {

        const handleClickOutside = (event) => {
            if (
                countyOptionsRef.current &&
                !countyOptionsRef.current.contains(event.target) &&
                countySelectRef.current &&
                !countySelectRef.current.contains(event.target)
            ) {
                setOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);

        // 將列表滾動到選擇的縣市位置
        // if (open && selectedCountyIndex !== undefined) {
        //     const liElement = countyOptionsRef.current.querySelector(
        //         `ul > li:nth-child(${selectedCountyIndex + 1})`
        //     );
        //     if (liElement) {
        //         liElement.scrollIntoView({
        //             behavior: 'auto',
        //             block: 'nearest',
        //         });
        //     }
        // }

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [open, selectedCountyIndex]);

    let countyData = t('countyOptions.area', {
        returnObjects: true,
    }).filter((item) => selectedCountyValue === item.value)[0];
    let searchedCountyText = countyData ? countyData.name : '';

    return (
        <SelectWrapper $locale={locale}>
            <SelectBoxWrapper
                role="button"
                onClick={() => {
                    setOpen(!open);
                }}
                $isOpen={open}
                ref={countySelectRef}
            >
                <SelectBox>
                    <div>
                        {selectedCountyValue
                            ? searchedCountyText :
                            t('countyOptions.all')}
                    </div>
                    <SelectIcon
                        $isOpen={open}
                        icon="fa-angle-down"
                        size="1rem"
                    />
                </SelectBox>
            </SelectBoxWrapper>
            {/* options */}
            {open && <SelectItems $isOpen={open} ref={countyOptionsRef}>
                <ul >
                    <SelectItemsLi
                        onClick={(e) => {
                            selectCounty(e);
                        }}
                        $isSelected={selectedCountyValue === '' || selectedCountyValue === undefined}
                    >
                        {t('countyOptions.all')}
                    </SelectItemsLi>
                    {t('countyOptions.area', {
                        returnObjects: true,
                    }).map((item, index) => {
                        return (
                            <SelectItemsLi
                                role="option"
                                key={item.id}
                                value={item.value}
                                onClick={(e) => {
                                    selectCounty(e, index);
                                }}
                                $isSelected={selectedCountyValue === item.value}
                            >
                                {item.name}
                            </SelectItemsLi>
                        );
                    })}
                </ul>
            </SelectItems>}
        </SelectWrapper>
    );
};

export default Select;
