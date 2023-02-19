import styled from "@emotion/styled";
import { useRouter } from "next/router";

export const LogoIcon = styled.span`
  display: block;
  background-image: url("/11pnges.png");
  background-position: -162px 0px;
  width: 94px;
  height: 40px;
  background-size: 363px 300px;
  margin: 0;
  cursor: pointer;
`;

export const HomeLink = styled.a`
  display: block;
  width: 100%;
  height: 100%;
`;

const Logo = () => {
  const router = useRouter();
  const onClickLogo = async () => {
    await router.push("/");
  };
  return (
    <LogoIcon>
      <HomeLink onClick={onClickLogo}></HomeLink>
    </LogoIcon>
  );
};

export default Logo;
