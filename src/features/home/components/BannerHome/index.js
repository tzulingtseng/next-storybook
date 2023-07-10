import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import BannerHomeSrcPC from '@/assets/images/banner-home-pc.jpg';
import BannerHomeSrcMb from '@/assets/images/banner-home-mb.jpg';
import breakpoint from '@/lib/constant/breakpoint';

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
            <BannerText>
                <div className="title">探索臺灣之美</div>
                <div className="title"> 讓我們更親近這片土地</div>
                <div className="sub_title">景點、 美食、 活動</div>
            </BannerText>
        </BannerHomeWrapper>
    );
};

export default BannerHome;
