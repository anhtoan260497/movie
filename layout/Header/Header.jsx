import React, { Fragment, useState } from "react";
import styled, { keyframes } from "styled-components";
import { fadeIn } from "../../styles/globalKeyframes";
import { useRouter } from "next/router";

const flexCenter = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const color = {
  primary: "white",
  secondary: "hsla(0,0%,100%,.6)",
};


const HeaderContainer = styled.div`
  width: 100%;
  height: 64px;
  display: flex;
  align-items: center;
  background-image: linear-gradient(180deg, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0));
  padding: 0 20px;
  position: fixed;
  z-index : 100;

  svg {
    fill: white;
    width: 40px;
    height: 40px;
  }

  @media only screen and (max-width: 767px) {
    display: none;
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

  @media only screen and (max-width : 767px){
    &:hover {
      color : ${color.secondary}
    }
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

  @media only screen and (max-width: 767px) {
    position: static;
    width: auto;
    padding: 0;
    margin: 10px 0 10px 10px;
    font-size: 16px;
  }
`;

const ChildItems = styled.a`
  display: block;
  padding: 10px 10px;
  &:hover {
    color: ${color.primary};
  }

  @media only screen and (max-width: 767px) {
    &:hover {
      color: ${color.secondary}; //disable hover
    }
    color: ${(props) => (props.$selectedChildItem ? color.primary : color.secondary)};
  }
`;

const HeaderMobileContainer = styled(HeaderContainer)`
  display: none;

  @media only screen and (max-width: 767px) {
    display: flex;
    justify-content: space-between;
    position: static;
    padding-left: 0;
    background-color: black;

    svg {
      width: 20px;
      height: 20px;
    }

    svg:first-child {
      margin-left: 20px;
    }

    svg:nth-child(2) {
      width: 40px;
      height: 40px;
    }
  }
`;

const HeaderMobileMenu = styled.div`
  position: absolute;
  width: 70%;
  height: 100%;
  top: 0;
  left: ${(props) => (props.$active ? "0" : "-70%")};
  background-color: black;
  transition: left 0.5s ease;
  border: none;
  border-right: 1px solid white;
  padding: 10px;
`;

const MobileMenuLogo = styled.div`
  display: ${flexCenter.display};
  align-items: ${flexCenter.alignItems};
  flex-direction: row-reverse;
  justify-content: space-between;
  margin: 0 0 10px 0;
`;

const MobileItems = styled.div`
  color: white;
  font-size: 20px;
`;

const menuItems = [
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
  const [activeItem, setActiveItem] = useState("");
  const [openMobileItem, setOpenMobileItem] = useState([]);
  const [isActiveMobileMenu, setIsActiveMobileMenu] = useState(false);

  // hooks
  // const router = useRouter()
  // console.log(router.pathname)

  const renderHeaderItems = () => {
    return menuItems.map((items, idx) => {
      return (
        <React.Fragment key={items.path}>
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
                  <ChildItems href={childItems.path} key={childItems.path}>
                    {childItems.label}
                  </ChildItems>
                ))}
              </MenuChildItems>
            )}
          </Items>
        </React.Fragment>
      );
    });
  };

  const renderMobileItems = () => {
    return menuItems.map((items) => {
      return (
        <Fragment key={items.path}>
          <Items $active={activeItem === items.type} onClick={() => handleClickMobileItems(items.type)}>
            {items.label}
          </Items>
          {openMobileItem.includes(items.type) && (
            <MenuChildItems>
              {items.childItems.map((childItems) => {
                return <ChildItems key={childItems.path}>{childItems.label}</ChildItems>;
              })}
            </MenuChildItems>
          )}
        </Fragment>
      );
    });
  };

  const handleClickMobileItems = (type) => {
    setActiveItem(type);
    if (openMobileItem.includes(type)) {
      const cloneItems = [...openMobileItem];
      console.log(cloneItems)
      const itemIdx = cloneItems.findIndex(item => item === type);
      cloneItems.splice(itemIdx, 1);
      setOpenMobileItem(cloneItems);
      return;
    }

    setOpenMobileItem([...openMobileItem, type]);
  };

  return (
    <>
      {/* Desktop UI */}
      <HeaderContainer>
        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
          <path d="M0 96C0 60.7 28.7 32 64 32H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM48 368v32c0 8.8 7.2 16 16 16H96c8.8 0 16-7.2 16-16V368c0-8.8-7.2-16-16-16H64c-8.8 0-16 7.2-16 16zm368-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V368c0-8.8-7.2-16-16-16H416zM48 240v32c0 8.8 7.2 16 16 16H96c8.8 0 16-7.2 16-16V240c0-8.8-7.2-16-16-16H64c-8.8 0-16 7.2-16 16zm368-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V240c0-8.8-7.2-16-16-16H416zM48 112v32c0 8.8 7.2 16 16 16H96c8.8 0 16-7.2 16-16V112c0-8.8-7.2-16-16-16H64c-8.8 0-16 7.2-16 16zM416 96c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V112c0-8.8-7.2-16-16-16H416zM160 128v64c0 17.7 14.3 32 32 32H320c17.7 0 32-14.3 32-32V128c0-17.7-14.3-32-32-32H192c-17.7 0-32 14.3-32 32zm32 160c-17.7 0-32 14.3-32 32v64c0 17.7 14.3 32 32 32H320c17.7 0 32-14.3 32-32V320c0-17.7-14.3-32-32-32H192z" />
        </svg>
        <HeaderItems>{renderHeaderItems()}</HeaderItems>
      </HeaderContainer>

      {/* Mobile UI */}
      <HeaderMobileContainer>
        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512" onClick={() => setIsActiveMobileMenu(true)}>
          <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
          <path d="M0 96C0 60.7 28.7 32 64 32H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM48 368v32c0 8.8 7.2 16 16 16H96c8.8 0 16-7.2 16-16V368c0-8.8-7.2-16-16-16H64c-8.8 0-16 7.2-16 16zm368-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V368c0-8.8-7.2-16-16-16H416zM48 240v32c0 8.8 7.2 16 16 16H96c8.8 0 16-7.2 16-16V240c0-8.8-7.2-16-16-16H64c-8.8 0-16 7.2-16 16zm368-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V240c0-8.8-7.2-16-16-16H416zM48 112v32c0 8.8 7.2 16 16 16H96c8.8 0 16-7.2 16-16V112c0-8.8-7.2-16-16-16H64c-8.8 0-16 7.2-16 16zM416 96c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V112c0-8.8-7.2-16-16-16H416zM160 128v64c0 17.7 14.3 32 32 32H320c17.7 0 32-14.3 32-32V128c0-17.7-14.3-32-32-32H192c-17.7 0-32 14.3-32 32zm32 160c-17.7 0-32 14.3-32 32v64c0 17.7 14.3 32 32 32H320c17.7 0 32-14.3 32-32V320c0-17.7-14.3-32-32-32H192z" />
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
          <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
        </svg>
        <HeaderMobileMenu $active={isActiveMobileMenu}>
          <MobileMenuLogo>
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512" onClick={() => setIsActiveMobileMenu(false)}>
              <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
              <path d="M0 96C0 60.7 28.7 32 64 32H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM48 368v32c0 8.8 7.2 16 16 16H96c8.8 0 16-7.2 16-16V368c0-8.8-7.2-16-16-16H64c-8.8 0-16 7.2-16 16zm368-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V368c0-8.8-7.2-16-16-16H416zM48 240v32c0 8.8 7.2 16 16 16H96c8.8 0 16-7.2 16-16V240c0-8.8-7.2-16-16-16H64c-8.8 0-16 7.2-16 16zm368-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V240c0-8.8-7.2-16-16-16H416zM48 112v32c0 8.8 7.2 16 16 16H96c8.8 0 16-7.2 16-16V112c0-8.8-7.2-16-16-16H64c-8.8 0-16 7.2-16 16zM416 96c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V112c0-8.8-7.2-16-16-16H416zM160 128v64c0 17.7 14.3 32 32 32H320c17.7 0 32-14.3 32-32V128c0-17.7-14.3-32-32-32H192c-17.7 0-32 14.3-32 32zm32 160c-17.7 0-32 14.3-32 32v64c0 17.7 14.3 32 32 32H320c17.7 0 32-14.3 32-32V320c0-17.7-14.3-32-32-32H192z" />
            </svg>
          </MobileMenuLogo>

          <MobileItems>{renderMobileItems()}</MobileItems>
        </HeaderMobileMenu>
      </HeaderMobileContainer>
    </>
  );
}
export default Header;
