import styled from "@emotion/styled";

export const ProductWrapper = styled.div`
  width: 1240px;
  margin: 0 auto;
  padding-top: 50px;

  & > div {
    display: flex;
    flex-wrap: wrap;
    gap: 35px;
  }
`;

export const ProductCard = styled.li`
  position: relative;
  width: 220px;
  position: relative;
  list-style: none;
  background-color: #fff;
  border-radius: 0.5em;
  overflow: hidden;
  transition: all 0.3s ease;
  border: 1px solid #dedede;
  cursor: pointer;
  &:hover {
    box-shadow: 0 0 5px 2px #ddd;
  }
`;

export const ProductImg = styled.img`
  width: 220px;
  height: 220px;
  transition: all 0.3s ease;
`;

export const ProductInfo = styled.div`
  max-height: 50px;
  padding: 1em;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const LikeBox = styled.div`
  display: flex;
  padding-top: 0.5rem;
  color: red;
  span:nth-of-type(2) {
    color: #000;
  }
  gap: 0.5rem;
`;

export const ControlBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.5rem;
`;

export const ControlButton = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  font-size: 1.5rem;
  :first-of-type {
    font-size: 1.3rem;
  }
  :hover {
    > * {
      color: red;
    }
  }

  :active {
    > * {
      color: red;
      transform: scale(1.2);
      transition: all 0.5s ease;
    }
  }
`;
