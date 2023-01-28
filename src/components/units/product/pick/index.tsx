import styled from "@emotion/styled";
import { IQuery, IUseditem } from "../../../../commons/types/generated/types";
import Button from "../../../common/button";
import {
  ProductCard,
  ProductImg,
  ProductInfo,
} from "../list/ProductList.styles";

interface IPickedProductListProps {
  data?: Pick<IQuery, "fetchUseditemsIPicked">;
  onClickProductItem: (item: IUseditem) => () => void;
}

const PickedProductList = (props: IPickedProductListProps) => {
  return (
    <PickProductListWrapper>
      <Title>찜하신 상품들을 모아봤어요!</Title>
      <ListUl>
        {props.data?.fetchUseditemsIPicked.map((item, i) =>
          i < 5 ? (
            <ProductCard
              key={item._id}
              onClick={props.onClickProductItem(item)}
            >
              <ProductImg
                src={`https://storage.googleapis.com/${item.images?.[0] ?? ""}`}
              />
              <ProductInfo>{item.name}</ProductInfo>
              <Button>카트에 담기</Button>
            </ProductCard>
          ) : null
        )}
      </ListUl>
    </PickProductListWrapper>
  );
};

export default PickedProductList;

const PickProductListWrapper = styled.div`
  max-width: 1240px;
  width: 100%;
  margin: 0 auto;
  padding-top: 50px;
`;

const Title = styled.span`
  font-size: 1.5em;
  font-weight: 600;
`;

const ListUl = styled.ul`
  list-style: none;
  display: flex;
  width: 100%;
  gap: 35px;
`;
