import React from "react";
import styled from "styled-components";
import Slider from "react-slick";
import Image from "next/image";

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
    bottom: 10px;
    width: fit-content;
    display: flex !important;
    left: calc((100% / 2) - 50px);

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
`;

const CarouselItem = styled.div`
  position: relative;

  &:before {
    content: "";
    width: 100%;
    height: 100%;
    background: linear-gradient(60deg, rgba(0, 0, 0, 80%), rgba(255, 255, 255, 10%));
    position: absolute;
  }
`;

const CarouselTitle = styled.img`
  width: fit-content;
  height: 100px;
  position: absolute;
  top: calc(50% - 150px);
  left: 50px;
`;

const CarouselDescription = styled.p`
  max-width: 500px;
  height: 155px;
  position: absolute;
  top: calc(45% - 0px);
  left: 50px;
  color: white;
  font-wigth: 400;
  line-height: 2;
  color: #fff;
  text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.65);

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 5; /* limit to 2 lines */
`;

const CarouselPoster = styled.img`
  width: 100%;
  height: 600px;
`;

function Carousel(props) {
  const settings = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    lazyLoad: "progressive",
  };

  return (
    <CarouselContainer>
      <Slider {...settings}>
        <CarouselItem>
          <CarouselTitle src="https://image.tmdb.org/t/p/original/cSvp1n9IQaPzDV3PgZXPV2xbd1b.png" width={1920} height={0} alt="" />
          <CarouselDescription>
            Carol Danvers, aka Captain Marvel, has reclaimed her identity from the tyrannical Kree and taken revenge on the Supreme Intelligence. But
            unintended consequences see Carol shouldering the burden of a destabilized universe. When her duties send her to an anomalous wormhole
            linked to a Kree revolutionary, her powers become entangled with that of Jersey City super-fan Kamala Khan, aka Ms. Marvel, and Carol’s
            estranged niece, now S.A.B.E.R. astronaut Captain Monica Rambeau. Together, this unlikely trio must team up and learn to work in concert
            to save the universe.
          </CarouselDescription>
          <CarouselPoster
            as={Image}
            src="https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/feSiISwgEpVzR1v3zv2n2AU4ANJ.jpg"
            width={1920}
            height={0}
            alt=""
          />
        </CarouselItem>
        <CarouselItem>
          <CarouselTitle src="https://image.tmdb.org/t/p/original/q2AbGZCE0iTA11LI0PkvJgQtER9.png" width={1920} height={0} alt="" />
          <CarouselDescription>
            Ethan Hunt and his IMF team embark on their most dangerous mission yet: To track down a terrifying new weapon that threatens all of
            humanity before it falls into the wrong hands. With control of the future and the world's fate at stake and dark forces from Ethan's past
            closing in, a deadly race around the globe begins. Confronted by a mysterious, all-powerful enemy, Ethan must consider that nothing can
            matter more than his mission—not even the lives of those he cares about most.
          </CarouselDescription>
          <CarouselPoster
            as={Image}
            src="https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/628Dep6AxEtDxjZoGP78TsOxYbK.jpg"
            width={1920}
            height={0}
            alt=""
          />
        </CarouselItem>
        <CarouselItem>
          <CarouselTitle src="https://image.tmdb.org/t/p/original/pLlaM6lXpKbwVCUdsqJ7axwb5UF.png" width={1920} height={0} alt="" />
          <CarouselDescription>
            Despite his family’s baffling generations-old ban on music, Miguel dreams of becoming an accomplished musician like his idol, Ernesto de
            la Cruz. Desperate to prove his talent, Miguel finds himself in the stunning and colorful Land of the Dead following a mysterious chain of
            events. Along the way, he meets charming trickster Hector, and together, they set off on an extraordinary journey to unlock the real story
            behind Miguel's family history.
          </CarouselDescription>
          <CarouselPoster
            as={Image}
            src="https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/askg3SMvhqEl4OL52YuvdtY40Yb.jpg"
            width={1920}
            height={0}
            alt=""
          />
        </CarouselItem>
      </Slider>
    </CarouselContainer>
  );
}

export default Carousel;
