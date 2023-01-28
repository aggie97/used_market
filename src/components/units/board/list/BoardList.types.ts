import { Maybe } from "graphql/jsutils/Maybe";
import { ApolloQueryResult } from "@apollo/client";
import { ChangeEvent, MouseEvent } from "react";
import {
  IQuery,
  IQueryFetchBoardsArgs,
} from "../../../../commons/types/generated/types";

export interface IBoardArray {
  _id?: string;
  contents?: string;
  createdAt?: string;
  dislikeCount?: number;
  title?: string;
  writer?: Maybe<string>;
}

export interface IBoardList {
  onClickCreate: (event: MouseEvent<HTMLButtonElement>) => void;
  onClickListItem?: (event: MouseEvent<HTMLDivElement>) => void;
  onClickBestItem: (event: MouseEvent<HTMLDivElement>) => void;
  onChangeSearch: (event: ChangeEvent<HTMLInputElement>) => void;
  totalBoards?: Pick<IQuery, "fetchBoards">;
  bestBoards?: Pick<IQuery, "fetchBoardsOfTheBest">;
  count?: number;
  keyword: string;
  refetch: (
    variables?: Partial<IQueryFetchBoardsArgs> | undefined
  ) => Promise<ApolloQueryResult<Pick<IQuery, "fetchBoards">>>;
}
