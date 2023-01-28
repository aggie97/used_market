import InfiniteScroll from "react-infinite-scroller";
import { IQuery, IUseditem } from "../../../../commons/types/generated/types";
import Button from "../../../common/button";

import {
  ProductCard,
  ProductImg,
  ProductInfo,
  ProductWrapper,
} from "./ProductList.styles";

interface IProductListProps {
  onClickCart: (
    item: IUseditem
  ) => (event: React.MouseEvent<HTMLButtonElement>) => void;
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
          {itemsData?.fetchUseditems.map((item, i) => (
            <ProductCard key={item._id} onClick={onClickProductItem(item)}>
              <ProductImg
                src={`https://storage.googleapis.com/${item.images?.[0] ?? ""}`}
              />
              <ProductInfo>{item.name}</ProductInfo>
              <Button onClick={onClickCart(item)}>카트에 담기</Button>
            </ProductCard>
          ))}
        </InfiniteScroll>
      </ProductWrapper>
    </>
  );
};

export default ProductListUI;
