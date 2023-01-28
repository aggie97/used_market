import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import { Divider } from "antd";
import Button from "../../../common/button";
import KakaoMapLauncher from "../../../common/kakaoMap";
import ProductCommentList from "../comment/commentList/ProductCommentList.container";
import ProductNewComment from "../comment/newComment/ProductComment.container";
import {
  Header,
  HeaderLeft,
  HeaderRight,
  Image,
  ImageBox,
  ImageShadow,
  ImageWrapper,
  LeftHeader,
  LeftTags,
  LeftTitle,
  MainContent,
  MainLeft,
  MainRight,
  Price,
  ProductDetailWrapper,
  SellerProfile,
  StickyBox,
  Title,
} from "./ProductDetail.styles";
import { IProductDetailProps } from "./ProductDetail.types";

const ProductDetailUI = (props: IProductDetailProps) => {
  return (
    <>
      <ProductDetailWrapper>
        <Title>{props.data?.fetchUseditem.name}</Title>
        <Header>
          <HeaderLeft>
            <div>
              <HeartOutlined style={{ color: "red", fontSize: "1em" }} />
              {props.data?.fetchUseditem.pickedCount}
            </div>
            <div>
              등록 일시: {props.data?.fetchUseditem.createdAt.slice(0, 10)}
            </div>
          </HeaderLeft>
          <HeaderRight>
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
          </HeaderRight>
        </Header>
        <ImageWrapper>
          {props.data?.fetchUseditem.images
            ?.filter((url) => url)
            .map((imageUrl) => (
              <ImageBox key={imageUrl}>
                <ImageShadow></ImageShadow>
                <Image src={`https://storage.googleapis.com/${imageUrl}`} />
              </ImageBox>
            ))}
        </ImageWrapper>
        <MainContent>
          <MainLeft>
            <LeftHeader>
              <LeftTitle>
                {props.data?.fetchUseditem.seller?.name}님이 떠나보내는{" "}
                {props.data?.fetchUseditem.name}
                {props.data?.fetchUseditem.tags?.map((tag, i) => (
                  <LeftTags key={i}>#{tag}</LeftTags>
                ))}
              </LeftTitle>
              <SellerProfile>
                <img
                  width={56}
                  height={56}
                  src={props.data?.fetchUseditem.seller?.picture ?? ""}
                />
              </SellerProfile>
            </LeftHeader>
            <Divider></Divider>
            <div>상품 소개: {props.data?.fetchUseditem.remarks}</div>
            <div
              dangerouslySetInnerHTML={{
                __html: props.data?.fetchUseditem.contents ?? "",
              }}
            ></div>
            <div>
              <div>
                거래 위치: {props.data?.fetchUseditem.useditemAddress?.address},
                {props.data?.fetchUseditem.useditemAddress?.addressDetail}
              </div>
            </div>
          </MainLeft>
          <MainRight>
            <StickyBox>
              <Price>₩{props.data?.fetchUseditem.price}</Price>
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
              <p>상품 신고하기</p>
              <Divider />
              <Button onClick={props.onClickMoveToBack}>돌아가기</Button>
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
            </StickyBox>
          </MainRight>
        </MainContent>
        <div style={{ height: "480px" }}>
          <KakaoMapLauncher
            address={props.data?.fetchUseditem.useditemAddress?.address ?? ""}
            routerId={String(props.routerId)}
          />
        </div>
      </ProductDetailWrapper>
      <ProductNewComment useditemId={String(props.routerId)} />
      <Divider />
      <ProductCommentList useditemId={String(props.routerId)} />
    </>
  );
};

export default ProductDetailUI;
