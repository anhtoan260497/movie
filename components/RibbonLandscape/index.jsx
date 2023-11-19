import React, { useRef, useState } from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Navigation } from "swiper/modules";
import cx from "classnames";
import { icon } from "../../icon";
import { Tooltip } from "flowbite-react";

RibbonLandscape.propTypes = {};

const RibbonLandscapeContainer = styled.div`
  width: 100%;
  background-color: black;
  margin: 20px 0;

  .swiper-wrapper {
    padding: 20px 0;
  }

  .swiper-slide {
    transition: 250ms all;
    z-index: 0;

    &:first-child:hover {
      margin: 0 40px;
      transition-delay: 0.3s;
    }

    &:last-child:hover {
      margin: 0 -40px;
      transition-delay: 0.3s;
    }
  }

  .hover {
    transform: scale(1.4);
    z-index: 1;
  }

  .swiper-container {
    width: 100%;
    height: 100%;
  }
  .swiper-slide {
    text-align: center;
    font-size: 18px;
    /* Update: Removed the Flex property - IE FIX */
  }

  img {
    max-width: 100%;
    height: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    position: absolute;
    top: 0;
    z-index: 10;
    font-size: 16px;
    width: 30px;
    height: 100%;
    background-color: rgba(50, 50, 50, 0.2);
    transition: background-color 0.3s ease;
    border: none;
    fill: white;
    cursor: pointer;

    &:hover {
      background-color: rgba(255, 255, 255, 0.2);
      transition: background-color 0.3s ease;
    }

    &:active {
      background-color: rgba(255, 255, 255, 0.6);
    }
  }

  .swiper-button-next {
    right: 0;
  }
`;

const HoverBg = styled.div`
  position: absolute;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${(props) => (props.$hover ? " rgba(0,0,0,.5)" : "rgba(0, 0, 0, 0)")};
  transition: background-color 0.4s ease;
`;

const RibbonLandscapeItem = styled.div`
  background-image: url(https://image.tmdb.org/t/p/original${(props) => props.$image});
  background-size: cover;
  height: 130px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const RibbonOption = styled.div`
  fill: white;
  position: relative;
  z-index: 2;
  width: 26px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid white;
  border-radius: 50%;
  transition: opacity 0.8s ease;
  opacity: ${(props) => (props.$hover ? "1" : "0")};
  font-size: 12px;

  &:hover {
    transform: scale(1.2);
    transition: transform 0.5s ease;
  }
`;

const RibbonOptionGap = styled.div`
  width: 2px;
  height: 40%;
  background-color: white;
  position: relative;
  z-index: 2;
  opacity: ${(props) => (props.$hover ? "1" : "0")};
  transition: opacity 0.8s ease;
`;

function RibbonLandscape({ listItems }) {
  console.log(listItems);

  const [hoverItem, setHoverItem] = useState(0);
  const hoverRef = useRef(null);

  const settings = {
    slidesPerView: 5,
    slidesPerGroup: 5,
    spaceBetween: 10,
    modules: [Navigation],
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    loop: true,
  };

  const renderRibbonItems = () => {
    return listItems.map((item) => {
      return (
        <SwiperSlide
          key={item.id}
          onMouseOver={() => hoverMouseItem(item.id)}
          onMouseLeave={() => notHoverMouseItem()}
          className={cx({ hover: item.id === hoverItem })}
        >
          <RibbonLandscapeItem $image={item.backdrop_path}>
            <HoverBg $hover={item.id === hoverItem} />
            <Tooltip content="Play trailer"><RibbonOption $hover={item.id === hoverItem}>{icon.$playButton}</RibbonOption></Tooltip>
            <RibbonOptionGap $hover={item.id === hoverItem} />
            <RibbonOption $hover={item.id === hoverItem}>{icon.$detailButton}</RibbonOption>
            <RibbonOptionGap $hover={item.id === hoverItem} />
            <RibbonOption $hover={item.id === hoverItem}>{icon.$addButton}</RibbonOption>
          </RibbonLandscapeItem>
        </SwiperSlide>
      );
    });
  };

  const hoverMouseItem = (id) => {
    if (hoverRef.current) clearTimeout(hoverRef.current);
    if (hoverItem) {
      setHoverItem(id);
      return;
    }
    hoverRef.current = setTimeout(() => {
      setHoverItem(id);
      hoverRef.current = id;
    }, 300);
  };

  const notHoverMouseItem = () => {
    if (hoverRef.current) clearTimeout(hoverRef.current);
    hoverRef.current = setTimeout(() => {
      setHoverItem(0);
    }, 300);
  };

  return (
    <RibbonLandscapeContainer>
      <Swiper {...settings} className="mySwiper">
        {renderRibbonItems()}
        <button className="swiper-button-next">
          <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512">
            <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
          </svg>
        </button>
        <button className="swiper-button-prev">
          <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512">
            <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
          </svg>
        </button>
      </Swiper>
    </RibbonLandscapeContainer>
  );
}

export default RibbonLandscape;
