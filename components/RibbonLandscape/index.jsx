import React from "react";
import styled from "styled-components";

RibbonLandscape.propTypes = {};

const RibbonLandscapeContainer = styled.div`
  width: 100%;
  height: 300px;
  border: 1px solid red;
`;

const RibbonLandscapeItem = styled.div`
  background-image: url(https://image.tmdb.org/t/p/original${(props) => props.$image});
  background-size: cover;
  width : 100%;
  height: 200px;
  border: 1px solid red;
`;

function RibbonLandscape(props) {
  return (
   <RibbonLandscapeContainer></RibbonLandscapeContainer>
  );
}

export default RibbonLandscape;
