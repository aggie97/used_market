import { EllipsisOutlined } from "@ant-design/icons";
import { gql, useMutation, useQuery } from "@apollo/client";
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

interface IStyle {
  isEditMode?: boolean;
}

const FETCH_USER_LOGGED_IN = gql`
  query {
    fetchUserLoggedIn {
      _id
    }
  }
`;

const CommentQuestion = ({
  data,
  onClickDeleteQuestion,
}: {
  data?: IUseditemQuestion;
  onClickDeleteQuestion: (
    dataId: string
  ) => (event: MouseEvent<HTMLButtonElement>) => void;
}) => {
  const { data: userData } =
    useQuery<Pick<IQuery, "fetchUserLoggedIn">>(FETCH_USER_LOGGED_IN);
  const [isOpenButtonBox, setIsOpenButtonBox] = useState(false);
  const { register, handleSubmit, reset, setFocus, resetField } = useForm<
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

  const onSubmitAnswer = async (formData: IUseditemQuestionAnswer) => {
    try {
      await createUseditemQuestionAnswer({
        variables: {
          createUseditemQuestionAnswerInput: { ...formData },
          useditemQuestionId: String(data?._id),
        },
        // refetchQueries: [
        //   {
        //     query: FETCH_USED_ITEM_QUESTION_ANSWERS,
        //     variables: { usedItemQuestionId: String(data?._id) },
        //   },
        // ],
        update(cache, { data }) {
          cache.modify({
            fields: {
              fetchUsedItemQuestionAnswers: (prev) => {
                return [data?.createUseditemQuestionAnswer, ...prev];
              },
            },
          });
        },
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
        update(cache) {
          cache.modify({
            fields: { fetchUsedItemQuestions: () => {} },
          });
        },
      });
      setIsEditAnswerOpen(false);
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    }
  };

  const onClickSubmitAnswer = () => {
    resetField("contents");
    setIsSubmitAnswerOpen((prev) => !prev);
    setIsOpenButtonBox(false);
    setFocus("contents");
  };

  const onClickEditQuestion = () => {
    setIsEditAnswerOpen((prev) => !prev);
    setFocus("contents");
    setIsOpenButtonBox((prev) => !prev);
  };

  const onClickOpenButtonBox = () => {
    setIsOpenButtonBox((prev) => !prev);
  };

  const onCancelEditQuestion = () => {
    setIsEditAnswerOpen(false);
  };

  return (
    <>
      <QuestionWrapper>
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
        <Form onSubmit={handleSubmit(onEditAnswer)}>
          <QuestionContents
            isEditMode={isEditAnswerOpen}
            readOnly={!isEditAnswerOpen}
            defaultValue={data?.contents}
            {...register("contents")}
          ></QuestionContents>
          {isEditAnswerOpen && (
            <div>
              <button>수정하기</button>
              <button type="button" onClick={onCancelEditQuestion}>
                취소하기
              </button>
            </div>
          )}
        </Form>
        <ButtonBox>
          {isOpenButtonBox && (
            <>
              <button onClick={onClickSubmitAnswer}>답글 달기</button>
              {userData?.fetchUserLoggedIn._id === data?.user._id && (
                <>
                  <button onClick={onClickEditQuestion}>수정하기</button>
                  <button onClick={onClickDeleteQuestion(String(data?._id))}>
                    삭제하기
                  </button>
                </>
              )}
            </>
          )}
        </ButtonBox>
        <ToggleButtonForButtonBox onClick={onClickOpenButtonBox}>
          <EllipsisOutlined />
        </ToggleButtonForButtonBox>
      </QuestionWrapper>
      {isSubmitAnswerOpen && (
        <QuestionAnswer>
          <form onSubmit={handleSubmit(onSubmitAnswer)}>
            <QuestionContents {...register("contents")}></QuestionContents>
            <div>
              <button>답글 달기</button>
              <button
                type="button"
                onClick={() => setIsSubmitAnswerOpen(false)}
              >
                취소하기
              </button>
            </div>
          </form>
        </QuestionAnswer>
      )}
      {dataA?.fetchUseditemQuestionAnswers.map((el) => (
        <CommentAnswerItem
          key={el._id}
          answer={el}
          questionId={String(data?._id)}
        />
      ))}
      <Divider />
    </>
  );
};

export default CommentQuestion;

const QuestionWrapper = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
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

const QuestionAnswer = styled.div`
  margin-top: 1rem;
  margin-left: 5rem;
  border-radius: 1rem;
  padding: 1rem;
  background-color: #fff;
  border: 2px solid #eee;
`;

const ToggleButtonForButtonBox = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
`;
