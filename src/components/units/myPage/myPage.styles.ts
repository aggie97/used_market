import styled from "@emotion/styled";
import { styleSet } from "../../../commons/styles/globalStyles";

interface IStyle {
  isActive: boolean;
}

export const Wrapper = styled.div`
  max-width: 1240px;
  width: 100%;
  margin: 0 auto;
  display: flex;
`;

export const LeftSideWrapper = styled.div`
  flex: 2;
  border: 1px solid red;
`;

export const UserInfo = styled.div`
  border: 1px solid ${styleSet.mainColor};
  border-radius: 1rem;
  padding: 1rem;
`;

export const UserImageBox = styled.div`
  width: 100%;
  aspect-ratio: 1 / 1;
  border: 1px solid black;
  border-radius: 1rem;
  overflow: hidden;
`;

export const DefaultImage = styled.div`
  width: 100%;
  height: 100%;
  background-color: #ddd;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #888;
  cursor: pointer;
`;

export const UserName = styled.span`
  font-weight: bold;
  font-size: 1.5rem;
`;

export const PointBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Point = styled.span`
  color: ${styleSet.mainColor};
  font-weight: bold;
  font-size: 1rem;
  font-style: italic;
`;

export const TabBox = styled.nav`
  border: 1px solid black;
  padding-top: 1rem;
`;

export const TabUl = styled.ul`
  list-style: none;

  border-top: 1px solid #ddd;
`;

export const TabLi = styled.li`
  cursor: pointer;
  padding: 1rem;
  transition: all 0.3s ease-in-out;
  text-indent: ${(props: IStyle) => (props.isActive ? "0.5rem" : "inherit")};
  background-color: ${(props: IStyle) => (props.isActive ? "#ddd" : "inherit")};

  :hover {
    background-color: ${(props: IStyle) => (props.isActive ? "#ddd" : "#eee")};
    text-indent: 0.5rem;
  }
`;

export const Divider = styled.div`
  flex: 0;
  border-left: 1px solid #ccc;
  margin: 0 1rem;
`;

export const RightSideWrapper = styled.div`
  flex: 7;
  border: 1px solid black;
`;

export const TabContentBox = styled.div`
  padding: 1rem;
`;
