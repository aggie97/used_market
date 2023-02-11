import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import { Divider } from "antd";
import Button from "../../../common/button";
import KakaoMapLauncher from "../../../common/kakaoMap";
import useCheckLoggedInUser from "../../../common/useCheckLoggedInUser";
import ProductCommentList from "../comment/commentList/ProductCommentList.container";
import ProductNewComment from "../comment/newComment/ProductComment.container";
import * as S from "./ProductDetail.styles";
import { IProductDetailProps } from "./ProductDetail.types";

const ProductDetailUI = (props: IProductDetailProps) => {
  const loggedInUser = useCheckLoggedInUser();
  return (
    <>
      <S.ProductDetailWrapper>
        <S.Title>{props.data?.fetchUseditem.name}</S.Title>
        <S.Header>
          <S.HeaderLeft>
            <div>
              <HeartOutlined style={{ color: "red", fontSize: "1em" }} />
              {props.data?.fetchUseditem.pickedCount}
            </div>
            <div>
              등록 일시: {props.data?.fetchUseditem.createdAt.slice(0, 10)}
            </div>
          </S.HeaderLeft>
          <S.HeaderRight>
            <button
              style={{
                display: "flex",
                backgroundColor: "transparent",
                border: "none",
                alignItems: "center",
                gap: "10px",
                cursor: "pointer",
              }}
              type="button"
              onClick={props.onClickPick(props.data?.fetchUseditem._id ?? "")}
            >
              <span>찜하기</span>
              {props.pickedItemsData?.fetchUseditemsIPicked.filter(
                (el) => el?._id === props.routerId
              ).length ? (
                <HeartFilled style={{ fontSize: "2em", color: "red" }} />
              ) : (
                <HeartOutlined style={{ fontSize: "2em", color: "red" }} />
              )}
            </button>
          </S.HeaderRight>
        </S.Header>
        <S.ImageWrapper>
          {props.data?.fetchUseditem.images
            ?.filter((url) => url)
            .map((imageUrl) => (
              <S.ImageBox key={imageUrl}>
                <S.ImageShadow></S.ImageShadow>
                <S.StyledImage
                  src={`https://storage.googleapis.com/${imageUrl}`}
                />
              </S.ImageBox>
            ))}
        </S.ImageWrapper>
        <S.MainContent>
          <S.MainLeft>
            <S.LeftHeader>
              <S.LeftTitle>
                <span>{props.data?.fetchUseditem.seller?.name}</span>님이{" "}
                떠나보내는 {props.data?.fetchUseditem.name}
                {props.data?.fetchUseditem.tags?.map((tag, i) => (
                  <S.LeftTags key={i}>#{tag}</S.LeftTags>
                ))}
              </S.LeftTitle>
              {props.data?.fetchUseditem.seller?.picture ? (
                <S.SellerProfile>
                  <img
                    width={56}
                    height={56}
                    src={props.data?.fetchUseditem.seller?.picture}
                  />
                </S.SellerProfile>
              ) : (
                <img width={50} height={50} src="/avatar.png" />
              )}
            </S.LeftHeader>
            <Divider></Divider>
            <S.LeftContentBox>
              <p>{props.data?.fetchUseditem.remarks}</p>
              <p
                dangerouslySetInnerHTML={{
                  __html:
                    props.data?.fetchUseditem.contents ??
                    "판매자가 작성한 소개가 없습니다.",
                }}
              ></p>
              <p>
                거래 위치: {props.data?.fetchUseditem.useditemAddress?.address},
                {props.data?.fetchUseditem.useditemAddress?.addressDetail}
              </p>
            </S.LeftContentBox>
          </S.MainLeft>
          <S.MainRight>
            <S.StickyBox>
              <S.Price>가격 : ₩{props.data?.fetchUseditem.price}</S.Price>
              <Divider />
              <Button
                onClick={props.onClickBuy(
                  String(props.data?.fetchUseditem._id)
                )}
              >
                {props.data?.fetchUseditem.soldAt
                  ? "판매 완료된 상품입니다."
                  : "구매하기"}
              </Button>
              <Divider />
              <Button onClick={props.onClickMoveToBack}>돌아가기</Button>
              {props.data?.fetchUseditem.seller?._id === loggedInUser && (
                <>
                  <Divider />
                  <Button
                    onClick={props.onClickUpdate(
                      props.data?.fetchUseditem._id ?? ""
                    )}
                  >
                    수정하기
                  </Button>
                  <Button
                    onClick={props.onClickDelete(
                      props.data?.fetchUseditem._id ?? ""
                    )}
                  >
                    삭제하기
                  </Button>
                </>
              )}
            </S.StickyBox>
          </S.MainRight>
        </S.MainContent>
        <div style={{ height: "480px" }}>
          <KakaoMapLauncher
            address={props.data?.fetchUseditem.useditemAddress?.address ?? ""}
            routerId={String(props.routerId)}
          />
        </div>
      </S.ProductDetailWrapper>
      <ProductNewComment useditemId={String(props.routerId)} />
      <Divider />
      <ProductCommentList useditemId={String(props.routerId)} />
    </>
  );
};

export default ProductDetailUI;
