import React from 'react'
import styled, { css } from 'styled-components';

const FooterContainer = styled.div`
    width:100%;
    background-color:rgb(216, 216, 216);
`
const FooterContentBox = styled.div`
    max-width:1200px;
    width:100%;
    margin:0px auto;
    // border:1px solid red;
    padding:40px 0;
`

const FooterContent = styled.div`
    width:100%;
    // height:100px;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
`

const ServiceColumn = styled.div`
    width:50%;
    padding-left:80px;
`

const ServiceBox = styled.div`
    display:flex;
    justify-content:space-between;
`

const ServiceInfo = styled.div`
    padding-left:20px;
    border-left:1px solid red;
`

const IconWrapper = styled.div`
`

const LinkColumn = styled.div`
    width:50%;
    padding-right:80px;
    border-right:1px solid red;
`

const ItemList = styled.div`

`

const ItemGroup = styled.div`
    // width:30%;
`

const Item = styled('a')`
    display:inline-block;
    padding: 0 10px;
    border-left:1px solid red;
    &:first-of-type {
        padding-left:0;
        border-left:none;
    }
`
const Infobox = styled.div`
    font-size:12px;
    margin-top:40px;
`
const Footer = () => {
    return (
        <FooterContainer>
            <FooterContentBox>
                <FooterContent>
                    <LinkColumn>
                        <ItemList>
                            <ItemGroup>
                                <Item>旅遊</Item>
                                <Item>活動</Item>
                                <Item>美食</Item>
                            </ItemGroup>
                        </ItemList>
                        <Infobox>
                            <div>本網站版權屬於 城邦文化事業股份有限公司 所有，未經本站同意，請勿擅用文字及圖案。</div>
                            <div>© 1999 - 2023 Business Weekly a division of Cite Publishing Ltd All Rights Reserved.</div>
                        </Infobox>
                    </LinkColumn>
                    <ServiceColumn>
                        <ServiceBox>
                            <div>客服中心</div>
                            <ServiceInfo>
                                <div>客戶服務專線：02-2510-8888  │ 傳真：02-2503-6989</div>
                                <div>服務時間：週一至週五08:30~18:00 (例假日除外)</div>
                            </ServiceInfo>
                        </ServiceBox>
                        <IconWrapper>各種icon</IconWrapper>
                    </ServiceColumn>

                </FooterContent>
                {/* <div>本網站版權屬於 城邦文化事業股份有限公司 所有，未經本站同意，請勿擅用文字及圖案。Copyright © </div> */}
            </FooterContentBox>
        </FooterContainer>
    )
}

export default Footer