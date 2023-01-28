import styled from "@emotion/styled";
import { IUseditem } from "../../../../commons/types/generated/types";
import TodayILookedProduct from "./todayProdutItem";

const TodayILookedProducts = () => {
  return (
    <TodayProductsWrapper>
      <p style={{ fontSize: "1.5rem", fontWeight: "600", margin: "0" }}>
        오늘 본 물건들을 모아봤어요!
      </p>
      {typeof window !== "undefined" && (
        <div
          style={{
            display: "flex",
            width: "100%",
            gap: "35px",
          }}
        >
          {JSON.parse(localStorage.getItem("TILP") ?? "[]")?.map(
            (product: IUseditem, i: number) => (
              <TodayILookedProduct key={i} product={product} />
            )
          )}
        </div>
      )}
    </TodayProductsWrapper>
  );
};

export default TodayILookedProducts;

const TodayProductsWrapper = styled.div`
  max-width: 1240px;
  width: 100%;
  margin: 0 auto;
  padding-top: 50px;
`;
