import styled from "@emotion/styled";

export const CreateCommentWrapper = styled.div`
  padding-top: 3em;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
`;
export const CreateCommentTitle = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 1em;
  padding-bottom: 3em;
`;

export const CreateCommentUserInfoBox = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5em;
  padding-bottom: 1.25em;
`;

export const CreateCommentWriter = styled.input`
  padding: 0.875em 1.125em;
  border: 1px solid #bdbdbd;
`;

export const CreateCommentPw = styled.input`
  padding: 0.875em 1.125em;
  border: 1px solid #bdbdbd;
`;

export const CreateCommentTitleImg = styled.img``;
export const CreateCommentTitleText = styled.span`
  font-size: 1.2em;
  font-weight: 500;
`;
export const CreateCommentStarBox = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 5px;
  padding-bottom: 1.2em;
`;

export const Star = styled.svg`
  cursor: pointer;
`;

export const StarPath = styled.path`
  &:hover {
    fill: #ffd600;
  }
`;

export const CreateCommentInputField = styled.div`
  border: 1px solid #bdbdbd;
`;
export const CreateCommentTextarea = styled.textarea`
  width: 100%;
  padding: 1.2em;
  resize: none;
  height: 6.5em;
  border: none;
  outline: none;
  letter-spacing: 1px;
  &:focus {
    background: #eeeeff;
  }
`;
export const CreateCommentFooter = styled.div`
  display: flex;
  justify-content: space-between;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
`;
export const CreateCommentTextCounter = styled.span`
  padding: 0.75em 1em;
  color: #bdbdbd;
`;

export const CreateCommentButtonBox = styled.div`
  display: flex;
`;

export const CreateCommentSubmitButton = styled.button`
  padding: 0.75em 1em;
  background: black;
  color: white;
  border: 1px solid black;
  cursor: pointer;
  transition: all ease-in-out 0.2s;
  &:hover {
    background: #ffd600;
    color: black;
  }
`;
export const CommentListUl = styled.ul`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  list-style: none;
  padding: 0;
`;
export const CommentListLi = styled.li`
  padding-top: 1.5em;
  display: flex;
  justify-content: space-between;
`;

export const CommentListProfileImg = styled.img`
  margin: 6px 0 0 4px;
`;
export const CommentListMainContentBox = styled.div`
  flex: 1;
  padding-left: 1em;
`;

export const CommentListMainContentHeader = styled.div`
  display: flex;
  gap: 1em;
`;

export const CommentListWriter = styled.span`
  font-weight: 500;
`;

export const CommentListMainContentBody = styled.p`
  margin: 0;
`;

export const CommentListCreatedAt = styled.span`
  font-size: 0.875em;
  padding: 1.5em 0 1em 0;
  color: #bdbdbd;
  display: block;
`;

export const CommentListButtonBox = styled.div`
  display: flex;
  gap: 1em;
`;
export const CommentListEditButton = styled.img`
  cursor: pointer;
`;
export const CommentListDeleteButton = styled.img`
  cursor: pointer;
`;

export const DivideLine = styled.hr`
  margin: 0;
  margin-top: 1em;
  color: #bdbdbd;
`;

export const EditCommentReturnButton = styled.button`
  padding: 0.75em 1em;

  color: black;
  border: 1px solid black;
  cursor: pointer;
  transition: all ease-in-out 0.2s;
  &:hover {
    background: red;
    color: white;
  }
`;

export const DeleteModalInput = styled.input`
  border: none;
  border-bottom: 1px solid #000;
  padding: 0.5em;
  outline: none;
`;
