import { HeartFilled, ShoppingCartOutlined } from "@ant-design/icons";
import { MouseEvent } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { IQuery, IUseditem } from "../../../../commons/types/generated/types";
import {
  ControlBox,
  ControlButton,
  LikeBox,
  ProductCard,
  ProductImg,
  ProductInfo,
  ProductWrapper,
} from "./ProductList.styles";

interface IProductListProps {
  onClickCart: (
    item: IUseditem
  ) => (event: MouseEvent<HTMLButtonElement>) => void;
  onClickProductItem: (itemId: IUseditem) => () => void;

  itemsData?: Pick<IQuery, "fetchUseditems">;
  loadFunc: () => void;
}

const ProductListUI = ({
  onClickCart,

  itemsData,
  loadFunc,
  onClickProductItem,
}: IProductListProps) => {
  return (
    <>
      <ProductWrapper>
        <InfiniteScroll
          pageStart={0}
          loadMore={loadFunc}
          hasMore={true || false}
        >
          {itemsData?.fetchUseditems.map((item) => (
            <ProductCard key={item._id} onClick={onClickProductItem(item)}>
              <ProductImg
                src={`https://storage.googleapis.com/${item.images?.[0] ?? ""}`}
              />
              <ProductInfo>
                <span>{item.name}</span>
              </ProductInfo>
              <ControlBox>
                <LikeBox>
                  <HeartFilled />
                  <span>{item.pickedCount}</span>
                </LikeBox>
                <ControlButton onClick={onClickCart(item)}>
                  <ShoppingCartOutlined />
                </ControlButton>
              </ControlBox>
            </ProductCard>
          ))}
        </InfiniteScroll>
      </ProductWrapper>
    </>
  );
};

export default ProductListUI;
