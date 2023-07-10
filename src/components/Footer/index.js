import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'next-i18next';
import breakpoint from '@/lib/constant/breakpoint';

const FooterContainer = styled.div`
    width: 100%;
    background-color: ${(props) => props.theme.colors.grey1};
`;
const FooterContentBox = styled.div`
    max-width: 1200px;
    width: 100%;
    margin: 0px auto;
    padding: 2.5rem 0;
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
    ${breakpoint.mediaXS} {
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
