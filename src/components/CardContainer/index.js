import React from 'react';
import styled, { css } from 'styled-components';
import Link from 'next/link';
import NoImage from '@/components/NoImage';
import Card from '@/lib/Card';
import Meta from '@/lib/Card/Meta';
import Button from '@/lib/Button';

const StyledCardContainer = styled.div`
    margin: 0 10px;
    margin-bottom: 20px;
`;

const Actions = styled.div`
    padding: 8px 16px;
    color: #888;
    i {
        cursor: pointer;
    }
    & > *:not(:first-child) {
        margin-left: 20px;
    }
`;

const CardContainer = ({
    filteredType,
    itemId,
    PictureUrl1,
    itemName,
    openTime,
    Address,
}) => {
    return (
        <StyledCardContainer>
            <Link href={`/travel/detail/${filteredType}?id=${itemId}`}>
                <Card
                    cover={
                        PictureUrl1 ? (
                            <img src={PictureUrl1} alt={itemName} />
                        ) : (
                            <NoImage />
                        )
                    }
                    children={
                        <Meta
                            title={itemName}
                            description={openTime}
                            address={Address}
                            text="開放時間"
                            icon="fa-solid fa-thumbs-up"
                        />
                    }
                    footer={
                        <Actions>
                            <Button
                                style={{
                                    width: '100%',
                                    marginBottom: '16px',
                                }}
                                variant="outlined"
                            >
                                查看詳情
                            </Button>
                        </Actions>
                    }
                ></Card>
            </Link>
        </StyledCardContainer>
    );
};

export default CardContainer;
