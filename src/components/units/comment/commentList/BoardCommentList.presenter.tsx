import { Modal } from "antd";
import InfiniteScroll from "react-infinite-scroller";
import { IBoardCommentListUI } from "../newComment/BoardCommentCreate.types";

import {
  CreateCommentStarBox,
  Star,
  StarPath,
  CreateCommentInputField,
  CreateCommentTextarea,
  CreateCommentFooter,
  CreateCommentTextCounter,
  CreateCommentSubmitButton,
  CommentListUl,
  CommentListLi,
  CommentListProfileImg,
  CommentListMainContentBox,
  CommentListButtonBox,
  CommentListMainContentHeader,
  CommentListCreatedAt,
  CommentListWriter,
  CommentListEditButton,
  CommentListMainContentBody,
  CommentListDeleteButton,
  DivideLine,
  CreateCommentWriter,
  CreateCommentPw,
  CreateCommentUserInfoBox,
  EditCommentReturnButton,
  DeleteModalInput,
  CreateCommentButtonBox,
} from "./BoardCommentList.styles";

const BoardCommentListUI = ({
  data,
  textCount,
  isOpen,
  isOpenDeleteModal,
  onToggleDeleteModal,
  onChangeDeletePw,
  idForEdit,
  onUnfoldEditModal,
  onUpdateComment,
  onDeleteComment,
  onChangeEditComment,
  onClickComment,
  onLoadMore,
}: IBoardCommentListUI) => {
  return (
    <>
      <CommentListUl id="submittedComments">
        <InfiniteScroll hasMore={true} pageStart={1} loadMore={onLoadMore}>
          {data?.fetchBoardComments.map((comment) => {
            return (
              <>
                {isOpen && idForEdit === comment._id ? (
                  <CommentListLi key={comment._id}>
                    <CommentListMainContentBox style={{ padding: "0" }}>
                      <CreateCommentUserInfoBox>
                        <CreateCommentWriter
                          defaultValue={String(comment.writer)}
                          disabled
                        />
                        <CreateCommentPw
                          type="password"
                          onChange={onChangeEditComment}
                          placeholder="비밀번호를 입력해주세요."
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
                          onChange={onChangeEditComment}
                          defaultValue={comment.contents}
                        ></CreateCommentTextarea>
                        <CreateCommentFooter>
                          <CreateCommentTextCounter>
                            {textCount}/100
                          </CreateCommentTextCounter>
                          <CreateCommentButtonBox>
                            <CreateCommentSubmitButton
                              id={comment._id}
                              onClick={onUpdateComment}
                            >
                              수정하기
                            </CreateCommentSubmitButton>
                            <EditCommentReturnButton
                              onClick={onUnfoldEditModal}
                              style={{ backgroundColor: "red" }}
                            >
                              돌아가기
                            </EditCommentReturnButton>
                          </CreateCommentButtonBox>
                        </CreateCommentFooter>
                      </CreateCommentInputField>
                    </CommentListMainContentBox>
                  </CommentListLi>
                ) : (
                  <>
                    <CommentListLi
                      id={comment._id}
                      onClick={onClickComment}
                      key={comment._id}
                    >
                      <CommentListProfileImg
                        width={40}
                        height={40}
                        id="profile_img"
                        src="/profileImgComment.png"
                      />
                      <CommentListMainContentBox>
                        <CommentListMainContentHeader>
                          <CommentListWriter>
                            {comment.writer}
                          </CommentListWriter>
                          <CreateCommentStarBox>
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
                        </CommentListMainContentHeader>
                        <CommentListMainContentBody>
                          {comment.contents}
                        </CommentListMainContentBody>
                        <CommentListCreatedAt>
                          {comment.createdAt.slice(0, 16).split("-").join(".")}
                        </CommentListCreatedAt>
                      </CommentListMainContentBox>
                      <CommentListButtonBox>
                        <CommentListEditButton
                          id={comment._id}
                          className={String(comment.contents.length)}
                          onClick={onUnfoldEditModal}
                          width="18px"
                          height="18px"
                          src="/edit.png"
                        />
                        <CommentListDeleteButton
                          id={comment._id}
                          onClick={onToggleDeleteModal}
                          width="14px"
                          height="14px"
                          src="/delete.png"
                        />
                        {isOpenDeleteModal && (
                          <Modal
                            title="Password"
                            open={true}
                            onOk={onDeleteComment}
                            onCancel={onToggleDeleteModal}
                          >
                            <DeleteModalInput
                              type="password"
                              placeholder="비밀번호를 입력해주세요."
                              onChange={onChangeDeletePw}
                            />
                          </Modal>
                        )}
                      </CommentListButtonBox>
                    </CommentListLi>
                    <DivideLine key={`${comment._id}divLine`} />
                  </>
                )}
              </>
            );
          })}
        </InfiniteScroll>
      </CommentListUl>
    </>
  );
};

export default BoardCommentListUI;
