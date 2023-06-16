import React, { useState } from 'react';
import styled from 'styled-components';
import Switch from '../../lib/Switch';

const SwitchGroup = styled.div`
    display: flex;
    align-items: center;
    & > * {
        margin-left: 20px;
    }
`;

const Template = (args) => <Switch {...args} />;

export const Default = Template.bind({});

Default.args = {
    checkedChildren: '預設',
};

export const DisabledSwitch = () => {
    return (
        <div style={{ display: 'flex', gap: '24px' }}>
            <Switch storyChecked={false} isDisabled />
            <Switch storyChecked={true} />
        </div>
    );
};

export const SwitchWithSize = () => {
    const [isChecked, setIsChecked] = React.useState(false);
    return (
        <SwitchGroup>
            <Switch
                size="small"
                isChecked={isChecked}
                onChange={() => setIsChecked((prev) => !prev)}
            />
            <Switch
                isChecked={isChecked}
                onChange={() => setIsChecked((prev) => !prev)}
            />
        </SwitchGroup>
    );
};

export const CustomColor = () => {
    // const [isChecked, setIsChecked] = React.useState(true);
    return (
        <Switch
            // isChecked={isChecked}
            onChange={() => setIsChecked((prev) => !prev)}
            setSwitchColor="#ffc107"
        />
    );
};

export const SwitchWithChildrenLabel = (args) => {
    return (
        <SwitchGroup>
            <Switch
                checkedChildren="開啟"
                unCheckedChildren="關閉"
                // isChecked={isChecked}
            />
            <Switch
                checkedChildren="開啟一個長度彈性的 Switch"
                unCheckedChildren="關閉一個長度彈性的 Switch"
                // isChecked={isChecked}
            />
        </SwitchGroup>
    );
};

// 你的頁面標題
export default {
    component: Switch,
    title: 'Components/Switch',
    tags: ['autodocs'],
};
