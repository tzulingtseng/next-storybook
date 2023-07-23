import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { TypeAnimation } from 'react-type-animation';

import Image from 'next/image';
import BannerHomeSrcPC from '@/assets/images/banner-home-pc.jpg';
import BannerHomeSrcMb from '@/assets/images/banner-home-mb.jpg';
import breakpoint from '@/lib/constant/breakpoint';
import { useTranslation } from 'next-i18next';

const BannerHomeWrapper = styled.div`
    position: relative;
    background-position: center;
    background-size: cover;
    &::after {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.3);
    }
`;

const BannerImg = styled(Image)`
    width: 100%;
    height: auto;
    &.show-pc {
        display: none;
    }
    &.show-mb {
        display: block;
    }
    ${breakpoint.mediaMD} {
        &.show-pc {
            display: block;
        }
        &.show-mb {
            display: none;
        }
    }
`;

const BannerText = styled.div`
    z-index: 1;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    color: ${(props) => props.theme.colors.white};
    font-weight: 600;
    width: 100%;
    transition: transform 0.4s, opacity 0.4s;
    .title {
        white-space: pre-line;
        font-size: ${(props) => props.theme.fontSize.xl};
    }
    .title-popup{
        opacity:${(props) => props.$isFinalText ? '1' : '0'};
        transform: ${(props) => props.$isFinalText ? 'translateY(0)' : 'translateY(60%)'};
        transition: transform 0.4s, opacity 0.4s;
    }
    ${breakpoint.mediaMD} {
        .title {
            font-size: ${(props) => props.theme.fontSize.xxl};
        }
    }
    .sub_title {
        font-size: ${(props) => props.theme.fontSize.lg};
    }
`;

const BannerHome = () => {
    const { t } = useTranslation('common');
    const [isFinalText, setIsFinalText] = useState(false);
    let times = 0
    let repeatTimes = 3
    const countTypingTimes = () => {
        times++
        if (times === repeatTimes + 1) {
            setIsFinalText(true)
        }
    }

    return (
        <BannerHomeWrapper>
            <BannerImg
                className="show-pc"
                src={BannerHomeSrcPC}
                alt="banner"
                priority={true}
            />
            <BannerImg
                className="show-mb"
                src={BannerHomeSrcMb}
                alt="banner"
                priority={true}
            />
            <BannerText $isFinalText={isFinalText}>
                {isFinalText && <div className="title title-popup">{t('bannerHome.title_01')}</div>}
                {isFinalText && <div className="title title-popup"> {t('bannerHome.title_02')}</div>}
                {!isFinalText && <TypeAnimation
                    sequence={[
                        `${t('bannerHome.title_01')}\n${t('bannerHome.title_02')}`,
                        1000,
                        '', () => {
                            countTypingTimes()
                        },

                    ]}
                    speed={20}
                    repeat={repeatTimes}
                    preRenderFirstString={true}
                    wrapper="div"
                    className="title"
                />}
                <div className="sub_title">{t('bannerHome.sub_title')}</div>
            </BannerText>
        </BannerHomeWrapper >
    );
};

export default BannerHome;
