import { ChangeEvent, MouseEvent } from "react";
import {
  IQuery,
  IUpdateBoardCommentInput,
} from "../../../../commons/types/generated/types";
export interface IBoardCommentListUI {
  data?: Pick<IQuery, "fetchBoardComments">;
  textCount: number;
  isOpen: boolean;
  isOpenDeleteModal: boolean;
  onToggleDeleteModal: (
    event: MouseEvent<HTMLImageElement> | MouseEvent<HTMLElement>
  ) => void;
  onChangeDeletePw: (event: ChangeEvent<HTMLInputElement>) => void;
  idForEdit: string;
  onUnfoldEditModal: (
    evnet: MouseEvent<HTMLButtonElement> | MouseEvent<HTMLImageElement>
  ) => void;

  onUpdateComment: (event: MouseEvent<HTMLButtonElement>) => void;
  onDeleteComment: () => void;

  onChangeEditComment: (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => void;
  onClickComment: (event: any) => void;
  onLoadMore: () => void;
}

interface IComment {
  writer: string;
  password: string;
  contents: string;
  rating: number;
}

export interface IBoardCommentUI {
  comment: IComment;
  textCount: number;
  onSubmitComment: (event: MouseEvent<HTMLButtonElement>) => void;
  onChangeComment: (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => void;
}

export interface IRouter {
  routerId: string;
}

export interface IMyVariables {
  boardCommentId: string;
  password: string;
  updateBoardCommentInput: IUpdateBoardCommentInput;
}
