import { uniqueId } from "lodash";
import { IBoard } from "../../../../commons/types/generated/types";
import Pagination from "../../../common/pagination";
import * as B from "./BoardList.styles";
import { IBoardList } from "./BoardList.types";
const BoardListUI = ({
  totalBoards,
  bestBoards,
  onClickCreate,
  onClickListItem,
  onClickBestItem,
  onChangeSearch,
  refetch,
  count,
  keyword,
}: IBoardList) => {
  return (
    <B.Wrapper>
      <B.Header>
        <B.Banner>베스트 게시글</B.Banner>
        <B.BestBoards>
          {bestBoards?.fetchBoardsOfTheBest.map((best) => {
            return (
              <B.BestBoardLayout key={best._id} id="BestParent">
                <B.BestBoard onClick={onClickBestItem} id={best._id}>
                  <B.BestBoardImg
                    src={`https://storage.googleapis.com/${
                      best.images?.[0] ?? ""
                    }`}
                  />
                  <B.BestBoardInfo>
                    <B.BestBoardTitle>{best.title}</B.BestBoardTitle>
                    <B.BestBoardContents>
                      <B.BestBoardProfile>
                        <B.BestBoardProfileImg />
                        <B.BestBoardWriter>{best.writer}</B.BestBoardWriter>
                      </B.BestBoardProfile>
                    </B.BestBoardContents>
                  </B.BestBoardInfo>
                </B.BestBoard>
              </B.BestBoardLayout>
            );
          })}
        </B.BestBoards>
      </B.Header>
      <B.SearchBox>
        <B.SearchInput
          onChange={onChangeSearch}
          placeholder="제목으로 검색하기"
        />
        <B.SearchDate>
          <B.StartAt type="date" />
          <div>~</div>
          <B.EndAt type="date" />
        </B.SearchDate>
      </B.SearchBox>
      <B.ListBox>
        <B.ListHeader>
          <B.ListNumber>번호</B.ListNumber>
          <B.ListTitle>제목</B.ListTitle>
          <B.ListWriter>작성자</B.ListWriter>
          <B.ListCreatedAt>날짜</B.ListCreatedAt>
        </B.ListHeader>
        {totalBoards?.fetchBoards.map((board: IBoard, index: number) => (
          <B.List onClick={onClickListItem} id={board._id} key={board._id}>
            <B.BoardNumber>{index + 1}</B.BoardNumber>
            <B.BoardTitle>
              {board.title
                .replaceAll(keyword, `åß∂ƒ${keyword}åß∂ƒ`)
                .split("åß∂ƒ")
                .map((word) => (
                  <span
                    key={uniqueId()}
                    style={{
                      background: keyword === word ? "yellow" : "",
                      color: keyword === word ? "red" : "",
                    }}
                  >
                    {word}
                  </span>
                ))}
            </B.BoardTitle>
            <B.BoardWriter>{board.writer}</B.BoardWriter>
            <B.BoardCreatedAt>{board.createdAt.slice(0, 10)}</B.BoardCreatedAt>
          </B.List>
        ))}
      </B.ListBox>
      <B.Footer>
        <B.BoxForLayout></B.BoxForLayout>
        <Pagination count={count} refetch={refetch} />
        <B.RegisterButton onClick={onClickCreate}>
          게시물 등록하기
        </B.RegisterButton>
      </B.Footer>
    </B.Wrapper>
  );
};
export default BoardListUI;
