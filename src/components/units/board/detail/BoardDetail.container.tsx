import BoardDetailUI from "./BoardDetail.presenter";
import FETCH_BOARD, {
  DELETE_BOARD,
  LIKE_BOARD,
  DISLIKE_BOARD,
} from "./BoardDetail.queries";
import { useQuery, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useState } from "react";
import {
  IMutation,
  IMutationDeleteBoardArgs,
  IMutationDislikeBoardArgs,
  IMutationLikeBoardArgs,
  IQuery,
  IQueryFetchBoardArgs,
} from "../../../../commons/types/generated/types";
import { Modal } from "antd";

const BoardDetail = () => {
  const router = useRouter();

  const [deleteBoard] = useMutation<
    Pick<IMutation, "deleteBoard">,
    IMutationDeleteBoardArgs
  >(DELETE_BOARD);
  const [likeBoard] = useMutation<
    Pick<IMutation, "likeBoard">,
    IMutationLikeBoardArgs
  >(LIKE_BOARD);
  const [dislikeBoard] = useMutation<
    Pick<IMutation, "dislikeBoard">,
    IMutationDislikeBoardArgs
  >(DISLIKE_BOARD);

  const { loading, data } = useQuery<
    Pick<IQuery, "fetchBoard">,
    IQueryFetchBoardArgs
  >(FETCH_BOARD, {
    variables: {
      boardId: String(router.query.id),
    },
  });

  const [addressBox, setAddressBox] = useState(false);
  console.log(addressBox);
  const onClickAddressLink = () => {
    setAddressBox((prev) => !prev);
  };

  const onClickEdit = async () => {
    await router.push(`/boards/${String(router.query.id)}/edit`);
  };

  const onClickToList = async () => {
    await router.push(`/boards/`);
  };

  const onClickDelete = async () => {
    await deleteBoard({
      variables: { boardId: String(router.query.id) },
    });
    Modal.success({
      content: "게시글이 삭제되었습니다.",
    });
    await router.push(`/boards`);
  };

  const onClickLike = async () => {
    await likeBoard({
      variables: { boardId: String(router.query.id) },
      refetchQueries: [
        { query: FETCH_BOARD, variables: { boardId: router.query.id } },
      ],
    });
  };
  const onClickDislike = async () => {
    await dislikeBoard({
      variables: { boardId: String(router.query.id) },
      refetchQueries: [
        { query: FETCH_BOARD, variables: { boardId: router.query.id } },
      ],
    });
  };

  return (
    <BoardDetailUI
      data={data}
      loading={loading}
      addressBox={addressBox}
      onClickAddressLink={onClickAddressLink}
      onClickEdit={onClickEdit}
      onClickToList={onClickToList}
      onClickDelete={onClickDelete}
      onClickLike={onClickLike}
      onClickDislike={onClickDislike}
    />
  );
};

export default BoardDetail;
