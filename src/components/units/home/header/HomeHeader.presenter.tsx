import Logo from "../../../common/logo";
import User from "../../../common/user";
import {
  Best,
  HamburgerBox,
  HamburgerButton,
  MyCart,
  MyLately,
  MyOrder,
  SearchBox,
  SearchGlobal,
  SearchIcon,
  SearchInput,
  UserMenuLI,
  UserMenuUl,
  Wrapper,
  WrapperLeft,
  WrapperRight,
} from "./HomeHeader.styles";

const HomeHeaderUI = () => {
  return (
    <>
      <Wrapper id="top__wrapper">
        <WrapperLeft id="top__wrapper__left">
          <HamburgerBox id="hamburger">
            <HamburgerButton></HamburgerButton>
          </HamburgerBox>
          <Logo />
          <SearchBox id="search">
            <SearchGlobal>통합검색</SearchGlobal>
            <SearchInput type="text" />
            <SearchIcon id="backgroundImg_position_-162px_-45px"></SearchIcon>
          </SearchBox>
          <div id="bestRank"></div>
        </WrapperLeft>
        <Best></Best>
        <WrapperRight id="top__wrapper__right">
          <UserMenuUl>
            <UserMenuLI id="myInfo">
              <User />
            </UserMenuLI>
            <UserMenuLI id="order">
              <MyOrder></MyOrder>
            </UserMenuLI>
            <UserMenuLI id="cart">
              <MyCart></MyCart>
            </UserMenuLI>
            <UserMenuLI id="cart">
              <MyLately></MyLately>
            </UserMenuLI>
          </UserMenuUl>
        </WrapperRight>
      </Wrapper>
    </>
  );
};

export default HomeHeaderUI;
