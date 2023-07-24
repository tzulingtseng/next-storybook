import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'next-i18next';
import breakpoint from '@/lib/constant/breakpoint';

const FooterContainer = styled.div`
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 8rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${(props) => props.theme.colors.grey1};
    ${breakpoint.mediaXS} {
        height: 5rem;
    }
`;
const FooterContentBox = styled.div`
    max-width: 1200px;
    width: 100%;
`;

const FooterContent = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: ${(props) => props.theme.fontSize.sm};
    color: ${(props) => props.theme.colors.grey2};
    > br {
        display: block;
    }
    ${breakpoint.mediaSM} {
        > br {
            display: none;
        }
    }
`;

const Footer = () => {
    const { t } = useTranslation('common');
    return (
        <FooterContainer>
            <FooterContentBox>
                <FooterContent>
                    Copyright © The F2E Taiwan. <br className="" />
                    Source: {t('footerSource')}
                </FooterContent>
            </FooterContentBox>
        </FooterContainer>
    );
};

export default Footer;
