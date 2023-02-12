import { uniqueId } from "lodash";
import { getDate } from "../../../../commons/libraries/getDate";
import { IBoard } from "../../../../commons/types/generated/types";
import Button from "../../../common/button";
import DefaultAvatar from "../../../common/defaultAvatar";
import Pagination from "../../../common/pagination";
import * as B from "./BoardList.styles";
import { IBoardList } from "./BoardList.types";
import { DatePicker } from "antd";
const BoardListUI = ({
  totalBoards,
  bestBoards,
  onClickCreate,
  onClickListItem,
  onClickBestItem,
  onChangeSearch,
  onChangeDate,
  refetch,
  count,
  keyword,
}: IBoardList) => {
  const { RangePicker } = DatePicker;
  return (
    <B.Wrapper>
      <B.Header>
        <B.Banner>베스트 게시글</B.Banner>
        <B.BestBoards>
          {bestBoards?.fetchBoardsOfTheBest.map((best) => {
            return (
              <B.BestBoardLayout key={best._id} id="BestParent">
                <B.BestBoard onClick={onClickBestItem} id={best._id}>
                  {best.images?.[0] ? (
                    <B.BestBoardImg
                      src={`https://storage.googleapis.com/${
                        best.images?.[0] ?? ""
                      }`}
                    />
                  ) : (
                    <B.BestBoardDefaultImg>이미지 없음</B.BestBoardDefaultImg>
                  )}
                  <B.BestBoardInfo>
                    <B.BestBoardTitle>{best.title}</B.BestBoardTitle>
                    <B.BestBoardContents>
                      <B.BestBoardProfile>
                        {best.user?.picture ? (
                          <B.BestBoardProfileImg
                            src={`https://storage.googleapis.com/${String(
                              best.user?.picture
                            )}`}
                          />
                        ) : (
                          <DefaultAvatar />
                        )}
                        <B.BestBoardWriter>{best.writer}</B.BestBoardWriter>
                      </B.BestBoardProfile>
                      <B.BestBoardCreatedAt>
                        {getDate(best.createdAt).substring(2)}
                      </B.BestBoardCreatedAt>
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
        <RangePicker
          format="YYYY-MM-DD HH:mm"
          showTime
          onChange={onChangeDate}
        />
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
        <Button height="3rem" onClick={onClickCreate}>
          게시물 등록하기
        </Button>
      </B.Footer>
    </B.Wrapper>
  );
};
export default BoardListUI;
