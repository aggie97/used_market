import { useMutation, useQuery } from "@apollo/client";
import styled from "@emotion/styled";
import { Divider } from "antd";
import Image from "next/image";
import { MouseEvent, useState } from "react";
import { useForm } from "react-hook-form";
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
import Button from "../common/button";
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

  return (
    <>
      <QuestionWrapper style={{ display: "flex", gap: "20px" }}>
        <span>
          <Image src={String(data?.user.picture)} /> {data?.user.name}
        </span>
        <span>질문: {data?.contents}</span>
        <ButtonBox>
          <Button onClick={onClickSubmitAnswer}>A달기</Button>
          <Button onClick={onClickEditQuestion}>Q수정</Button>
          <button onClick={onClickDeleteQuestion(String(data?._id))}>
            Q삭제
          </button>
        </ButtonBox>
      </QuestionWrapper>
      <Divider />
      {isSubmitAnswerOpen ? (
        <div>
          <form onSubmit={handleSubmit(onSubmitAnswer)}>
            <input type="text" {...register("contents")} />
            <button>A등록</button>
          </form>
        </div>
      ) : null}
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
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

const ButtonBox = styled.div`
  display: flex;
  min-width: 300px;
`;
