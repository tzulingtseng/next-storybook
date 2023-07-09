import React, { Fragment, useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import propTypes from 'prop-types';
import Icon from '../Icon';
import Typography from '../Typography';
import Collapse from '../Collapse';
import isEmpty from 'lodash/isEmpty';
import { useTranslation } from 'next-i18next';

// container

const StyledMenuContainer = styled.div`
    display: flex;
    cursor: pointer;
    flex-direction: row;
    justify-content: space-between;
    padding: 1rem 4rem;
    &:hover {
        background: ${(props) => props.theme.colors.grey0};
    }
`;

// icon
const MenuIcon = styled(Icon)`
    fontSize: 1rem,
    color: ${(props) =>
        $open ? props.theme.colors.primary : props.theme.colors.grey2};
`;

// text
const MenuText = styled.div`
    color: ${(props) =>
        props.$open ? props.theme.colors.primary : props.theme.colors.grey4};
    font-weight: 700;
    font-size: ${(props) => props.theme.fontSize.sm};
`;

// extent
const MenuExtent = styled(Icon)`
    color: ${(props) =>
        props.$open ? props.theme.colors.primary : props.theme.colors.grey4};
    opacity: ${(props) => (props.$haschild === 'true' ? 1 : 0)};
    transition: all 0.2s ease;
    transform: ${(props) => (props.$open ? 'rotate(270deg)' : 'rotate(90deg)')};
`;

const StyledDivider = styled('div')`
    border-width: 1px 0px 0px;
    border-style: solid;
    border-color: ${(props) => props.theme.colors.grey3};
    height: 0px;
    max-width: 33rem;
    width: 80%;
    margin: 1rem auto;
`;

const MenuWithChild = ({ item, haschild, hasdivder, ...props }) => {
    const [open, setOpen] = useState(false);

    const handleOnClick = () => {
        setOpen(!open);
    };

    return (
        <Fragment>
            <MenuItem
                haschild={haschild}
                open={open}
                text={item.text}
                icon={item.icon}
                onClick={handleOnClick}
            />
            <Collapse open={open}>
                <MenuItems items={item.children} />
            </Collapse>
            {hasdivder && <StyledDivider></StyledDivider>}
        </Fragment>
    );
};

const MenuItem = ({
    children,
    text,
    icon,
    url,
    open,
    haschild,
    hasdivder,
    ...props
}) => {
    return (
        <Fragment>
            <Link href={url}>
                <StyledMenuContainer {...props}>
                    {/* <MenuIcon icon={icon} /> */}
                    <MenuText $open={open} variant="content">
                        {text}
                    </MenuText>
                    <MenuExtent
                        $open={open}
                        $haschild={haschild.toString()}
                        icon="fa-angle-right"
                    />
                </StyledMenuContainer>
            </Link>
            {hasdivder && <StyledDivider></StyledDivider>}
        </Fragment>
    );
};

const MenuItems = ({ items, ...props }) => {
    const renderMenuItem = (item) => {
        const hasChild = !isEmpty(item.children) && item.children.length > 0;
        const hasDivder = item.divider === true;
        // console.log('item', item.id);
        return hasChild ? (
            <Fragment key={item.id}>
                <MenuWithChild
                    item={item}
                    haschild={hasChild}
                    hasdivder={hasDivder}
                />
            </Fragment>
        ) : (
            <MenuItem
                key={item.id}
                text={item.text}
                icon={item.icon}
                haschild={hasChild}
                hasdivder={hasDivder}
                url={item.url}
            />
        );
    };

    return items.map((itemGroup, index) => {
        if (Array.isArray(itemGroup)) {
            return itemGroup.map(renderMenuItem);
        } else {
            return renderMenuItem(itemGroup, index);
        }
    });
};

export default MenuItems;
