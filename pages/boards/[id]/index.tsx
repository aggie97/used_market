import { useRouter } from "next/router";
import BoardCreateComment from "../../../src/components/units/comment/newComment/BoardCommentCreate.container";
import CommentList from "../../../src/components/units/comment/commentList/BoardCommentList.container";
import BoardDetail from "../../../src/components/units/board/detail/BoardDetail.container";

const DynamicRoutedPage = () => {
  const router = useRouter();

  return (
    <>
      <BoardDetail />
      <hr style={{ maxWidth: "1240px", width: "100%", margin: "0 auto" }} />
      {/* <BoardComments routerId={String(router.query.id)} /> */}
      <BoardCreateComment routerId={String(router.query.id)} />
      <CommentList routerId={String(router.query.id)} />
    </>
  );
};

export default DynamicRoutedPage;
