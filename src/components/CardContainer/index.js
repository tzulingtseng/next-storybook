import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import NoImage from '@/components/NoImage';
import Card from '@/lib/Card';
import Meta from '@/lib/Card/Meta';
import Button from '@/lib/Button';
import breakpoint from '@/lib/constant/breakpoint';
import { useTranslation } from 'next-i18next';

const StyledCardContainer = styled.div`
    width: calc(100% - 2rem);
    margin: 0 1rem;
    margin-bottom: 1rem;
    > a {
        > div {
            max-width: initial;
        }
    }
    ${breakpoint.mediaSM} {
        width: calc(100% / 2 - 2rem);
    }
    ${breakpoint.mediaMD} {
        width: calc(100% / 4 - 2rem);
    }
    // ${breakpoint.mediaLG} {
    //     width: calc(100% / 4 - 2rem);
    // }
`;

const Actions = styled.div`
    padding: 0.5rem 1rem;
    color: #888;
    i {
        cursor: pointer;
    }
    & > *:not(:first-child) {
        margin-left: 1rem;
    }
`;

const StyledButton = styled(Button)`
    width: 100%;
    margin-bottom: 1rem;
    font-size: ${(props) => props.theme.fontSize.sm};
`;

const CardContainer = ({
    type,
    itemId,
    PictureUrl1,
    itemName,
    description,
    address,
    text,
    iconClass,
}) => {
    const { t } = useTranslation('common');
    return (
        <StyledCardContainer>
            <Link href={`/travel/detail/${type}?id=${itemId}`}>
                <Card
                    cover={
                        PictureUrl1 ? (
                            <img src={PictureUrl1} alt="首頁熱門項目" />
                        ) : (
                            <NoImage />
                        )
                    }
                    children={
                        <Meta
                            title={itemName}
                            description={description}
                            address={address}
                            text={text}
                            icon={iconClass}
                        />
                    }
                    footer={
                        <Actions>
                            <StyledButton variant="outlined">
                                {t(`carouselConfig.buttonText`)}
                            </StyledButton>
                        </Actions>
                    }
                ></Card>
            </Link>
        </StyledCardContainer>
    );
};

export default CardContainer;
