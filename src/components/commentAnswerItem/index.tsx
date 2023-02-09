import { EllipsisOutlined } from "@ant-design/icons";
import { useMutation } from "@apollo/client";
import styled from "@emotion/styled";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { getDate } from "../../commons/libraries/getDate";
import {
  IMutation,
  IMutationDeleteUseditemQuestionAnswerArgs,
  IMutationUpdateUseditemQuestionAnswerArgs,
  IUseditemQuestionAnswer,
} from "../../commons/types/generated/types";
import DefaultAvatar from "../common/defaultAvatar";
import useCheckLoggedInUser from "../common/useCheckLoggedInUser";
import {
  DELETE_USED_ITEM_QUESTION_ANSWER,
  FETCH_USED_ITEM_QUESTION_ANSWERS,
  UPDATE_USED_ITEM_QUESTION_ANSWER,
} from "../units/product/comment/commentList/ProductCommentList.queries";

interface IStyle {
  isEditMode?: boolean;
}

const CommentAnswerItem = ({
  answer,
  questionId,
}: {
  answer: IUseditemQuestionAnswer;
  questionId: string;
}) => {
  const loggedInUserId = useCheckLoggedInUser();
  const { register, handleSubmit, setFocus } = useForm();
  const [isEditAnswerOpen, setIsEditAnswerOpen] = useState(false);

  const [isOpenButtonBox, setIsOpenButtonBox] = useState(false);
  const [updatedUseditemQuestionAnswer] = useMutation<
    Pick<IMutation, "updateUseditemQuestionAnswer">,
    IMutationUpdateUseditemQuestionAnswerArgs
  >(UPDATE_USED_ITEM_QUESTION_ANSWER);

  const [deleteUseditemQuestionAnswer] = useMutation<
    Pick<IMutation, "deleteUseditemQuestionAnswer">,
    IMutationDeleteUseditemQuestionAnswerArgs
  >(DELETE_USED_ITEM_QUESTION_ANSWER);

  const onSubmitEditAnswer = async (data: any) => {
    try {
      await updatedUseditemQuestionAnswer({
        variables: {
          updateUseditemQuestionAnswerInput: { ...data },
          useditemQuestionAnswerId: answer._id,
        },
        // refetchQueries: [{ query: FETCH_USED_ITEM_QUESTION_ANSWERS }],
      });
      setIsEditAnswerOpen(false);
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    }
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

  const onClickEditAnswer = () => {
    setIsOpenButtonBox(false);
    setIsEditAnswerOpen(true);
    setFocus("contents");
  };

  const onCancelEditAnswer = () => {
    setIsEditAnswerOpen(false);
  };

  const onClickOpenButtonBox = () => {
    setIsOpenButtonBox((prev) => !prev);
  };

  return (
    <QuestionAnswer key={answer._id}>
      <UserInfo>
        <div>
          {answer.user.picture ? (
            <Image layout="fill" src={String(answer.user.picture)} />
          ) : (
            <DefaultAvatar />
          )}{" "}
          <span>{answer.user.name}</span>
        </div>
        <div>{getDate(answer.createdAt)}</div>
      </UserInfo>
      <Form onSubmit={handleSubmit(onSubmitEditAnswer)}>
        <QuestionContents
          isEditMode={isEditAnswerOpen}
          readOnly={!isEditAnswerOpen}
          defaultValue={answer?.contents}
          {...register("contents")}
        ></QuestionContents>
        {isEditAnswerOpen && (
          <div>
            <button>수정하기</button>
            <button type="button" onClick={onCancelEditAnswer}>
              취소하기
            </button>
          </div>
        )}
      </Form>
      {loggedInUserId === answer.user._id && (
        <>
          <ButtonBox>
            {isOpenButtonBox && (
              <>
                <button onClick={onClickEditAnswer}>수정하기</button>
                <button onClick={onClickDeleteAnswer}>삭제하기</button>
              </>
            )}
          </ButtonBox>
          <ToggleButtonForButtonBox onClick={onClickOpenButtonBox}>
            <EllipsisOutlined />
          </ToggleButtonForButtonBox>
        </>
      )}
    </QuestionAnswer>
  );
};

export default CommentAnswerItem;

const QuestionAnswer = styled.div`
  position: relative;
  margin-top: 1rem;
  margin-left: 5rem;
  border-radius: 1rem;
  padding: 1rem;
  background-color: #eee;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1.5rem;
  div:nth-of-type(1) {
    display: flex;
    align-items: center;
  }
`;

const Form = styled.form`
  flex: 5;
  min-height: 6rem;
  padding-left: 1rem;

  > div {
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
  }

  > div button {
    cursor: pointer;
  }
`;

const QuestionContents = styled.textarea`
  width: 100%;
  height: 100%;
  resize: none;
  border: none;
  outline: none;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: ${(props: IStyle) =>
    props.isEditMode ? "#fff" : "transparent"};
`;

const ButtonBox = styled.div`
  position: absolute;
  right: 3rem;
  display: flex;
  flex-direction: column;

  border-radius: 0.5rem;
  overflow: hidden;
  min-width: 150px;
  * {
    flex: 1;
  }

  button {
    border: 1px solid #ddd;
    background-color: #fff;
    padding: 0.5rem;
    cursor: pointer;
    :hover {
      background-color: #ddd;
    }
  }
`;

const ToggleButtonForButtonBox = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
`;
