import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import BannerHomeSrc from '@/assets/images/banner-home.png';
import breakpoint from '@/lib/constant/breakpoint';

const BannerHomeWrapper = styled.div`
    width: 100%;
    position: relative;
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
    display: block;
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
    .title {
        font-size: ${(props) => props.theme.fontSize.xl};
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
    return (
        <BannerHomeWrapper>
            <BannerImg src={BannerHomeSrc} alt="banner" priority={true} />
            <BannerText>
                <div className="title">探索臺灣之美</div>
                <div className="title"> 讓我們更親近這片土地</div>
                <div className="sub_title">景點、 美食、 活動</div>
            </BannerText>
        </BannerHomeWrapper>
    );
};

export default BannerHome;
