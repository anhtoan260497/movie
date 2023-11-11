import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Slider from "react-slick";
import Image from "next/image";
import { fadeIn, moveUpDown } from "../../styles/globalKeyframes";
import SlickArrows from "../SlickArrows";
import { decimalPlace } from "../../helper";
import axios from "axios";
import filmDetails from "../../api/filmDetails";

Carousel.propTypes = {};

const carouselColor = {
  slickDots: "rgb(155,155,155)",
  activeSlickDots: "white",
};

const CarouselContainer = styled.div`
  width: 100%;
  height: 600px;
  background-color: black;

  ul.slick-dots {
    bottom: 20px;
    width: fit-content;
    display: flex !important;
    left: 78%;

    li {
      margin: 0 2px;
      width: 10px;

      button {
        background-color: ${carouselColor.slickDots};
        width: 10%;
        height: 10px;
        border-radius: 20px;

        &:before {
          display: none;
        }
      }
    }

    .slick-active {
      width: 50px;
      button {
        background-color: ${carouselColor.activeSlickDots};
        width: 100%;
        transition: width 0.5s ease;
      }
    }
  }

  @media only screen and (max-width: 1199px) {
    ul.slick-dots {
      left: 74%;
    }
  }

  @media only screen and (max-width: 1024px) {
    ul.slick-dots {
      left: 67%;
    }
  }

  @media only screen and (max-width : 767px){
    ul.slick-dots {
      bottom: 20px;
      width: fit-content;
      display: flex !important;
      left: 38%;
  
      li {
        margin: 0 2px;
        width: 10px;
  
        button {
          background-color: ${carouselColor.slickDots};
          width: 10%;
          height: 10px;
          border-radius: 20px;
  
          &:before {
            display: none;
          }
        }
      }
  }
`;

const CarouselItem = styled.div`
  position: relative;
  z-index: 1;

  &:before {
    content: "";
    width: 100%;
    height: 100%;
    background: linear-gradient(60deg, rgba(0, 0, 0, 100%), rgba(255, 255, 255, 10%));
    position: absolute;
  }
`;

const CarouselTitleContainer = styled.div`
  @media only screen and (max-width: 767px) {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 50%;
  }
`;

const CarouselTitle = styled.img`
  width: fit-content;
  height: 100px;
  position: absolute;
  top: calc(50% - 150px);
  left: 50px;
  animation: ${fadeIn} 1s linear;

  @media only screen and (max-width: 767px) {
    position: static;
    height: 80px;
  }
`;

const Rating = styled.p`
  position: absolute;
  z-index: 20;
  right: 0;
  bottom: 10%;
  padding: 10px 60px;
  background-color: rgba(0, 0, 0, 50%);
  color: white;
  border-left: 3px solid white;

  @media only screen and (max-width: 767px) {
    bottom: 85%;
  }
`;

const CarouselDescription = styled.p`
  max-width: 500px;
  position: absolute;
  top: calc(45% - 0px);
  left: 50px;
  color: white;
  font-weigth: 400;
  line-height: 1.5;
  z-index: 10;

  a {
    margin-left: 10px;
    font-size: 14px;
    color: rgb(155, 155, 155);

    svg {
      width: 14px;
      height: 14px;
      fill: rgb(155, 155, 155);
      position: relative;
      top: 2px;
    }

    &:hover {
      color: white;

      svg {
        fill: white;
      }
    }
  }

  @media only screen and (max-width: 767px) {
    display: none;
  }
`;

const MoreDetailMobile = styled.a`
  position: absolute;
  bottom: 30%;
  left: calc(50% - 50px);
  display: block;
  text-align: center;
  width: 120px;
  padding: 5px 15px;
  color: white;
  background-color: rgba(0, 0, 0, 0.5);
  border: 2px solid white;
  border-radius: 50px;
  animation: ${moveUpDown} 5s linear infinite;
`;

const CarouselPoster = styled.img`
  width: 100%;
  height: 600px;
  object-fit: cover;

  @media only screen and (max-width: 767px) {
    display: none !important;
  }
`;

const CarouselPosterMobile = styled(CarouselPoster)`
  display: none !important;

  @media only screen and (max-width: 767px) {
    display: block !important;
  }
`;

function Carousel({ listItems }) {
  const [trigger, setTrigger] = useState(false);
  const [items, setItems] = useState(listItems);

  const getTitleImage = async (id) => {
    const options = {
      method: "GET",
      url: filmDetails.images("movie", id),
      params: { language: "en" },
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZjgwMWZmOTAyZWNjNTM1NDhmZjMwZGM3ZGFjYmUxMCIsInN1YiI6IjYwNzJjOTE4N2M2ZGUzMDAyOTY3ZjFlYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9ix5_rGO04QTCGFn1Cvv6yY--K4uzsRLH-EgJ86YZOg",
      },
    };
    const result = await axios.request(options);
    return result.data.logos[0].file_path;
  };

  useEffect(() => {
    const clone = [...listItems];
    clone.map(
      async (item, idx) => {
        if (item.file_path) return;
        const result = await getTitleImage(item.id);
        clone[idx].file_path = result;
        setItems(clone);
      },
      [items]
    );
  });

  const settings = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 10000,
    nextArrow: <SlickArrows className="slick-next" chevron="right" />,
    prevArrow: <SlickArrows class="slick-prev" chevron="left" />,
    lazyLoad: "progressive",
  };

  const renderCarouselItems = () => {
    return items.map((item) => {
      return (
        <CarouselItem key={item.id}>
          <CarouselTitleContainer>
            <CarouselTitle src={`https://image.tmdb.org/t/p/original${item.file_path}`} width={1920} height={0} alt={item.title} />
          </CarouselTitleContainer>
          <Rating>{decimalPlace(parseFloat(item.vote_average), 1)}</Rating>
          <CarouselDescription>
            {item.overview}
            <a href={`movie/${item.id}`}>
              More Detail
              <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512">
                <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
              </svg>
            </a>
          </CarouselDescription>
          <MoreDetailMobile>More Detail</MoreDetailMobile>
          <CarouselPoster
            as={Image}
            src={`https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${item.backdrop_path}`}
            width={1920}
            height={0}
            alt=""
          />

          <CarouselPosterMobile as={Image} src={`https://image.tmdb.org/t/p/original${item.backdrop_path}`} width={1920} height={0} alt="" />
        </CarouselItem>
      );
    });
  };

  return (
    <CarouselContainer>
      <Slider {...settings}>{renderCarouselItems()}</Slider>
    </CarouselContainer>
  );
}

export default Carousel;
