import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

SlickArrows.propTypes = {};

const SlickArrowsButton = styled.button`
  position: absolute;
  right: ${(props) => (props.$chevron === "right" ? "5%" : "10%")};
  bottom: 15px;
  z-index: 2;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  border-radius: 50%;
  background-color: transparent;
  border: 4px solid white;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 50%);
    transition: background-color 0.3s ease;
    svg {
      fill: black;
    }

    &:before {
      border: 2px solid black;
    }
  }

  &:before {
    content: "";
    width: 70%;
    height: 70%;
    border: 1px solid white;
    position: absolute;
    border-radius: 50%;
  }

  svg {
    fill: white;
  }

  @media only screen and (max-width: 1024px) {
    right: ${(props) => (props.$chevron === "right" ? "5%" : "12%")};
  }

  @media only screen and (max-width: 767px) {
    right: ${(props) => (props.$chevron === "right" ? "20%" : "68%")};
  }
`;

function SlickArrows({ chevron, onClick }) {
  return (
    <SlickArrowsButton $chevron={chevron} onClick={onClick}>
      {chevron === "right" ? (
        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
          <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
          <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
        </svg>
      )}
    </SlickArrowsButton>
  );
}

export default SlickArrows;
