import BoardListUI from "./BoardList.presenter";
import FETCH_BOARDS, {
  FETCH_BEST_BOARDS,
  FETCH_BOARDS_COUNT,
} from "./BoardList.queries";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { ChangeEvent, MouseEvent, useState } from "react";
import {
  IQuery,
  IQueryFetchBoardsArgs,
} from "../../../../commons/types/generated/types";

import { debounce } from "lodash";

const BoardList = () => {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");
  const { data: totalBoards, refetch } = useQuery<
    Pick<IQuery, "fetchBoards">,
    IQueryFetchBoardsArgs
  >(FETCH_BOARDS);

  const { data: bestBoards } =
    useQuery<Pick<IQuery, "fetchBoardsOfTheBest">>(FETCH_BEST_BOARDS);

  const { data: totalBoardsCount, refetch: refetchCount } =
    useQuery<Pick<IQuery, "fetchBoardsCount">>(FETCH_BOARDS_COUNT);

  // const [titleSearch, setTitleSearch] = useState("");
  // 검색 state

  const onClickCreate = () => {
    void router.push(`/boards/new`);
  };
  const onClickListItem = (event: MouseEvent<HTMLDivElement>) => {
    void router.push(`/boards/${event.currentTarget.id}`);
  };
  const onClickBestItem = (event: MouseEvent<HTMLDivElement>) => {
    void router.push(`/boards/${event.currentTarget.id}`);
  };

  const getDebounceToRefetch = debounce(async (value) => {
    await refetch({ search: value, page: 1 });
    await refetchCount({ search: value });
    setKeyword(value);
  }, 500);

  const onChangeSearch = async (event: ChangeEvent<HTMLInputElement>) => {
    await getDebounceToRefetch(event.target.value);
  };

  return (
    <BoardListUI
      onClickCreate={onClickCreate}
      totalBoards={totalBoards}
      bestBoards={bestBoards}
      onClickListItem={onClickListItem}
      onClickBestItem={onClickBestItem}
      onChangeSearch={onChangeSearch}
      refetch={refetch}
      count={totalBoardsCount?.fetchBoardsCount}
      keyword={keyword}
    />
  );
};

export default BoardList;
