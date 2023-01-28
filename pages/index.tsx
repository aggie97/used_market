import { useQuery } from "@apollo/client";
import { Divider } from "antd";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { todayILookedProducts } from "../src/commons/store";
import { IQuery, IUseditem } from "../src/commons/types/generated/types";
import Banner from "../src/components/common/layout/banner";
import ProductList from "../src/components/units/product/list/ProductList.container";
import { FETCH_USED_ITEMS_I_PICKED } from "../src/components/units/product/list/ProductList.queries";
import PickedProductList from "../src/components/units/product/pick";
import TodayILookedProducts from "../src/components/units/product/today";

// const MY_11ST_API_KEY = "2b25e80987bcd209bca5ed6a64832e7f";

const Home = () => {
  const router = useRouter();
  const setTodayItem = useSetRecoilState(todayILookedProducts);
  useEffect(() => {
    const todayItems = JSON.parse(localStorage.getItem("TILP") ?? "[]");
    if (todayItems.length) setTodayItem(todayItems);
  }, []);
  const { data: pickedItemsData } = useQuery<
    Pick<IQuery, "fetchUseditemsIPicked">
  >(FETCH_USED_ITEMS_I_PICKED, {
    variables: { search: "" },
  });

  const onClickProductItem = (item: IUseditem) => async () => {
    await router.push(`/market/${item._id}`);
  };
  return (
    <>
      <Banner />
      {typeof window !== "undefined" &&
        JSON.parse(localStorage.getItem("TILP") ?? "[]").length > 0 && (
          <>
            <TodayILookedProducts />
            <Divider />
          </>
        )}
      {pickedItemsData?.fetchUseditemsIPicked.length ? (
        <>
          <PickedProductList
            onClickProductItem={onClickProductItem}
            data={pickedItemsData}
          />
          <Divider />
        </>
      ) : null}
      <ProductList />
    </>
  );
};

export default Home;
