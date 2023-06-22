import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Icon from '../Icon';

const StyledMeta = styled.div`
    padding: 12px 16px;
    display: flex;
    & > *:not(:first-child) {
        margin-left: 8px;
    }
`;

const Avatar = styled.div`
    width: 40px;
    height: 40px;
    & > img {
        width: 100%;
    }
`;

const Content = styled.div`
    width: 100%;
    overflow:hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-align:left;
    .meta__info {
        overflow:hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .meta__title {
        overflow: hidden;
        color: #000000d9;
        font-weight: 500;
        font-size: 16px;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .meta__description {
        font-size: 14px;
        color: #00000073;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
`;

const Meta = ({
    className,
    avatarUrl,
    title,
    icon,
    description,
    address,
    text,
}) => (
    <StyledMeta className={className}>
        {/* <Avatar>
      <img src={avatarUrl} alt="" style={{ objectFit: 'cover' }} />
    </Avatar> */}
        <Content>
            <div className="meta__info">
                {address && (
                    <Icon icon={icon} style={{ marginRight: '8px' }}></Icon>
                )}
                <span>{address}</span>
            </div>
            <div className="meta__title">{title}</div>
            <div className="meta__description">
                <div>{text}</div>
                {description}
            </div>
        </Content>
    </StyledMeta>
);

Meta.propTypes = {
    /**
     * 客製化樣式
     */
    className: PropTypes.string,
    /**
     * 標題
     */
    title: PropTypes.string,
    /**
     * 描述
     */
    description: PropTypes.string,
    /**
     * 頭像圖片位置連結
     */
    avatarUrl: PropTypes.string,
};

Meta.defaultProps = {
    className: '',
    title: '',
    description: '',
    avatarUrl: '',
};

export default Meta;
