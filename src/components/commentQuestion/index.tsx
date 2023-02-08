import { EllipsisOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@apollo/client";
import styled from "@emotion/styled";
import { Divider } from "antd";
import Image from "next/image";
import { MouseEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { getDate } from "../../commons/libraries/getDate";
import {
  IMutation,
  IMutationCreateUseditemQuestionAnswerArgs,
  IMutationUpdateUseditemQuestionArgs,
  IQuery,
  IQueryFetchUseditemQuestionAnswersArgs,
  IUseditemQuestion,
  IUseditemQuestionAnswer,
} from "../../commons/types/generated/types";
import CommentAnswerItem from "../commentAnswerItem";
import DefaultAvatar from "../common/defaultAvatar";
import { UPDATE_USED_ITEM_QUESTION } from "../common/newComment/queries";
import {
  CREATE_USED_ITEM_QUESTION_ANSWER,
  FETCH_USED_ITEM_QUESTION_ANSWERS,
} from "../units/product/comment/commentList/ProductCommentList.queries";

const CommentQuestion = ({
  data,
  onClickDeleteQuestion,
}: {
  data?: IUseditemQuestion;
  onClickDeleteQuestion: (
    dataId: string
  ) => (event: MouseEvent<HTMLButtonElement>) => void;
}) => {
  const [isOpenButtonBox, setIsOpenButtonBox] = useState(false);
  const { register, handleSubmit, reset } = useForm<
    IUseditemQuestion & IUseditemQuestionAnswer
  >();
  const [isEditAnswerOpen, setIsEditAnswerOpen] = useState(false);
  const [isSubmitAnswerOpen, setIsSubmitAnswerOpen] = useState(false);

  const { data: dataA } = useQuery<
    Pick<IQuery, "fetchUseditemQuestionAnswers">,
    IQueryFetchUseditemQuestionAnswersArgs
  >(FETCH_USED_ITEM_QUESTION_ANSWERS, {
    variables: {
      useditemQuestionId: String(data?._id),
    },
  });
  const [updateUseditemQuestion] = useMutation<
    Pick<IMutation, "updateUseditemQuestion">,
    IMutationUpdateUseditemQuestionArgs
  >(UPDATE_USED_ITEM_QUESTION);

  const [createUseditemQuestionAnswer] = useMutation<
    Pick<IMutation, "createUseditemQuestionAnswer">,
    IMutationCreateUseditemQuestionAnswerArgs
  >(CREATE_USED_ITEM_QUESTION_ANSWER);

  const onClickSubmitAnswer = () => {
    setIsSubmitAnswerOpen((prev) => !prev);
  };

  const onSubmitAnswer = async (formData: IUseditemQuestionAnswer) => {
    try {
      await createUseditemQuestionAnswer({
        variables: {
          createUseditemQuestionAnswerInput: { ...formData },
          useditemQuestionId: String(data?._id),
        },
        refetchQueries: [
          {
            query: FETCH_USED_ITEM_QUESTION_ANSWERS,
            variables: { useditemQuestionId: String(data?._id) },
          },
        ],
      });
      setIsSubmitAnswerOpen((prev) => !prev);
      reset();
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    }
  };

  const onEditAnswer = async (formData: IUseditemQuestion) => {
    try {
      await updateUseditemQuestion({
        variables: {
          updateUseditemQuestionInput: { ...formData },
          useditemQuestionId: String(data?._id),
        },
      });
      setIsEditAnswerOpen((prev) => !prev);
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    }
  };

  const onClickEditQuestion = () => {
    setIsEditAnswerOpen((prev) => !prev);
  };

  const onClickOpenButtonBox = () => {
    setIsOpenButtonBox((prev) => !prev);
  };

  return (
    <>
      <QuestionWrapper style={{ display: "flex", gap: "20px" }}>
        <UserInfo>
          <div>
            {data?.user.picture ? (
              <Image layout="fill" src={String(data?.user.picture)} />
            ) : (
              <DefaultAvatar />
            )}{" "}
            <span>{data?.user.name}</span>
          </div>
          <div>{getDate(data?.createdAt)}</div>
        </UserInfo>
        <span>{data?.contents}</span>
        <ButtonBox>
          {isOpenButtonBox && (
            <>
              <button onClick={onClickSubmitAnswer}>답글 달기</button>
              <button onClick={onClickEditQuestion}>수정하기</button>
              <button onClick={onClickDeleteQuestion(String(data?._id))}>
                삭제하기
              </button>
            </>
          )}
        </ButtonBox>
        <ToggleButtonForButtonBox onClick={onClickOpenButtonBox}>
          <EllipsisOutlined />
        </ToggleButtonForButtonBox>
      </QuestionWrapper>
      {isSubmitAnswerOpen ? (
        <div>
          <form onSubmit={handleSubmit(onSubmitAnswer)}>
            <input type="text" {...register("contents")} />
            <button>A등록</button>
          </form>
        </div>
      ) : null}
      <Divider />
      {isEditAnswerOpen ? (
        <div>
          <form onSubmit={handleSubmit(onEditAnswer)}>
            <input type="text" {...register("contents")} />
            <button>Q수정</button>
          </form>
        </div>
      ) : null}
      {dataA?.fetchUseditemQuestionAnswers.map((el) => (
        <CommentAnswerItem
          key={el._id}
          answer={el}
          questionId={String(data?._id)}
        />
      ))}
    </>
  );
};

export default CommentQuestion;

const QuestionWrapper = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: flex-start;
  span {
    flex: 8;
  }
  border-radius: 1rem;
  padding: 1rem;
  background-color: #eee;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  div:nth-of-type(1) {
    display: flex;
    align-items: center;
  }
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
