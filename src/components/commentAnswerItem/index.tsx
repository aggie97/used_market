import { useMutation } from "@apollo/client";
import { ChangeEvent, useState } from "react";
import {
  IMutation,
  IMutationDeleteUseditemQuestionAnswerArgs,
  IMutationUpdateUseditemQuestionAnswerArgs,
  IUseditemQuestionAnswer,
} from "../../commons/types/generated/types";
import {
  DELETE_USED_ITEM_QUESTION_ANSWER,
  FETCH_USED_ITEM_QUESTION_ANSWERS,
  UPDATE_USED_ITEM_QUESTION_ANSWER,
} from "../units/product/comment/commentList/ProductCommentList.queries";

const CommentAnswerItem = ({
  answer,
  questionId,
}: {
  answer: IUseditemQuestionAnswer;
  questionId: string;
}) => {
  const [isAnswerEditOpen, setIsAnswerEditOpen] = useState(false);
  const [contents, setContents] = useState("");

  const [updatedUseditemQuestionAnswer] = useMutation<
    Pick<IMutation, "updateUseditemQuestionAnswer">,
    IMutationUpdateUseditemQuestionAnswerArgs
  >(UPDATE_USED_ITEM_QUESTION_ANSWER);

  const [deleteUseditemQuestionAnswer] = useMutation<
    Pick<IMutation, "deleteUseditemQuestionAnswer">,
    IMutationDeleteUseditemQuestionAnswerArgs
  >(DELETE_USED_ITEM_QUESTION_ANSWER);

  const onClickSubmitEditAnswer = async () => {
    console.log(contents);
    try {
      await updatedUseditemQuestionAnswer({
        variables: {
          updateUseditemQuestionAnswerInput: { contents },
          useditemQuestionAnswerId: answer._id,
        },
        // refetchQueries: [{ query: FETCH_USED_ITEM_QUESTION_ANSWERS }],
      });
      setIsAnswerEditOpen(false);
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    }
  };

  const onClickEditAnswer = () => {
    setIsAnswerEditOpen((prev) => !prev);
  };
  const onClickDeleteAnswer = async () => {
    try {
      await deleteUseditemQuestionAnswer({
        variables: {
          useditemQuestionAnswerId: answer._id,
        },
        refetchQueries: [
          {
            query: FETCH_USED_ITEM_QUESTION_ANSWERS,
            variables: { useditemQuestionId: questionId },
          },
        ],
      });
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    }
  };

  const onChangeEditAnswer = (event: ChangeEvent<HTMLInputElement>) => {
    setContents(event.target.value);
  };
  return (
    <div style={{ textIndent: "20px" }} key={answer._id}>
      <div style={{ display: "flex", gap: "10px" }}>
        ㄴ A
        {isAnswerEditOpen ? (
          <input
            onChange={onChangeEditAnswer}
            defaultValue={answer.contents}
            type="text"
          />
        ) : (
          <span>{answer.contents}</span>
        )}
        <div>
          {isAnswerEditOpen ? (
            <>
              <button onClick={onClickSubmitEditAnswer}>수정하기</button>
              <button onClick={onClickEditAnswer}>돌아가기</button>
            </>
          ) : (
            <button onClick={onClickEditAnswer}>A수정</button>
          )}
          <button onClick={onClickDeleteAnswer}>A삭제</button>
        </div>
      </div>
    </div>
  );
};

export default CommentAnswerItem;
