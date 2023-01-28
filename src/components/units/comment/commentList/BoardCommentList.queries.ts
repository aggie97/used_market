import { gql } from "@apollo/client";

export const FETCH_BOARD_COMMENTS = gql`
  query ($page: Int, $boardId: ID!) {
    fetchBoardComments(page: $page, boardId: $boardId) {
      _id
      writer
      contents
      rating
      user {
        _id
        email
        name
      }
      createdAt
      updatedAt
      deletedAt
    }
  }
`;

export const UPDATE_BOARD_COMMENT = gql`
  mutation updateBoardComment(
    $password: String
    $updateBoardCommentInput: UpdateBoardCommentInput!
    $boardCommentId: ID!
  ) {
    updateBoardComment(
      password: $password
      updateBoardCommentInput: $updateBoardCommentInput
      boardCommentId: $boardCommentId
    ) {
      _id
      writer
      contents
      rating
      user {
        _id
        email
        name
      }
      createdAt
      updatedAt
      deletedAt
    }
  }
`;

export const DELETE_BOARD_COMMENT = gql`
  mutation deleteBoardComment($password: String, $boardCommentId: ID!) {
    deleteBoardComment(password: $password, boardCommentId: $boardCommentId)
  }
`;
