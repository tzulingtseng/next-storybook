import React from 'react';
import styled, { css } from 'styled-components';

const Container = styled('div')`
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;
    height: auto;
    border: 1px solid red;
    height: 100vh;
`;

const InfoContainer = styled('div')``;

const InfoTitle = styled('div')``;

const InfoBox = styled('div')``;

const InfoImageContainer = styled('div')``;

const InfoDetailContainer = styled('div')``;

const IntroContainer = styled('div')``;

const MapContainer = styled('div')``;

const Detail = () => {
    return (
        <>
            <Container>
                <InfoContainer>
                    <InfoTitle></InfoTitle>
                    <InfoBox>
                        <InfoImageContainer></InfoImageContainer>
                        <InfoDetailContainer></InfoDetailContainer>
                    </InfoBox>
                </InfoContainer>
                <IntroContainer></IntroContainer>
                <MapContainer></MapContainer>
            </Container>
        </>
    );
};

export async function getServerSideProps() {
    return {
        props: {
            ...(await serverSideTranslations([])),
        },
    };
}

export default Detail;
