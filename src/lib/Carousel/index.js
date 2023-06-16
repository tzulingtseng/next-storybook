import React, { useState, useEffect, useCallback, useRef } from 'react';
import styled, { css } from 'styled-components';
import propTypes from 'prop-types';
import Icon from '../Icon';
import Image from 'next/image';

import img1 from '../../assets/images/1.jpeg';
import img2 from '../../assets/images/2.jpeg';
import img3 from '../../assets/images/3.jpeg';
import img4 from '../../assets/images/4.jpeg';
import img5 from '../../assets/images/5.jpeg';

const CarouselWrapper = styled.div`
    position: relative;
    // width: ${(props) => props.$width}px;
    width: 600px;
    height: 400px;
`;

const ImageWrapper = styled.div`
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
    background: black;
    border: 1px solid red;
`;

const ImageBox = styled(Image)`
    width: 100%;
    height: auto;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: ${(props) => props.$left}px;
    transition: all 0.4s ease;
    object-fit: cover;
`;

const ControlButtons = styled.div`
    color: white;
    position: absolute;
    z-index: 10;
    left: 0px;
    top: 0px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;
    & > svg {
        cursor: pointer;
        width: 40px;
        height: 40px;
    }
`;

const ArrowLeft = () => {
    return (
        <Icon
            size={40}
            icon="fa-solid fa-chevron-left"
            style={{ color: 'red', zIndex: 1, cursor: 'pointer' }}
        ></Icon>
    );
};

const ArrowRight = () => {
    return (
        <Icon
            size={40}
            icon="fa-solid fa-chevron-right"
            style={{ color: 'red', zIndex: 1, cursor: 'pointer' }}
        ></Icon>
    );
};

const Dots = styled.div`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
    left: 50%;
    bottom: 8px;
    transform: translateX(-50%);
    & > *:not(:first-child) {
        margin-left: 6px;
    }
`;

const Dot = styled.div`
    border-radius: 100%;
    width: ${(props) => (props.$isCurrent ? 10 : 8)}px;
    height: ${(props) => (props.$isCurrent ? 10 : 8)}px;
    border: 1px solid #fff;
    background: ${(props) => (props.$isCurrent ? '#FFF' : 'none')};
    cursor: pointer;
    transition: all 0.2s ease-in-out;
`;

/**
 * `Carousel` 是一個像旋轉木馬一樣會輪流轉的輪播元件。
 * 在一個內容空間有限的可視範圍中進行內容的輪播展示。通常適用於一組圖片或是卡片的輪播。
 */
const Carousel = ({
    className,
    dataSource,
    hasDots,
    hasControlArrow,
    autoplay,
}) => {
    const carouselRef = useRef();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [imageWidth, setImageWidth] = useState(600);
    const getIndexes = () => {
        const prevIndex =
            currentIndex - 1 < 0 ? dataSource.length - 1 : currentIndex - 1;
        const nextIndex = (currentIndex + 1) % dataSource.length;

        return {
            prevIndex,
            nextIndex,
        };
    };

    const makePosition = ({ itemIndex }) =>
        (itemIndex - currentIndex) * imageWidth;

    const handleClickPrev = () => {
        const { prevIndex } = getIndexes();
        setCurrentIndex(prevIndex);
    };

    const handleClickNext = useCallback(() => {
        const { nextIndex } = getIndexes();
        setCurrentIndex(nextIndex);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentIndex]);

    const handleUpdateCarouselWidth = () => {
        const carouselWidth = carouselRef.current.clientWidth;
        setImageWidth(carouselWidth);
    };

    useEffect(() => {
        handleUpdateCarouselWidth();
        window.addEventListener('resize', handleUpdateCarouselWidth);
        return () => {
            window.removeEventListener('resize', handleUpdateCarouselWidth);
        };
    }, []);

    useEffect(() => {
        let intervalId;
        if (autoplay) {
            intervalId = setInterval(() => {
                handleClickNext();
            }, 3000);
        }
        return () => {
            clearInterval(intervalId);
        };
    }, [autoplay, handleClickNext]);

    return (
        <CarouselWrapper
            ref={carouselRef}
            className={className}
            $width={imageWidth}
        >
            <ImageWrapper>
                {dataSource &&
                    dataSource.map((imageUrl, index) => {
                        return (
                            <ImageBox
                                key={index}
                                src={imageUrl}
                                alt="ImageBox"
                                $left={makePosition({ itemIndex: index })}
                            />
                        );
                    })}
            </ImageWrapper>
            {hasControlArrow && (
                <ControlButtons>
                    <ArrowLeft onClick={handleClickPrev} />
                    <ArrowRight onClick={handleClickNext} />
                </ControlButtons>
            )}
            {hasDots && (
                <Dots>
                    {[...Array(dataSource.length).keys()].map((key, index) => (
                        <Dot
                            key={key}
                            $isCurrent={index === currentIndex}
                            onClick={() => setCurrentIndex(key)}
                        />
                    ))}
                </Dots>
            )}
        </CarouselWrapper>
    );
};

Carousel.defaultProps = {
    className: '',
    hasDots: true,
    hasControlArrow: true,
    dataSource: [img1, img2, img3, img4, img5],
    autoplay: false,
};

export default Carousel;
