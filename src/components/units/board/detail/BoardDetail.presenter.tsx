import { IQuery } from "../../../../commons/types/generated/types";
import * as B from "./BoardDetail.styles";
interface IBoardDetailProps {
  data?: Pick<IQuery, "fetchBoard">;
  dance: boolean;
  loading: boolean;
  addressBox: boolean;
  onClickAddressLink: () => void;
  onClickEdit: () => void;
  onClickToList: () => void;
  onClickDelete: () => void;
  onClickLike: () => void;
  onClickDislike: () => void;
}

const BoardDetailUI = ({
  data,
  dance,
  addressBox,
  loading,
  onClickAddressLink,
  onClickEdit,
  onClickToList,
  onClickDelete,
  onClickLike,
  onClickDislike,
}: IBoardDetailProps) => {
  return (
    <>
      <B.DetailPageWrapper>
        <>
          {loading ? (
            <div>
              페이지를 불러오는 중 입니다.
              <br /> 잠시만 기다려주세요.
            </div>
          ) : (
            <>
              <B.Header id="header">
                <B.HeaderLeftBox id="header__left">
                  <B.ImgBox id="img__box">
                    <B.ProfileImg id="profile__img" src="/profile.png" />
                  </B.ImgBox>
                  <B.WriterAndCreatedDateBox id="writer__createdAt">
                    <B.Writer id="writer">{data?.fetchBoard?.writer}</B.Writer>
                    <B.CreatedDate id="createdAt">
                      {data?.fetchBoard?.createdAt
                        .split("T")
                        .join(" ")
                        .slice(0, 16)}
                    </B.CreatedDate>
                  </B.WriterAndCreatedDateBox>
                </B.HeaderLeftBox>
                <B.HeaderRightBox id="header__right">
                  <B.UrlBox id="url__box">
                    <a>
                      <B.UrlAddressImg id="url_icon" src="/link.png" />
                    </a>
                  </B.UrlBox>
                  <B.AddressBox>
                    {addressBox ? (
                      <B.AddressContentBox>
                        <B.AddressBackground src="/addressAlert.png" />
                        <B.AddressTextBox>
                          <B.AddressText>
                            {data?.fetchBoard?.boardAddress?.address ??
                              "등록된 주소가 없습니다."}
                          </B.AddressText>
                          <B.AddressText>
                            {data?.fetchBoard?.boardAddress?.addressDetail ??
                              "등록된 상세주소가 없습니다."}
                          </B.AddressText>
                        </B.AddressTextBox>
                      </B.AddressContentBox>
                    ) : null}
                    <B.AddressButton onClick={onClickAddressLink}>
                      <B.UrlAddressImg src="/address.png" />
                    </B.AddressButton>
                  </B.AddressBox>
                </B.HeaderRightBox>
              </B.Header>
              <B.DivideLine id="divide-line"></B.DivideLine>
              <B.Main id="main-content-box">
                <B.Title id="title">{data?.fetchBoard?.title}</B.Title>
                <B.MainImgBox id="image-box">
                  {data?.fetchBoard.images
                    ?.filter((el) => el)
                    .map((_, i) => (
                      <B.MainImage
                        key={_}
                        src={`https://storage.googleapis.com/${
                          data?.fetchBoard.images?.[i] ?? ""
                        }`}
                      />
                    ))}
                </B.MainImgBox>
                <B.MainContent id="contents">
                  {data?.fetchBoard?.contents}
                </B.MainContent>
              </B.Main>
              <B.YoutubeBox>
                <B.YoutubePlayer
                  style={{
                    minWidth: "1080px",
                    width: "100%",
                    minHeight: "720px",
                    height: "100%",
                  }}
                  controls
                  url={String(data?.fetchBoard?.youtubeUrl)}
                ></B.YoutubePlayer>
              </B.YoutubeBox>
              <B.LikeDislikeBox id="like-dislike-box">
                <B.LikeBox onClick={onClickLike} id="like">
                  <LikeBox
                    active={dance}
                    width="20"
                    height="18"
                    viewBox="0 0 20 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.11 3.72L10.54 6.61C10.42 7.2 10.58 7.81 10.96 8.27C11.34 8.73 11.9 9 12.5 9H18V10.08L15.43 16H7.34C7.16 16 7 15.84 7 15.66V7.82L11.11 3.72ZM12 0L5.59 6.41C5.21 6.79 5 7.3 5 7.83V15.66C5 16.95 6.05 18 7.34 18H15.44C16.15 18 16.8 17.63 17.16 17.03L19.83 10.88C19.94 10.63 20 10.36 20 10.08V9C20 7.9 19.1 7 18 7H12.5L13.42 2.35C13.47 2.13 13.44 1.89 13.34 1.69C13.11 1.24 12.82 0.83 12.46 0.47L12 0ZM2 7H0V18H2C2.55 18 3 17.55 3 17V8C3 7.45 2.55 7 2 7Z"
                      fill="#828282"
                    />
                  </LikeBox>

                  {data?.fetchBoard?.likeCount}
                </B.LikeBox>
                <B.DislikeBox onClick={onClickDislike} id="dislike">
                  <B.DislikeImg src="/dislike.png" />
                  {data?.fetchBoard?.dislikeCount}
                </B.DislikeBox>
              </B.LikeDislikeBox>
            </>
          )}
        </>
      </B.DetailPageWrapper>

      <B.ButtonBox>
        <B.DeleteButton onClick={onClickDelete}>삭제</B.DeleteButton>
        <B.UpdateButton onClick={onClickEdit}>수정</B.UpdateButton>
        <B.GoToListButton onClick={onClickToList}>목록</B.GoToListButton>
      </B.ButtonBox>
    </>
  );
};

const LikeBox = ({ children, ...rest }: any) => {
  return <B.LikeImg {...rest}>{children}</B.LikeImg>;
};

export default BoardDetailUI;
