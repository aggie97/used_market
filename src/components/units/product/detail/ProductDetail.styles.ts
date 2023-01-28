import styled from "@emotion/styled";

export const ProductDetailWrapper = styled.div`
  max-width: 1120px;
  width: 100%;
  margin: 0 auto;
`;

export const Title = styled.h1``;

export const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding-bottom: 30px;
`;

export const HeaderLeft = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;
export const HeaderRight = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

export const ImageWrapper = styled.div`
  width: 100%;
  min-height: 300px;
  max-height: 50vh;
  display: flex;
  gap: 10px;
  border-radius: 1em;
  overflow: hidden;
  margin-bottom: 50px;
`;

export const ImageBox = styled.div`
  flex: 1 1 calc(1120px / 3 - 20px);
  max-width: calc(1120px / 3);
  object-fit: cover;
  object-position: center center;
  position: relative;
`;

export const ImageShadow = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  cursor: pointer;
  &::after {
    content: "";
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    transition: background-color 0.3s ease;
  }
  &:hover::after {
    background-color: rgba(0, 0, 0, 0.25);
  }
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  z-index: 5;
`;

export const MainContent = styled.div`
  display: flex;
  width: 100%;
  height: 80vh;
`;

export const MainLeft = styled.div`
  width: 58.333%;
`;

export const LeftHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const LeftTitle = styled.h2`
  font-weight: 600;
`;

export const LeftTags = styled.span`
  font-size: 1rem;
  width: fit-content;
  display: block;
  font-weight: normal;
  text-align: center;
  padding: 0.5em;
  border-radius: 1em;
  background-color: aliceblue;
`;

export const SellerProfile = styled.div`
  border: 1px solid #ddd;
  border-radius: 50%;
  overflow: hidden;
`;

export const MainRight = styled.div`
  width: 33.333%;
  margin-left: 8.333%;
  height: 100%;
`;

export const StickyBox = styled.div`
  position: sticky;
  top: 50px;
  border: 1px solid #ddd;
  box-shadow: rgb(0 0 0 / 12%) 0px 6px 16px;
  border-radius: 12px;
  padding: 1.5em;
`;

export const Price = styled.span`
  font-weight: 600;
  font-size: 1.5em;
`;
