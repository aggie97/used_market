import {
  CreateCommentStarBox,
  Star,
  StarPath,
  CreateCommentTitle,
  CreateCommentTitleImg,
  CreateCommentTitleText,
  CreateCommentWrapper,
  CreateCommentInputField,
  CreateCommentTextarea,
  CreateCommentFooter,
  CreateCommentTextCounter,
  CreateCommentSubmitButton,
  CreateCommentWriter,
  CreateCommentPw,
  CreateCommentUserInfoBox,
} from "./BoardCommentCreate.styles";
import { IBoardCommentUI } from "./BoardCommentCreate.types";

const BoardCommentCreateUI = ({
  comment,
  textCount,
  onSubmitComment,
  onChangeComment,
}: IBoardCommentUI) => {
  return (
    <>
      <CreateCommentWrapper id="CreateCommentWrapper">
        <CreateCommentTitle>
          <CreateCommentTitleImg
            width="20px"
            height="20px"
            src="/commentIcon.png"
          />
          <CreateCommentTitleText>댓글</CreateCommentTitleText>
        </CreateCommentTitle>
        <CreateCommentUserInfoBox>
          <CreateCommentWriter
            id="writer"
            onChange={onChangeComment}
            type="text"
            placeholder="작성자"
            value={comment.writer}
          />
          <CreateCommentPw
            id="password"
            onChange={onChangeComment}
            type="password"
            placeholder="비밀번호"
            value={comment.password}
          />
          <CreateCommentStarBox style={{ padding: "0" }}>
            {new Array(5).fill(1).map((_, index) => (
              <Star
                key={index}
                width="20"
                height="19"
                viewBox="0 0 20 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <StarPath
                  d="M10 0L12.2451 6.90983H19.5106L13.6327 11.1803L15.8779 18.0902L10 13.8197L4.12215 18.0902L6.36729 11.1803L0.489435 6.90983H7.75486L10 0Z"
                  fill="#bdbdbd"
                />
              </Star>
            ))}
          </CreateCommentStarBox>
        </CreateCommentUserInfoBox>
        <CreateCommentInputField>
          <CreateCommentTextarea
            onChange={onChangeComment}
            maxLength={100}
            placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제할 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
            value={comment.contents}
            id="contents"
          ></CreateCommentTextarea>
          <CreateCommentFooter id="textCounter_SubmitButton_Box">
            <CreateCommentTextCounter>{textCount}/100</CreateCommentTextCounter>
            <CreateCommentSubmitButton onClick={onSubmitComment}>
              등록하기
            </CreateCommentSubmitButton>
          </CreateCommentFooter>
        </CreateCommentInputField>
      </CreateCommentWrapper>
    </>
  );
};

export default BoardCommentCreateUI;
