import BoardCommentCreateUI from "./BoardCommentCreate.presenter";
import { useMutation } from "@apollo/client";
import { ChangeEvent, useState } from "react";
import {
  FETCH_BOARD_COMMENTS,
  CREATE_BOARD_COMMENT,
} from "./BoardCommentCreate.queries";
import {
  IMutation,
  IMutationCreateBoardCommentArgs,
} from "../../../../commons/types/generated/types";

import { Modal } from "antd";

interface IRouter {
  routerId: string;
}

const BoardCreateComment = ({ routerId }: IRouter) => {
  const [createBoardComment] = useMutation<
    Pick<IMutation, "createBoardComment">,
    IMutationCreateBoardCommentArgs
  >(CREATE_BOARD_COMMENT);

  const [comment, setComment] = useState({
    writer: "",
    password: "",
    contents: "",
    rating: 1,
  });

  const [textCount, setTextCount] = useState(0);

  const onChangeComment = (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    setComment({ ...comment, [event.target.id]: event.target.value });
    event.target.id === "contents" && setTextCount(event.target.value.length);
  };

  const onSubmitComment = async () => {
    const { writer, password, contents, rating } = comment;
    if (writer && password && contents && rating) {
      try {
        await createBoardComment({
          variables: {
            boardId: routerId,
            createBoardCommentInput: {
              ...comment,
            },
          },
          refetchQueries: [
            {
              query: FETCH_BOARD_COMMENTS,
              variables: {
                boardId: routerId,
              },
            },
          ],
        });
        setComment({
          writer: "",
          password: "",
          contents: "",
          rating: 1,
        });
        Modal.success({
          content: "댓글이 등록되었습니다.",
        });
      } catch (error) {
        if (error instanceof Error) {
          Modal.error({
            content: `${error.message}`,
          });
        }
      }
    } else {
      Modal.warning({
        content: "양식이 비어있습니다.",
      });
    }
  };

  return (
    <BoardCommentCreateUI
      comment={comment}
      textCount={textCount}
      onSubmitComment={onSubmitComment}
      onChangeComment={onChangeComment}
    />
  );
};

export default BoardCreateComment;
