import { IUseditem } from "../../../commons/types/generated/types";
import {
  ProductCard,
  ProductImg,
  ProductInfo,
} from "../../units/product/list/ProductList.styles";

interface IProductItemProps {
  item: IUseditem;
  onClickProductItem: (item: IUseditem) => () => void;
}

const ProductItem = ({ item, onClickProductItem }: IProductItemProps) => {
  return (
    <ProductCard key={item._id} onClick={onClickProductItem(item)}>
      <ProductImg
        src={`https://storage.googleapis.com/${item.images?.[0] ?? ""}`}
      />
      <ProductInfo>{item.name}</ProductInfo>
      {/* <Button onClick={onClickCart(item)}>카트에 담기</Button> */}
    </ProductCard>
  );
};

export default ProductItem;
