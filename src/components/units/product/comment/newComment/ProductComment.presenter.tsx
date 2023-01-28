import {
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";
import { IUseditemQuestion } from "../../../../../commons/types/generated/types";
import Button from "../../../../common/button";
import {
  Form,
  NewCommentWrapper,
  TextArea,
  Title,
} from "./ProductComment.styles";

interface IProductNewCommentUIProps {
  onSubmit: SubmitHandler<IUseditemQuestion>;
  register: UseFormRegister<IUseditemQuestion>;
  handleSubmit: UseFormHandleSubmit<IUseditemQuestion>;
}

const ProductNewCommentUI = (props: IProductNewCommentUIProps) => {
  return (
    <NewCommentWrapper>
      <Title>질문하기</Title>
      <Form onSubmit={props.handleSubmit(props.onSubmit)}>
        <TextArea
          placeholder="문의할 내용을 적어주세요."
          {...props.register("contents")}
        />
        <Button>질문하기</Button>
      </Form>
    </NewCommentWrapper>
  );
};

export default ProductNewCommentUI;
