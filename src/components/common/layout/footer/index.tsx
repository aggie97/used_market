import styled from "@emotion/styled";
import Logo from "../../logo";

const Footer = () => {
  return (
    <Wrapper>
      <ContentBox>
        <Logo />
        <h6 style={{ fontSize: "16px", color: "#bbb" }}>
          본 웹 사이트는 상업 목적이 아닌, 포트폴리오 용도로 만들어졌습니다.
          <br /> 아닌 거 같으면 전화주세요. 010-5910-3454
        </h6>
      </ContentBox>
    </Wrapper>
  );
};

export default Footer;

const Wrapper = styled.div`
  width: 100%;
  min-height: 300px;
  display: flex;
  align-items: center;
  background-color: #fcfcfc;
  text-align: center;
  font-size: 3rem;
  border-top: 1px solid #eee;
`;

const ContentBox = styled.div`
  width: 1240px;
  margin: 0 auto;
`;
