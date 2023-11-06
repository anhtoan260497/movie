import Image from "next/image";
import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { fadeIn } from "../../styles/globalKeyframes";

const flexCenter = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const color = {
  primary: "white",
  secondary: "hsla(0,0%,100%,.6)",
};

const fadeOut = keyframes`
0% { opacity: 1; }
100% { opacity: 0; }
`;

const HeaderContainer = styled.div`
  width: 100%;
  height: 64px;
  display: flex;
  align-items: center;
  background-image: linear-gradient(180deg, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0));
  padding: 0 20px;
  position: fixed;

  svg {
    fill : white;
    width : 40px;
    height : 40px;
  }
`;

const HeaderItems = styled.div`
  width: 30%;
  height: 100%;
  display: ${flexCenter.display};
  justify-content: space-around;
  align-items: ${flexCenter.alignItems};
`;

const Items = styled.div`
  color: ${(props) => (props.$active ? color.primary : color.secondary)};
  cursor: pointer;
  position: relative;
  p {
    height: 100%;
  }
  &:hover {
    color: ${color.primary};
  }
`;

const MenuChildItems = styled.div`
  position: absolute;
  top: 42px;
  left: -10px;
  width: 200px;
  color: ${color.secondary};
  animation: ${fadeIn} 0.5s linear;
  padding: 0 0 20px 0;
`;

const ChildItems = styled.a`
  display: block;
  padding: 5px 10px;
  &:hover {
    color: ${color.primary};
  }
`;

const MenuItems = [
  {
    label: "Movies",
    type: "movie",
    path: "/movie",
    childItems: [
      {
        label: "Popular",
        path: "/movies/popular",
      },
      {
        label: "Now playing",
        path: "/movies/now_playing",
      },
      {
        label: "Upcoming",
        path: "/movies/upcoming",
      },
      {
        label: "Top Rated",
        path: "/movies/top_rated",
      },
    ],
  },
  {
    label: "TV Shows",
    type: "tv",
    path: "/tv",
    childItems: [
      {
        label: "Popular",
        path: "/tv/popular",
      },
      {
        label: "Airing Today",
        path: "/movies/airing_today",
      },
      {
        label: "On TV",
        path: "/movies/on_tv",
      },
      {
        label: "Top Rated",
        path: "/tv/top_rated",
      },
    ],
  },
];

function Header() {
  const [hoverItem, setHoverItem] = useState("");

  const renderHeaderItems = () => {
    return MenuItems.map((items) => {
      return (
        <>
          <Items
            key={items.path}
            $active={hoverItem === items.type}
            onMouseEnter={() => setHoverItem(items.type)}
            onMouseLeave={() => setHoverItem("")}
          >
            <p>{items.label}</p>
            {hoverItem === items.type && (
              <MenuChildItems>
                {items.childItems.map((childItems) => (
                  <ChildItems key={childItems.path}>{childItems.label}</ChildItems>
                ))}
              </MenuChildItems>
            )}
          </Items>
        </>
      );
    });
  };

  return (
    <HeaderContainer>
      <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
        <path d="M0 96C0 60.7 28.7 32 64 32H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM48 368v32c0 8.8 7.2 16 16 16H96c8.8 0 16-7.2 16-16V368c0-8.8-7.2-16-16-16H64c-8.8 0-16 7.2-16 16zm368-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V368c0-8.8-7.2-16-16-16H416zM48 240v32c0 8.8 7.2 16 16 16H96c8.8 0 16-7.2 16-16V240c0-8.8-7.2-16-16-16H64c-8.8 0-16 7.2-16 16zm368-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V240c0-8.8-7.2-16-16-16H416zM48 112v32c0 8.8 7.2 16 16 16H96c8.8 0 16-7.2 16-16V112c0-8.8-7.2-16-16-16H64c-8.8 0-16 7.2-16 16zM416 96c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V112c0-8.8-7.2-16-16-16H416zM160 128v64c0 17.7 14.3 32 32 32H320c17.7 0 32-14.3 32-32V128c0-17.7-14.3-32-32-32H192c-17.7 0-32 14.3-32 32zm32 160c-17.7 0-32 14.3-32 32v64c0 17.7 14.3 32 32 32H320c17.7 0 32-14.3 32-32V320c0-17.7-14.3-32-32-32H192z" />
      </svg>
      <HeaderItems>{renderHeaderItems()}</HeaderItems>
    </HeaderContainer>
  );
}
export default Header;
