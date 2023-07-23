import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import Icon from '@/lib/Icon';
import scrollToTop from '@/utils/scrollToTop';

const Container = styled.div`
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 3rem;
    height: 3rem;
    border-radius: 100%;
    background-color: ${(props) => props.theme.colors.primary};
    display:${(props) => props.$isVisible ? 'flex' : 'none'};
    justify-content: center;
    align-items: center;
    cursor: pointer;
    z-index: 2;
    box-shadow:0 4px 10px 0 rgba(60, 64, 67, 0.2);
`

const StyledIcon = styled(Icon)`
    color: ${(props) => props.theme.colors.white};
    opacity:0.8;
    font-size: 1rem;
`;

const GoToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    const handleScroll = () => {
        if (window.scrollY > 300) { // 自行調整數值，表示滾動到一定高度時顯示按鈕
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <Container
            $isVisible={isVisible}
            onClick={() => { scrollToTop(true) }}>
            <StyledIcon icon="fa-solid fa-arrow-up" />
        </Container>
    )
}

export default GoToTop