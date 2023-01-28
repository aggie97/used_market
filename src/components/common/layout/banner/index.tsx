import styled from "@emotion/styled";
import SimpleSlider from "../../carousel";

const Wrapper = styled.div`
  height: 100%;
  text-align: center;
  font-size: 3rem;
  background-color: transparent;
`;

export default function Banner() {
  return (
    <Wrapper>
      <SimpleSlider />
    </Wrapper>
  );
}
