import { useRouter } from "next/router";
import { IUseditem } from "../../../../../commons/types/generated/types";
import Button from "../../../../common/button";
import {
  ProductCard,
  ProductImg,
  ProductInfo,
} from "../../list/ProductList.styles";

interface ITodayProps {
  product: IUseditem;
}

const TodayILookedProduct = ({ product }: ITodayProps) => {
  const router = useRouter();
  return (
    <div style={{ flex: "0 0 auto" }}>
      <ProductCard
        onClick={async () => await router.push(`/market/${product._id}`)}
      >
        <div>
          <ProductImg
            src={`https://storage.googleapis.com/${product.images?.[0] ?? ""}`}
          />
          <ProductInfo>{product.name}</ProductInfo>
          <Button>카트에 담지 않기</Button>
        </div>
      </ProductCard>
    </div>
  );
};

export default TodayILookedProduct;
