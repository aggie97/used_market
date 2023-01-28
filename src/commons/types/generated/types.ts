export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  Upload: any;
}

export interface IBoard {
  __typename?: "Board";
  _id: Scalars["ID"];
  boardAddress?: Maybe<IBoardAddress>;
  contents: Scalars["String"];
  createdAt: Scalars["DateTime"];
  deletedAt?: Maybe<Scalars["DateTime"]>;
  dislikeCount: Scalars["Int"];
  images?: Maybe<Array<Scalars["String"]>>;
  likeCount: Scalars["Int"];
  title: Scalars["String"];
  updatedAt: Scalars["DateTime"];
  user?: Maybe<IUser>;
  writer?: Maybe<Scalars["String"]>;
  youtubeUrl?: Maybe<Scalars["String"]>;
}

export interface IBoardAddress {
  __typename?: "BoardAddress";
  _id: Scalars["ID"];
  address?: Maybe<Scalars["String"]>;
  addressDetail?: Maybe<Scalars["String"]>;
  createdAt: Scalars["DateTime"];
  deletedAt?: Maybe<Scalars["DateTime"]>;
  updatedAt: Scalars["DateTime"];
  zipcode?: Maybe<Scalars["String"]>;
}

export interface IBoardAddressInput {
  address?: InputMaybe<Scalars["String"]>;
  addressDetail?: InputMaybe<Scalars["String"]>;
  zipcode?: InputMaybe<Scalars["String"]>;
}

export interface IBoardComment {
  __typename?: "BoardComment";
  _id: Scalars["ID"];
  contents: Scalars["String"];
  createdAt: Scalars["DateTime"];
  deletedAt?: Maybe<Scalars["DateTime"]>;
  rating: Scalars["Float"];
  updatedAt: Scalars["DateTime"];
  user?: Maybe<IUser>;
  writer?: Maybe<Scalars["String"]>;
}

export interface ICreateBoardCommentInput {
  contents: Scalars["String"];
  password?: InputMaybe<Scalars["String"]>;
  rating: Scalars["Float"];
  writer?: InputMaybe<Scalars["String"]>;
}

export interface ICreateBoardInput {
  boardAddress?: InputMaybe<IBoardAddressInput>;
  contents: Scalars["String"];
  images?: InputMaybe<Array<Scalars["String"]>>;
  password?: InputMaybe<Scalars["String"]>;
  title: Scalars["String"];
  writer?: InputMaybe<Scalars["String"]>;
  youtubeUrl?: InputMaybe<Scalars["String"]>;
}

export interface ICreateUseditemInput {
  contents: Scalars["String"];
  images?: InputMaybe<Array<Scalars["String"]>>;
  name: Scalars["String"];
  price: Scalars["Int"];
  remarks: Scalars["String"];
  tags?: InputMaybe<Array<Scalars["String"]>>;
  useditemAddress?: InputMaybe<IUseditemAddressInput>;
}

export interface ICreateUseditemQuestionAnswerInput {
  contents: Scalars["String"];
}

export interface ICreateUseditemQuestionInput {
  contents: Scalars["String"];
}

export interface ICreateUserInput {
  email: Scalars["String"];
  name: Scalars["String"];
  password: Scalars["String"];
}

export interface IFileManager {
  __typename?: "FileManager";
  _id: Scalars["ID"];
  createdAt: Scalars["DateTime"];
  deletedAt?: Maybe<Scalars["DateTime"]>;
  isUsed: Scalars["Boolean"];
  size?: Maybe<Scalars["Float"]>;
  updatedAt: Scalars["DateTime"];
  url: Scalars["String"];
}

export interface IMutation {
  __typename?: "Mutation";
  createBoard: IBoard;
  createBoardComment: IBoardComment;
  createPointTransactionOfBuyingAndSelling: IUseditem;
  createPointTransactionOfLoading: IPointTransaction;
  createUseditem: IUseditem;
  createUseditemQuestion: IUseditemQuestion;
  createUseditemQuestionAnswer: IUseditemQuestionAnswer;
  createUser: IUser;
  deleteBoard: Scalars["ID"];
  deleteBoardComment: Scalars["ID"];
  deleteBoards: Array<Scalars["ID"]>;
  deleteUseditem: Scalars["ID"];
  deleteUseditemQuestion: Scalars["ID"];
  deleteUseditemQuestionAnswer: Scalars["String"];
  dislikeBoard: Scalars["Int"];
  likeBoard: Scalars["Int"];
  loginUser: IToken;
  loginUserExample: IToken;
  logoutUser: Scalars["Boolean"];
  resetUserPassword: Scalars["Boolean"];
  restoreAccessToken: IToken;
  toggleUseditemPick: Scalars["Int"];
  updateBoard: IBoard;
  updateBoardComment: IBoardComment;
  updateUseditem: IUseditem;
  updateUseditemQuestion: IUseditemQuestion;
  updateUseditemQuestionAnswer: IUseditemQuestionAnswer;
  updateUser: IUser;
  uploadFile: IFileManager;
}

export interface IMutationCreateBoardArgs {
  createBoardInput: ICreateBoardInput;
}

export interface IMutationCreateBoardCommentArgs {
  boardId: Scalars["ID"];
  createBoardCommentInput: ICreateBoardCommentInput;
}

export interface IMutationCreatePointTransactionOfBuyingAndSellingArgs {
  useritemId: Scalars["ID"];
}

export interface IMutationCreatePointTransactionOfLoadingArgs {
  impUid: Scalars["ID"];
}

export interface IMutationCreateUseditemArgs {
  createUseditemInput: ICreateUseditemInput;
}

export interface IMutationCreateUseditemQuestionArgs {
  createUseditemQuestionInput: ICreateUseditemQuestionInput;
  useditemId: Scalars["ID"];
}

export interface IMutationCreateUseditemQuestionAnswerArgs {
  createUseditemQuestionAnswerInput: ICreateUseditemQuestionAnswerInput;
  useditemQuestionId: Scalars["ID"];
}

export interface IMutationCreateUserArgs {
  createUserInput: ICreateUserInput;
}

export interface IMutationDeleteBoardArgs {
  boardId: Scalars["ID"];
}

export interface IMutationDeleteBoardCommentArgs {
  boardCommentId: Scalars["ID"];
  password?: InputMaybe<Scalars["String"]>;
}

export interface IMutationDeleteBoardsArgs {
  boardIds: Array<Scalars["ID"]>;
}

export interface IMutationDeleteUseditemArgs {
  useditemId: Scalars["ID"];
}

export interface IMutationDeleteUseditemQuestionArgs {
  useditemQuestionId: Scalars["ID"];
}

export interface IMutationDeleteUseditemQuestionAnswerArgs {
  useditemQuestionAnswerId: Scalars["ID"];
}

export interface IMutationDislikeBoardArgs {
  boardId: Scalars["ID"];
}

export interface IMutationLikeBoardArgs {
  boardId: Scalars["ID"];
}

export interface IMutationLoginUserArgs {
  email: Scalars["String"];
  password: Scalars["String"];
}

export interface IMutationLoginUserExampleArgs {
  email: Scalars["String"];
  password: Scalars["String"];
}

export interface IMutationResetUserPasswordArgs {
  password: Scalars["String"];
}

export interface IMutationToggleUseditemPickArgs {
  useditemId: Scalars["ID"];
}

export interface IMutationUpdateBoardArgs {
  boardId: Scalars["ID"];
  password?: InputMaybe<Scalars["String"]>;
  updateBoardInput: IUpdateBoardInput;
}

export interface IMutationUpdateBoardCommentArgs {
  boardCommentId: Scalars["ID"];
  password?: InputMaybe<Scalars["String"]>;
  updateBoardCommentInput: IUpdateBoardCommentInput;
}

export interface IMutationUpdateUseditemArgs {
  updateUseditemInput: IUpdateUseditemInput;
  useditemId: Scalars["ID"];
}

export interface IMutationUpdateUseditemQuestionArgs {
  updateUseditemQuestionInput: IUpdateUseditemQuestionInput;
  useditemQuestionId: Scalars["ID"];
}

export interface IMutationUpdateUseditemQuestionAnswerArgs {
  updateUseditemQuestionAnswerInput: IUpdateUseditemQuestionAnswerInput;
  useditemQuestionAnswerId: Scalars["ID"];
}

export interface IMutationUpdateUserArgs {
  updateUserInput: IUpdateUserInput;
}

export interface IMutationUploadFileArgs {
  file: Scalars["Upload"];
}

export interface IPointTransaction {
  __typename?: "PointTransaction";
  _id: Scalars["ID"];
  amount: Scalars["Int"];
  balance: Scalars["Int"];
  createdAt: Scalars["DateTime"];
  deletedAt?: Maybe<Scalars["DateTime"]>;
  impUid?: Maybe<Scalars["ID"]>;
  status: Scalars["String"];
  statusDetail: Scalars["String"];
  updatedAt: Scalars["DateTime"];
  useditem?: Maybe<IUseditem>;
  user?: Maybe<IUser>;
}

export interface IQuery {
  __typename?: "Query";
  fetchBoard: IBoard;
  fetchBoardComments: Array<IBoardComment>;
  fetchBoards: Array<IBoard>;
  fetchBoardsCount: Scalars["Int"];
  fetchBoardsCountOfMine: Scalars["Int"];
  fetchBoardsOfMine: Array<IBoard>;
  fetchBoardsOfTheBest: Array<IBoard>;
  fetchPointTransactions: Array<IPointTransaction>;
  fetchPointTransactionsCountOfBuying: Scalars["Int"];
  fetchPointTransactionsCountOfLoading: Scalars["Int"];
  fetchPointTransactionsCountOfSelling: Scalars["Int"];
  fetchPointTransactionsOfBuying: Array<IPointTransaction>;
  fetchPointTransactionsOfLoading: Array<IPointTransaction>;
  fetchPointTransactionsOfSelling: Array<IPointTransaction>;
  fetchUseditem: IUseditem;
  fetchUseditemQuestionAnswers: Array<IUseditemQuestionAnswer>;
  fetchUseditemQuestions: Array<IUseditemQuestion>;
  fetchUseditems: Array<IUseditem>;
  fetchUseditemsCountIBought: Scalars["Int"];
  fetchUseditemsCountIPicked: Scalars["Int"];
  fetchUseditemsCountISold: Scalars["Int"];
  fetchUseditemsIBought: Array<IUseditem>;
  fetchUseditemsIPicked: Array<IUseditem>;
  fetchUseditemsISold: Array<IUseditem>;
  fetchUseditemsOfTheBest: Array<IUseditem>;
  fetchUserLoggedIn: IUser;
}

export interface IQueryFetchBoardArgs {
  boardId: Scalars["ID"];
}

export interface IQueryFetchBoardCommentsArgs {
  boardId: Scalars["ID"];
  page?: InputMaybe<Scalars["Int"]>;
}

export interface IQueryFetchBoardsArgs {
  endDate?: InputMaybe<Scalars["DateTime"]>;
  page?: InputMaybe<Scalars["Int"]>;
  search?: InputMaybe<Scalars["String"]>;
  startDate?: InputMaybe<Scalars["DateTime"]>;
}

export interface IQueryFetchBoardsCountArgs {
  endDate?: InputMaybe<Scalars["DateTime"]>;
  search?: InputMaybe<Scalars["String"]>;
  startDate?: InputMaybe<Scalars["DateTime"]>;
}

export interface IQueryFetchPointTransactionsArgs {
  page?: InputMaybe<Scalars["Int"]>;
  search?: InputMaybe<Scalars["String"]>;
}

export interface IQueryFetchPointTransactionsOfBuyingArgs {
  page?: InputMaybe<Scalars["Int"]>;
  search?: InputMaybe<Scalars["String"]>;
}

export interface IQueryFetchPointTransactionsOfLoadingArgs {
  page?: InputMaybe<Scalars["Int"]>;
  search?: InputMaybe<Scalars["String"]>;
}

export interface IQueryFetchPointTransactionsOfSellingArgs {
  page?: InputMaybe<Scalars["Int"]>;
  search?: InputMaybe<Scalars["String"]>;
}

export interface IQueryFetchUseditemArgs {
  useditemId: Scalars["ID"];
}

export interface IQueryFetchUseditemQuestionAnswersArgs {
  page?: InputMaybe<Scalars["Int"]>;
  useditemQuestionId: Scalars["ID"];
}

export interface IQueryFetchUseditemQuestionsArgs {
  page?: InputMaybe<Scalars["Int"]>;
  useditemId: Scalars["ID"];
}

export interface IQueryFetchUseditemsArgs {
  isSoldout?: InputMaybe<Scalars["Boolean"]>;
  page?: InputMaybe<Scalars["Int"]>;
  search?: InputMaybe<Scalars["String"]>;
}

export interface IQueryFetchUseditemsIBoughtArgs {
  page?: InputMaybe<Scalars["Int"]>;
  search?: InputMaybe<Scalars["String"]>;
}

export interface IQueryFetchUseditemsIPickedArgs {
  page?: InputMaybe<Scalars["Int"]>;
  search?: InputMaybe<Scalars["String"]>;
}

export interface IQueryFetchUseditemsISoldArgs {
  page?: InputMaybe<Scalars["Int"]>;
  search?: InputMaybe<Scalars["String"]>;
}

export interface IToken {
  __typename?: "Token";
  accessToken: Scalars["String"];
}

export interface IUpdateBoardCommentInput {
  contents?: InputMaybe<Scalars["String"]>;
  rating?: InputMaybe<Scalars["Float"]>;
}

export interface IUpdateBoardInput {
  boardAddress?: InputMaybe<IBoardAddressInput>;
  contents?: InputMaybe<Scalars["String"]>;
  images?: InputMaybe<Array<Scalars["String"]>>;
  title?: InputMaybe<Scalars["String"]>;
  youtubeUrl?: InputMaybe<Scalars["String"]>;
}

export interface IUpdateUseditemInput {
  contents?: InputMaybe<Scalars["String"]>;
  images?: InputMaybe<Array<Scalars["String"]>>;
  name?: InputMaybe<Scalars["String"]>;
  price?: InputMaybe<Scalars["Int"]>;
  remarks?: InputMaybe<Scalars["String"]>;
  tags?: InputMaybe<Array<Scalars["String"]>>;
  useditemAddress?: InputMaybe<IUseditemAddressInput>;
}

export interface IUpdateUseditemQuestionAnswerInput {
  contents: Scalars["String"];
}

export interface IUpdateUseditemQuestionInput {
  contents: Scalars["String"];
}

export interface IUpdateUserInput {
  name?: InputMaybe<Scalars["String"]>;
  picture?: InputMaybe<Scalars["String"]>;
}

export interface IUseditem {
  __typename?: "Useditem";
  _id: Scalars["ID"];
  buyer?: Maybe<IUser>;
  contents: Scalars["String"];
  createdAt: Scalars["DateTime"];
  deletedAt?: Maybe<Scalars["DateTime"]>;
  images?: Maybe<Array<Scalars["String"]>>;
  name: Scalars["String"];
  pickedCount?: Maybe<Scalars["Int"]>;
  price?: Maybe<Scalars["Int"]>;
  remarks: Scalars["String"];
  seller?: Maybe<IUser>;
  soldAt?: Maybe<Scalars["DateTime"]>;
  tags?: Maybe<Array<Scalars["String"]>>;
  updatedAt: Scalars["DateTime"];
  useditemAddress?: Maybe<IUseditemAddress>;
}

export interface IUseditemAddress {
  __typename?: "UseditemAddress";
  _id: Scalars["ID"];
  address?: Maybe<Scalars["String"]>;
  addressDetail?: Maybe<Scalars["String"]>;
  createdAt: Scalars["DateTime"];
  deletedAt?: Maybe<Scalars["DateTime"]>;
  lat?: Maybe<Scalars["Float"]>;
  lng?: Maybe<Scalars["Float"]>;
  updatedAt: Scalars["DateTime"];
  zipcode?: Maybe<Scalars["String"]>;
}

export interface IUseditemAddressInput {
  address?: InputMaybe<Scalars["String"]>;
  addressDetail?: InputMaybe<Scalars["String"]>;
  lat?: InputMaybe<Scalars["Float"]>;
  lng?: InputMaybe<Scalars["Float"]>;
  zipcode?: InputMaybe<Scalars["String"]>;
}

export interface IUseditemQuestion {
  __typename?: "UseditemQuestion";
  _id: Scalars["ID"];
  contents: Scalars["String"];
  createdAt: Scalars["DateTime"];
  deletedAt?: Maybe<Scalars["DateTime"]>;
  updatedAt: Scalars["DateTime"];
  useditem: IUseditem;
  user: IUser;
}

export interface IUseditemQuestionAnswer {
  __typename?: "UseditemQuestionAnswer";
  _id: Scalars["ID"];
  contents: Scalars["String"];
  createdAt: Scalars["DateTime"];
  deletedAt?: Maybe<Scalars["DateTime"]>;
  updatedAt: Scalars["DateTime"];
  useditemQuestion: IUseditemQuestion;
  user: IUser;
}

export interface IUser {
  __typename?: "User";
  _id: Scalars["ID"];
  createdAt: Scalars["DateTime"];
  deletedAt?: Maybe<Scalars["DateTime"]>;
  email: Scalars["String"];
  name: Scalars["String"];
  picture?: Maybe<Scalars["String"]>;
  updatedAt: Scalars["DateTime"];
  userPoint?: Maybe<IUserPoint>;
}

export interface IUserPoint {
  __typename?: "UserPoint";
  _id: Scalars["ID"];
  amount: Scalars["Int"];
  createdAt: Scalars["DateTime"];
  deletedAt?: Maybe<Scalars["DateTime"]>;
  updatedAt: Scalars["DateTime"];
  user: IUser;
}
