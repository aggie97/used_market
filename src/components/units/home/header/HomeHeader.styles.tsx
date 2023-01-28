import styled from "@emotion/styled";

export const Wrapper = styled.div`
  width: 1240px;
  height: 120px;
  margin: 0 auto;
  display: flex;
  align-items: center;
`;

export const WrapperLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5em;
`;

export const HamburgerBox = styled.div``;

export const HamburgerButton = styled.button`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  box-shadow: 0px 2px 6px 0px rgb(0 0 0 / 6%), 0px 0px 1px 0px rgb(0 0 0 / 40%);
  position: relative;
  background-color: transparent;
  border: none;
  cursor: pointer;
  &::after {
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
    width: 36px;
    height: 36px;
    background-image: url("/11pnges.png");
    background-position: -306px -203px;
    background-size: 363px 300px;
    margin: -18px 0 0 -18px;
  }
`;

export const Logo = styled.span`
  display: block;
  background-image: url("/11pnges.png");
  background-position: -162px 0px;
  width: 94px;
  height: 40px;
  background-size: 363px 300px;
  margin: 0;
`;

export const HomeLink = styled.a`
  display: block;
  width: 100%;
  height: 100%;
`;

export const SearchBox = styled.div`
  width: 510px;
  height: 50px;
  border-radius: 25px;
  background-color: #fafafa;
  border: 1px solid #ddd;
  display: flex;
  align-items: center;
`;

export const SearchGlobal = styled.button`
  position: relative;
  width: 137px;
  height: 49px;
  border: none;
  border-radius: 25px 0 0 25px;
  background-color: transparent;
  color: #111;
  padding-left: 20px;
  text-align: left;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }

  &::after {
    content: "";
    position: absolute;
    top: 14px;
    right: 0;
    width: 1px;
    background-color: #bbb;
    height: 20px;
  }
`;

export const SearchInput = styled.input`
  height: 43px;
  flex: 1;
  font-size: 16px;
  color: #111;
  border: none;
  background-color: transparent;
  outline: none;
  padding-left: 1em;
`;

export const SearchIcon = styled.button`
  width: 50px;
  height: 50px;
  background-image: url("11pnges.png");
  background-position: -162px -45px;
  background-size: 363px 300px;
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

export const Best = styled.div`
  width: 210px;
  height: 1px;
`;

export const WrapperRight = styled.div`
  width: 100%;
  flex: 3;
`;

export const UserMenuUl = styled.ul`
  list-style: none;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100%;
  margin: 0;
`;

export const UserMenuLI = styled.li`
  & > a {
    display: block;
    background-image: url("/11pnges.png");
    background-size: 363px 300px;
    width: 48px;
    height: 48px;
  }
`;

export const MyInfo = styled.a`
  background-position: -159px -145px;
`;
export const MyOrder = styled.a`
  background-position: -53px -145px;
`;
export const MyCart = styled.a`
  background-position: -94px -70px;
`;
export const MyLately = styled.a`
  background-position: -53px -198px;
`;
