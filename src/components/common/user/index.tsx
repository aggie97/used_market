import styled from "@emotion/styled";
import { useRouter } from "next/router";

const User = () => {
  const router = useRouter();
  const onClickUser = async () => {
    await router.push("/myPage");
  };
  return <StyledUser onClick={onClickUser} />;
};

export default User;

const StyledUser = styled.div`
  width: 48px;
  height: 48px;
  background-size: 363px 300px;
  background-image: url("/11pnges.png");
  background-position: -159px -145px;
  :hover {
    background-position: 0px -198px;
  }

  cursor: pointer;
`;
