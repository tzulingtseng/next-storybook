import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Icon from '../Icon';

const StyledMeta = styled.div`
    padding: 0.75rem 1rem;
    display: flex;
    & > *:not(:first-child) {
        margin-left: 0.5rem;
    }
`;

const Avatar = styled.div`
    width: 2.5rem;
    height: 2.5rem;
    & > img {
        width: 100%;
    }
`;

const StyledIcon = styled(Icon)`
    color: ${(props) => props.theme.colors.danger};
`;

const Content = styled.div`
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-align: left;
    .meta__info {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-size: ${(props) => props.theme.fontSize.xs};
    }
    .meta__title {
        overflow: hidden;
        color: #000000d9;
        font-weight: 500;
        font-size: ${(props) => props.theme.fontSize.sm};
        white-space: nowrap;
        text-overflow: ellipsis;
        margin: 0.5rem 0;
    }
    .meta__description {
        font-size: ${(props) => props.theme.fontSize.xs};
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
                <div>
                    {address && (
                        <StyledIcon
                            icon={icon}
                            style={{ marginRight: '0.5rem' }}
                        ></StyledIcon>
                    )}
                    <span>{address}</span>
                </div>
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
