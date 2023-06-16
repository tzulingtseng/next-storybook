import React, { Fragment, useState } from 'react';
import styled from 'styled-components';
import propTypes from 'prop-types';
import Icon from '../Icon';
import Typography from '../Typography';
import Collapse from '../Collapse';
import isEmpty from 'lodash/isEmpty';
import { useTranslation } from 'next-i18next';

// container
const StyledMenuContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    cursor: 'pointer',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: `${theme.getSpacing(1)}px ${theme.getSpacing(4)}px`,
    '&:hover': {
        backgroundColor: theme.colors.grey0,
    },
}));

// icon
const MenuIcon = styled(Icon)(({ theme }) => ({
    fontSize: 14,
    color: theme.colors.grey2,
}));

// text
const MenuText = styled(Typography)(({ theme, open }) => ({
    color: open ? theme.colors.primary : theme.colors.black,
    fontWeight: 700,
}));

// extent
const MenuExtent = styled(Icon)(({ theme, haschild, open }) => ({
    color: open ? theme.colors.primary : theme.colors.black,
    opacity: haschild === 'true' ? 1 : 0,
    transition: 'all .2s ease',
    transform: open ? 'rotate(270deg)' : 'rotate(90deg)',
}));

const StyledDivider = styled('div')`
    border-width: 1px 0px 0px;
    border-style: solid;
    border-color: rgb(216, 216, 216);
    height: 0px;
    max-width: 216px;
    width: 100%;
    margin: 16px auto;
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
    open,
    haschild,
    hasdivder,
    ...props
}) => {
    return (
        <Fragment>
            <StyledMenuContainer {...props}>
                {/* <MenuIcon icon={icon} /> */}
                <MenuText open={open} variant="content">
                    {text}
                </MenuText>
                <MenuExtent
                    open={open}
                    haschild={haschild.toString()}
                    icon="fa-angle-right"
                />
            </StyledMenuContainer>
            {hasdivder && <StyledDivider></StyledDivider>}
        </Fragment>
    );
};

const MenuItems = ({ items, ...props }) => {
    const renderMenuItem = (item, i) => {
        const hasChild = !isEmpty(item.children) && item.children.length > 0;
        const hasDivder = item.divider === true;
        return hasChild ? (
            <Fragment>
                {' '}
                <MenuWithChild
                    key={`MenuItems_${i}`}
                    item={item}
                    haschild={hasChild}
                    hasdivder={hasDivder}
                />
            </Fragment>
        ) : (
            <MenuItem
                key={`MenuItem_${i}`}
                text={item.text}
                icon={item.icon}
                haschild={hasChild}
                hasdivder={hasDivder}
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
