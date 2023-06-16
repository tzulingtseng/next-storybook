import React, { useState, useEffect, Fragment } from 'react';
import styled, { css } from 'styled-components';
import propTypes from 'prop-types';
import Image from 'next/image';
import logoImg from '../../assets/images/logo-header.release.svg';
import logoEnImg from '../../assets/images/logo-header.release.en.svg';
import logoIcon from '../../assets/icons/logo-symbol-default.release.svg';
import memberIcon from '../../assets/icons/member.svg';
import searchIcon from '../../assets/icons/search.svg';
import facebookIcon from '../../assets/icons/facebook.svg';
import instagramIcon from '../../assets/icons/instagram.svg';
import twitterIcon from '../../assets/icons/twitter.svg';
import youtubeIcon from '../../assets/icons/youtube.svg';
import BrandNav from '../BrandNav';
import Channels from '../Channels';
import Menu from '../Menu';
import MenuItems from '../MenuItems';
import ButtonClose from '../ButtonClose';

import { useTranslation } from 'next-i18next';

const StyledNavBar = styled('header')`
    width: 100%;
    // height: 60px;
    height: auto;
    // margin-left: 250px;
    background-color: white;
    // border: 1px solid red;
`;

const HeaderSection = styled.div`
    width: 1280px;
    margin: 0 auto;
    // border: 1px solid blue;
`;

const HeaderContainer = styled.div`
    position: sticky;
    top: 0px;
`;

const StyledDesktopAndAbovebox = styled.div`
    padding: 24px 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: sticky;
    top: 0px;
`;

const BrandWrapper = styled.div`
    display: flex;
    align-items: center;
`;

const ButtonContainer = styled('div')`
    width: 24px;
    height: 24px;
    cursor: pointer;
    position: relative;
    // border-top: 2px solid rgb(128, 128, 128);
    // border-bottom: 2px solid rgb(128, 128, 128);
    opacity: ${(props) => (props.$isHeaderShow ? 0 : 1)};
    transition: opacity 200ms ease 0s;
    &:before,
    &:after {
        content: '';
        width: 100%;
        height: 2px;
        display: block;
        position: absolute;

        background-color: rgb(128, 128, 128);
    }
    &:before {
        top: 2px;
    }
    &:after {
        bottom: 2px;
    }
`;

const ButtonLine = styled('div')`
    width: 100%;
    height: 2px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background-color: rgb(128, 128, 128);
`;

const SubBrandNav = css`
    font-weight: 400;
    font-size: 14px;
    color: rgb(64, 64, 64);
`;

const IconGroupNav = styled('div')`
    display: flex;
    align-items: center;
`;

const ButtonNavOutline = css`
    background-color: #ffffff;
    border: 2px solid rgb(196, 13, 35);
    color: rgb(196, 13, 35);
`;

const ButtonNavFilled = css`
    background-color: rgb(196, 13, 35);
    border: 2px solid rgb(196, 13, 35);
    color: #ffffff;
`;

const variantMap = {
    filled: ButtonNavFilled,
    outlined: ButtonNavOutline,
};

const ButtonNav = styled('div')`
    width: 86px;
    height: 32px;
    border-radius: 40px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    ${(props) => variantMap[props.$variant] || variantMap.filled}
    margin-right: 16px;
    &:last-child {
        margin-right: 0px;
    }
`;

const IconContainer = styled('div')`
    // opacity: 1;
    margin-left: 24px;
`;

const IconBox = styled(Image)`
    width: 24px;
    height: 24px;
    color: rgb(128, 128, 128);
    margin-right: 16px;
    &:last-child {
        margin-right: 0px;
    }
`;

const StyledDivider = styled('div')`
    border-width: 1px 0px 0px;
    border-style: solid;
    border-color: rgb(216, 216, 216);
    height: 0px;
    width: 100%;
    // transform: ${(props) =>
        props.$isCatgoryShow === true
            ? 'translateY(0px)'
            : 'translateY(-40px)'};
    opacity: ${(props) => (props.$isCatgoryShow === true ? 1 : 0)};
    transition: opacity 300ms ease-in-out 0s;
`;

const ChannelContainer = styled('div')`
    transform: ${(props) =>
        props.$isCatgoryShow === true
            ? 'translateY(0px)'
            : 'translateY(-40px)'};
    opacity: ${(props) => (props.$isCatgoryShow === true ? 1 : 0)};
    transition: transform 300ms ease-in-out 0s;
    flex-direction: column;
    -webkit-box-align: center;
    align-items: center;
`;

const HamburgerContainer = styled('div')`
    background-color: #ffffff;
    z-index: 4;
    position: absolute;
    top: 0px;
    left: -280px;
    transition: transform 300ms ease-in-out 0s;
    transform: ${(props) =>
        props.$hamburgerContainerShow === true
            ? 'translateX(280px)'
            : 'translateX(0px)'};
    height: 100vh;
`;
const ButtonCloseSection = styled('div')`
    position: relative;
    padding: 24px 32px 16px;
    display: flex;
    justify-content: end;
`;
const IconSection = styled('div')`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 16px 32px;
    > img {
        width: 24px;
        height: 24px;
    }
`;

const SocialIcons = styled('div')`
    display: flex;
    justify-content: center;
    align-items: center;
    > a {
        display: inline-flex;
        > img {
            margin: 8px;
            width: 24px;
            height: 24px;
        }
    }
`;

const HamburgerButtonNav = styled('div')`
    padding: 24px 32px;
    > div {
        width: 100%;
        margin-right: 0;
    }
    > div:first-child {
        margin-bottom: 16px;
    }
`;

const NavBar = ({ locale, children, ...props }) => {
    const { t } = useTranslation('home');

    const [hamburgerContainerShow, setHamburgerContainerShow] = useState(false);
    const [isCatgoryShow, setIsCatgoryShow] = useState(true);
    const [isHeaderShow, setIsHeaderShow] = useState(true);

    const handleHamburgerContainerShow = () => {
        setHamburgerContainerShow(!hamburgerContainerShow);
    };

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop =
                window.pageYOffset || document.documentElement.scrollTop;
            const isCatgoryShow = scrollTop < 20;

            setIsCatgoryShow(isCatgoryShow);

            if (isCatgoryShow) {
                setIsHeaderShow(true);
            } else {
                if (scrollTop > 20) {
                    setIsHeaderShow(false);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            // 確保滾動事件監聽器被正確移除
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <StyledNavBar style={props}>
            <HeaderSection>
                <HeaderContainer>
                    <StyledDesktopAndAbovebox>
                        <BrandWrapper>
                            <ButtonContainer
                                $isHeaderShow={isHeaderShow}
                                onClick={handleHamburgerContainerShow}
                            >
                                <ButtonLine></ButtonLine>
                            </ButtonContainer>
                            <BrandNav isHeaderShow={isHeaderShow}>
                                <a
                                    href="/"
                                    style={{
                                        display: 'inline-block',
                                        marginRight: '16px',
                                    }}
                                >
                                    {/* TODO:svg 切換多國語 */}
                                    {/* <Image
                                        width={221}
                                        height={32}
                                        src={logoEnImg}
                                        alt="logo"
                                    /> */}
                                    <img src={t('headerLogo')} alt="Logo" />
                                </a>
                                <div className={SubBrandNav}>
                                    {t('subTitle')}
                                </div>
                            </BrandNav>
                        </BrandWrapper>
                        <IconGroupNav>
                            <div>
                                <ButtonNav
                                    className={ButtonNavOutline}
                                    $variant="outlined"
                                    $locale={locale}
                                >
                                    {t('navButtons.outline')}
                                </ButtonNav>
                                <ButtonNav
                                    className={ButtonNavFilled}
                                    $variant="filled"
                                    $locale={locale}
                                >
                                    {t('navButtons.filled')}
                                </ButtonNav>
                            </div>
                            <IconContainer>
                                {/* TODO:how to use svg */}
                                {/* <svg src={searchIcon} alt=""></svg> */}
                                <IconBox src={searchIcon} />
                                <IconBox src={memberIcon} />
                            </IconContainer>
                        </IconGroupNav>
                    </StyledDesktopAndAbovebox>
                    <StyledDivider
                        $isCatgoryShow={isCatgoryShow}
                    ></StyledDivider>
                    <ChannelContainer $isCatgoryShow={isCatgoryShow}>
                        <Channels
                            handleHamburgerContainerShow={
                                handleHamburgerContainerShow
                            }
                        ></Channels>
                    </ChannelContainer>
                    <StyledDivider
                        $isCatgoryShow={isCatgoryShow}
                    ></StyledDivider>
                </HeaderContainer>
                <HamburgerContainer
                    $hamburgerContainerShow={hamburgerContainerShow}
                >
                    <ButtonCloseSection>
                        <ButtonClose
                            onClick={handleHamburgerContainerShow}
                        ></ButtonClose>
                    </ButtonCloseSection>
                    <IconSection>
                        <Image src={logoIcon} alt="logoIcon" />
                    </IconSection>
                    <Menu>
                        <MenuItems
                            items={t('menuConfig', { returnObjects: true })}
                        ></MenuItems>
                    </Menu>
                    <SocialIcons>
                        <a href="">
                            <Image src={facebookIcon} alt="facebook" />
                        </a>
                        <a href="">
                            <Image src={instagramIcon} alt="instagram" />
                        </a>
                        <a href="">
                            <Image src={twitterIcon} alt="twitter" />
                        </a>
                        <a href="">
                            <Image src={youtubeIcon} alt="youtube" />
                        </a>
                    </SocialIcons>
                    <HamburgerButtonNav>
                        <ButtonNav
                            className={ButtonNavOutline}
                            $variant="outlined"
                            $locale={locale}
                        >
                            {t('navButtons.outline')}
                        </ButtonNav>
                        <ButtonNav
                            className={ButtonNavFilled}
                            $variant="filled"
                            $locale={locale}
                        >
                            {t('navButtons.filled')}
                        </ButtonNav>
                    </HamburgerButtonNav>
                </HamburgerContainer>
            </HeaderSection>
        </StyledNavBar>
    );
};

NavBar.propTypes = {
    style: propTypes.object,
};

NavBar.defaultProps = {
    style: {},
};

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, [
                'common',
                'about',
                'home',
            ])),
        },
    };
}

export default NavBar;
