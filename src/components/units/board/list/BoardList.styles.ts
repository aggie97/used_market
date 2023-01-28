import styled from "@emotion/styled";

/* --------- 게시물 상세 페이지 ---------- */

export const Wrapper = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
`;
export const Header = styled.div``;
export const Banner = styled.h1`
  text-align: center;
  font-weight: 700;
  font-size: 36px;
  font-family: Roboto;
`;

export const BestBoards = styled.div`
  width: 100%;
  padding-top: 2.5em;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5em;
`;

export const BestBoardLayout = styled.div`
  position: relative;
  padding-bottom: 90%;
  width: 100%;
`;

export const BestBoard = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #fff;
  border-radius: 1.25em;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  cursor: pointer;
  transition: 0.3s all ease;
  &:hover {
    transform: translateY(-20px);
    box-shadow: 5px 5px 10px 5px rgba(0, 0, 0, 0.1);
  }
`;

export const BestBoardImg = styled.img`
  flex: 1;
  max-height: 110px;
  object-fit: contain;
  background: #eee;
`;

export const BestBoardInfo = styled.div`
  flex: 1.05;
  display: flex;
  flex-direction: column;
  padding: 5%;
`;

export const BestBoardTitle = styled.span`
  font-size: 1.125em;
  font-weight: 500;
  padding-bottom: 10%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
export const BestBoardContents = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const BestBoardProfile = styled.div``;
export const BestBoardProfileImg = styled.img``;
export const BestBoardWriter = styled.span``;
export const BestBoardCreatedAt = styled.span``;
export const BestBoardLike = styled.span``;

export const SearchBox = styled.div`
  display: flex;
  gap: 1.5em;
  padding-top: 5em;
  padding-bottom: 2.5em;
`;
export const SearchInput = styled.input`
  flex: 3;
  padding: 1rem;
`;

export const SearchDate = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid gray;
`;

export const StartAt = styled.input`
  padding: 1rem;
  border: none;
`;
export const EndAt = styled.input`
  padding: 1rem;
  border: none;
`;
export const SearchButton = styled.button`
  flex: 0.5;
  padding: 1rem;
`;

export const ListBox = styled.div`
  border-top: 1px solid black;
  border-bottom: 1px solid black;
`;

export const ListHeader = styled.div`
  height: 4em;
  height: 4em;
  border-top: 1px solid #bdbdbd;
  display: flex;
  text-align: center;
  line-height: 4em;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const ListNumber = styled.div`
  flex: 1;
`;
export const ListTitle = styled.div`
  flex: 7;
`;
export const ListWriter = styled.div`
  flex: 2;
`;
export const ListCreatedAt = styled.div`
  flex: 1;
`;

export const List = styled.div`
  height: 4em;
  border-top: 1px solid #bdbdbd;
  display: flex;
  text-align: center;
  line-height: 4em;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  cursor: pointer;
  transition: 0.3s all ease-in-out;
  &:hover {
    background-color: #ddd;
  }
`;

export const BoardNumber = styled.div`
  flex: 1;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
export const BoardTitle = styled.span`
  flex: 7;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
export const BoardWriter = styled.div`
  flex: 2;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
export const BoardCreatedAt = styled.div`
  flex: 1;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
export const Footer = styled.div`
  padding-top: 3.5em;
  width: 100%;
  display: flex;
  justify-content: space-between;
  & > * {
    max-width: 170px;
  }
`;

export const BoxForLayout = styled.div`
  flex: 1;
`;

export const PageBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ddd;
  flex: 1;
`;

export const PrevPage = styled.div``;
export const NextPage = styled.div``;

export const RegisterButton = styled.button`
  flex: 1;
  padding: 1em;
`;
