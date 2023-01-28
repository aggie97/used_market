import styled from "@emotion/styled";

export const CommentBox = styled.div`
  width: 100%;
  border: 1px solid red;
`;

export const CommentForm = styled.form`
  width: 100%;
  height: 100%;
`;

export const CommentUser = styled.div`
  padding-left: 1em;
  display: flex;
  align-items: center;
`;

export const UserPicture = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 1px solid #ddd;
  overflow: hidden;
  background-image: url(${(props: { imgUrl: string }) => props.imgUrl});
`;

export const UserName = styled.span`
  padding-left: 1em;
`;

export const CommentInput = styled.textarea`
  width: 100%;
  min-height: 100px;
  padding: 1em;
  resize: none;
  outline: none;
  border: 1px solid #ddd;
`;

export const ButtonBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const Button = styled.button``;

export const CommentCreatedAt = styled.span`
  padding-left: 1em;
`;
