export const CommentAnswers = null;
// import { useMutation, useQuery } from "@apollo/client";
// import { Modal } from "antd";
// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import {
//   IMutation,
//   IMutationDeleteUseditemQuestionAnswerArgs,
//   IMutationUpdateUseditemQuestionAnswerArgs,
//   IQuery,
//   IQueryFetchUseditemQuestionAnswersArgs,
// } from "../../commons/types/generated/types";
// import {
//   ButtonBox,
//   CommentBox,
//   CommentCreatedAt,
//   CommentForm,
//   CommentInput,
//   CommentUser,
//   UserName,
//   UserPicture,
// } from "../common/newComment/styles";
// import {
//   DELETE_USED_ITEM_QUESTION_ANSWER,
//   FETCH_USED_ITEM_QUESTION_ANSWERS,
//   UPDATE_USED_ITEM_QUESTION_ANSWER,
// } from "../units/product/comment/commentList/ProductCommentList.queries";

// const CommentAnswers = (props) => {
//   const { data } = useQuery<
//     Pick<IQuery, "fetchUseditemQuestionAnswers">,
//     IQueryFetchUseditemQuestionAnswersArgs
//   >(FETCH_USED_ITEM_QUESTION_ANSWERS, {
//     variables: {
//       useditemQuestionId: String(props.comment?._id),
//       page: 1,
//     },
//   });

//   const { register, handleSubmit } = useForm();
//   const [isEdit, setIsEdit] = useState(false);

//   const [updatedUseditemQuestionAnswer] = useMutation<
//     Pick<IMutation, "updateUseditemQuestionAnswer">,
//     IMutationUpdateUseditemQuestionAnswerArgs
//   >(UPDATE_USED_ITEM_QUESTION_ANSWER);

//   const [deleteUseditemQuestionAnswer] = useMutation<
//     Pick<IMutation, "deleteUseditemQuestionAnswer">,
//     IMutationDeleteUseditemQuestionAnswerArgs
//   >(DELETE_USED_ITEM_QUESTION_ANSWER);

//   const onEdit = async (formData) => {
//     console.log(formData);
//     try {
//       await updatedUseditemQuestionAnswer({
//         variables: {
//           updateUseditemQuestionAnswerInput: formData,
//           useditemQuestionAnswerId: String(clickId),
//         },
//       });
//     } catch (error) {
//       error instanceof Error && Modal.error({ content: error.message });
//     }
//   };

//   const onDelete = async (event) => {
//     try {
//       await deleteUseditemQuestionAnswer({
//         variables: { useditemQuestionAnswerId: event.currentTarget.id },
//         update(cache, { data }) {
//           cache.modify({
//             fields: {
//               fetchUseditemQuestionAnswers: (prev, { readField }) => {
//                 const deleteId = data?.deleteUseditemQuestionAnswer;
//                 const filteredPrev = prev.filter(
//                   (el) => readField("_id", el) !== deleteId
//                 );
//                 return [...filteredPrev];
//               },
//             },
//           });
//         },
//       });

//       Modal.success({ content: "문의 답글이 삭제되었습니다." });
//     } catch (error) {
//       error instanceof Error && Modal.error({ content: error.message });
//     }
//   };

//   const [clickId, setClickId] = useState("");

//   const onClickEdit = (event) => {
//     setIsEdit((prev) => !prev);
//     setClickId(event.currentTarget.id);
//   };

//   return (
//     <>
//       {data?.fetchUseditemQuestionAnswers.map((answer) => (
//         <div key={answer._id} style={{ display: "flex", alignItems: "center" }}>
//           <div style={{ width: "50px", textAlign: "center" }}>A</div>
//           <CommentBox>
//             <CommentUser>
//               <UserPicture imgUrl={answer.user.picture ?? ""} />
//               <UserName>{answer.user.name}</UserName>
//             </CommentUser>
//             <CommentForm>
//               {console.log(clickId === answer._id)}
//               <CommentInput
//                 disabled={!(isEdit && clickId === answer._id)}
//                 {...register("contents")}
//                 defaultValue={answer.contents}
//               ></CommentInput>
//               <ButtonBox>
//                 <CommentCreatedAt>
//                   {answer.createdAt.slice(0, 10)}
//                 </CommentCreatedAt>
//                 <div>
//                   {isEdit && clickId === answer._id && (
//                     <button type="submit" onClick={handleSubmit(onEdit)}>
//                       수정하기
//                     </button>
//                   )}
//                   <button type="button" id={answer._id} onClick={onClickEdit}>
//                     {isEdit && clickId === answer._id ? "돌아가기" : "수정하기"}
//                   </button>
//                   <button type="button" id={answer._id} onClick={onDelete}>
//                     삭제하기
//                   </button>
//                 </div>
//               </ButtonBox>
//             </CommentForm>
//           </CommentBox>
//         </div>
//       ))}
//     </>
//   );
// };

// export default CommentAnswers;
