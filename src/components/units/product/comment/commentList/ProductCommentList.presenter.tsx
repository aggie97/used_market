import { useMutation, useQuery } from "@apollo/client";
import {
  IMutation,
  IMutationDeleteUseditemQuestionArgs,
  IQuery,
  IQueryFetchUseditemQuestionsArgs,
} from "../../../../../commons/types/generated/types";
import CommentQuestion from "../../../../commentQuestion";
import { DELETE_USED_ITEM_QUESTION } from "../../../../common/newComment/queries";
import { FETCH_USED_ITEM_QUESTIONS } from "./ProductCommentList.queries";
import { ProductCommentListWrapper } from "./ProductCommentList.styles";

interface IProductCommentProps {
  useditemId: string;
}

const ProductCommentListUI = (props: IProductCommentProps) => {
  const { data: dataQ } = useQuery<
    Pick<IQuery, "fetchUseditemQuestions">,
    IQueryFetchUseditemQuestionsArgs
  >(FETCH_USED_ITEM_QUESTIONS, {
    variables: { useditemId: props.useditemId },
  });

  const [deleteUseditemQuestion] = useMutation<
    Pick<IMutation, "deleteUseditemQuestion">,
    IMutationDeleteUseditemQuestionArgs
  >(DELETE_USED_ITEM_QUESTION);

  const onClickDeleteQuestion = (id: string) => async () => {
    try {
      await deleteUseditemQuestion({
        variables: { useditemQuestionId: id },
        refetchQueries: [
          {
            query: FETCH_USED_ITEM_QUESTIONS,
            variables: { useditemId: props.useditemId },
          },
        ],
      });
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    }
  };

  return (
    <ProductCommentListWrapper>
      <div>
        <span>상품 문의 목록</span>
      </div>
      <ul>
        {dataQ?.fetchUseditemQuestions?.map((commentQ) => (
          <CommentQuestion
            data={commentQ}
            onClickDeleteQuestion={onClickDeleteQuestion}
            key={commentQ._id}
          />
        ))}
      </ul>
    </ProductCommentListWrapper>
  );
};

export default ProductCommentListUI;
