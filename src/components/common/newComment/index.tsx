import { Reference, StoreObject, useMutation } from "@apollo/client";
import { Modal } from "antd";
import { useRouter } from "next/router";
import { Dispatch, MouseEvent, SetStateAction, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  IMutation,
  IMutationCreateUseditemQuestionAnswerArgs,
  IMutationDeleteUseditemQuestionAnswerArgs,
  IMutationDeleteUseditemQuestionArgs,
  IMutationUpdateUseditemQuestionAnswerArgs,
  IMutationUpdateUseditemQuestionArgs,
  // IQuery,
  // IQueryFetchUseditemQuestionAnswersArgs,
  IUseditemQuestion,
  IUseditemQuestionAnswer,
} from "../../../commons/types/generated/types";
import {
  CREATE_USED_ITEM_QUESTION_ANSWER,
  DELETE_USED_ITEM_QUESTION_ANSWER,
  FETCH_USED_ITEM_QUESTION_ANSWERS,
  UPDATE_USED_ITEM_QUESTION_ANSWER,
} from "../../units/product/comment/commentList/ProductCommentList.queries";
import {
  Form,
  NewCommentWrapper,
  TextArea,
  Title,
} from "../../units/product/comment/newComment/ProductComment.styles";
import Button from "../button";
import {
  DELETE_USED_ITEM_QUESTION,
  FETCH_USED_ITEM_QUESTIONS,
  UPDATE_USED_ITEM_QUESTION,
} from "./queries";
import {
  ButtonBox,
  CommentBox,
  CommentCreatedAt,
  CommentForm,
  CommentInput,
  CommentUser,
  UserName,
  UserPicture,
} from "./styles";

interface ICommentProps {
  isSubmit: any;
  comment?: IUseditemQuestion;
  isEdit: boolean;
  setIdForEdit: Dispatch<SetStateAction<string>>;
  isAnswer?: boolean;
  setIdForSubmit: Dispatch<SetStateAction<string>>;
  setIdForOpenAnswer: Dispatch<SetStateAction<string>>;
}

const Comment = (props: ICommentProps) => {
  const router = useRouter();
  const { register, handleSubmit, setValue } =
    useForm<IUseditemQuestionAnswer>();
  useEffect(() => {
    setValue("contents", String(props.comment?.contents));
    if (props.isSubmit) setValue("contents", "");
  }, []);

  const [updateUseditemQuestion] = useMutation<
    Pick<IMutation, "updateUseditemQuestion">,
    IMutationUpdateUseditemQuestionArgs
  >(UPDATE_USED_ITEM_QUESTION);

  const [deleteUseditemQuestion] = useMutation<
    Pick<IMutation, "deleteUseditemQuestion">,
    IMutationDeleteUseditemQuestionArgs
  >(DELETE_USED_ITEM_QUESTION);

  const [createUseditemQuestionAnswer] = useMutation<
    Pick<IMutation, "createUseditemQuestionAnswer">,
    IMutationCreateUseditemQuestionAnswerArgs
  >(CREATE_USED_ITEM_QUESTION_ANSWER);

  const [updatedUseditemQuestionAnswer] = useMutation<
    Pick<IMutation, "updateUseditemQuestionAnswer">,
    IMutationUpdateUseditemQuestionAnswerArgs
  >(UPDATE_USED_ITEM_QUESTION_ANSWER);

  const [deleteUseditemQuestionAnswer] = useMutation<
    Pick<IMutation, "deleteUseditemQuestionAnswer">,
    IMutationDeleteUseditemQuestionAnswerArgs
  >(DELETE_USED_ITEM_QUESTION_ANSWER);

  // const { data } = useQuery<
  //   Pick<IQuery, "fetchUseditemQuestionAnswers">,
  //   IQueryFetchUseditemQuestionAnswersArgs
  // >(FETCH_USED_ITEM_QUESTION_ANSWERS, {
  //   variables: {
  //     useditemQuestionId: String(props.comment?._id),
  //     page: 1,
  //   },
  //   fetchPolicy: "cache-and-network",
  // });

  const onEdit = async (formData: IUseditemQuestionAnswer) => {
    if (!formData.contents) {
      Modal.warning({ content: "????????? ??????????????????!" });
      return;
    }
    try {
      if (props.isAnswer) {
        await updatedUseditemQuestionAnswer({
          variables: {
            updateUseditemQuestionAnswerInput: { ...formData },
            useditemQuestionAnswerId: String(props.comment?._id),
          },
        });
        props.setIdForEdit("");
      } else {
        await updateUseditemQuestion({
          variables: {
            updateUseditemQuestionInput: { ...formData },
            useditemQuestionId: String(props.comment?._id),
          },
        });
        props.setIdForEdit("");
      }
    } catch (error) {
      error instanceof Error && Modal.error({ content: error.message });
      props.setIdForEdit("");
    }
  };

  const onSubmit = async (formData: IUseditemQuestionAnswer) => {
    console.log("!", formData);
    if (!formData.contents) {
      Modal.warning({ content: "????????? ??????????????????!" });
      return;
    }
    try {
      await createUseditemQuestionAnswer({
        variables: {
          createUseditemQuestionAnswerInput: { ...formData },
          useditemQuestionId: String(props.comment?._id),
        },
        refetchQueries: [
          {
            query: FETCH_USED_ITEM_QUESTION_ANSWERS,
            variables: {
              useditemQuestionId: String(props.comment?._id),
              page: 1,
            },
          },
        ],
      });

      Modal.success({ content: "????????? ?????????????????????." });
      props.setIdForSubmit("");
    } catch (error) {
      error instanceof Error && Modal.error({ content: error.message });
    }
  };

  const onDelete = async () => {
    try {
      if (props.isAnswer) {
        await deleteUseditemQuestionAnswer({
          variables: { useditemQuestionAnswerId: String(props.comment?._id) },
          update(cache, { data }) {
            cache.modify({
              fields: {
                fetchUseditemQuestionAnswers: (prev, { readField }) => {
                  const deleteId = data?.deleteUseditemQuestionAnswer;
                  const filteredPrev = prev.filter(
                    (el: Reference | StoreObject | undefined) =>
                      readField("_id", el) !== deleteId
                  );
                  return [...filteredPrev];
                },
              },
            });
          },
        });

        Modal.success({ content: "?????? ????????? ?????????????????????." });
      } else {
        await deleteUseditemQuestion({
          variables: { useditemQuestionId: String(props.comment?._id) },
          refetchQueries: [
            {
              query: FETCH_USED_ITEM_QUESTIONS,
              variables: { page: 1, useditemId: String(router.query.id) },
            },
          ],
        });
        Modal.success({ content: "?????? ????????? ?????????????????????." });
      }
    } catch (error) {
      error instanceof Error && Modal.error({ content: error.message });
    }
  };

  const onClickEdit = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    props.setIdForEdit(String(props.comment?._id));
  };

  const onClickSubmit = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    props.setIdForSubmit((prev) => {
      if (prev) {
        return "";
      }
      return String(props.comment?._id);
    });
  };

  const onClickShowAnswers = async () => {
    props.setIdForOpenAnswer((prev) => {
      if (prev) return "";
      else return String(props.comment?._id);
    });
  };

  return (
    <>
      {props.isSubmit ? (
        <NewCommentWrapper>
          <Title>?????? ??????</Title>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <TextArea
              placeholder="?????? ????????? ???????????????."
              {...register("contents")}
            />
            <Button>????????????</Button>
          </Form>
        </NewCommentWrapper>
      ) : (
        <CommentBox>
          <CommentUser>
            <UserPicture imgUrl={props.comment?.user.picture ?? ""} />
            <UserName>{props.comment?.user.name}</UserName>
          </CommentUser>
          <CommentForm>
            <CommentInput
              disabled={!props.isEdit}
              {...register("contents")}
            ></CommentInput>
            <ButtonBox>
              <CommentCreatedAt>
                {props.comment?.createdAt.slice(0, 10)}
              </CommentCreatedAt>
              <div>
                {props.isAnswer ?? (
                  <>
                    <button type="button" onClick={onClickShowAnswers}>
                      ?????? ??????
                    </button>
                    <button type="submit" onClick={onClickSubmit}>
                      ?????? ??????
                    </button>
                  </>
                )}
                <button type="submit" onClick={handleSubmit(onDelete)}>
                  ????????????
                </button>
                <button
                  type="submit"
                  onClick={props.isEdit ? handleSubmit(onEdit) : onClickEdit}
                >
                  ????????????
                </button>
              </div>
            </ButtonBox>
          </CommentForm>
        </CommentBox>
      )}
    </>
  );
};

export default Comment;
