import { useMutation, useQuery } from "@apollo/client";
import { Modal } from "antd";
import { useRouter } from "next/router";
import {
  IMutation,
  IMutationCreatePointTransactionOfBuyingAndSellingArgs,
  IMutationDeleteUseditemArgs,
  IMutationToggleUseditemPickArgs,
  IQuery,
  IQueryFetchUseditemArgs,
  IQueryFetchUseditemsIPickedArgs,
} from "../../../../commons/types/generated/types";
import { FETCH_USED_ITEMS_I_PICKED } from "../list/ProductList.queries";

import ProductDetailUI from "./ProductDetail.presenter";
import {
  CREATE_POINT_TRANSACTION_OF_BUYING_AND_SELLING,
  DELETE_USED_ITEM,
  FETCH_USED_ITEM,
  FETCH_USER_LOGGED_IN,
  TOGGLE_USED_ITEM_PICK,
} from "./ProductDetail.queries";

const ProductDetail = () => {
  const router = useRouter();
  const { data } = useQuery<
    Pick<IQuery, "fetchUseditem">,
    IQueryFetchUseditemArgs
  >(FETCH_USED_ITEM, {
    variables: { useditemId: String(router.query.id) },
  });

  const [deleteUseditem] = useMutation<
    Pick<IMutation, "deleteUseditem">,
    IMutationDeleteUseditemArgs
  >(DELETE_USED_ITEM);

  const [toggleUseditemPick] = useMutation<
    Pick<IMutation, "toggleUseditemPick">,
    IMutationToggleUseditemPickArgs
  >(TOGGLE_USED_ITEM_PICK);

  const { data: pickedItemsData } = useQuery<
    Pick<IQuery, "fetchUseditemsIPicked">,
    IQueryFetchUseditemsIPickedArgs
  >(FETCH_USED_ITEMS_I_PICKED, {
    variables: { search: "" },
  });

  const [createPointTransactionOfBuyingAndSelling] = useMutation<
    Pick<IMutation, "createPointTransactionOfBuyingAndSelling">,
    IMutationCreatePointTransactionOfBuyingAndSellingArgs
  >(CREATE_POINT_TRANSACTION_OF_BUYING_AND_SELLING);

  // const [createPointTransactionOfLoading] = useMutation<
  //   Pick<IMutation, "createPointTransactionOfLoading">,
  //   IMutationCreatePointTransactionOfLoadingArgs
  // >(CREATE_POINT_TRANSACTION_OF_LOADING);

  const onClickMoveToBack = async () => {
    await router.push("/");
  };

  const onClickUpdate = (useditemId: string) => async () => {
    await router.push(`/market/${useditemId}/edit`);
  };

  const onClickDelete = (useditemId: string) => async () => {
    try {
      await deleteUseditem({
        variables: { useditemId },
      });
      alert("상품이 삭제되었습니다.");
      await router.push("/");
    } catch (error) {
      if (error instanceof Error)
        Modal.error({ content: "다른 사람의 게시글은 삭제할 수 없습니다." });
    }
  };

  const onClickPick = (useditemId: string) => async () => {
    // const temp = pickedItemsData?.fetchUseditemsIPicked.filter(
    //   (el) => el._id === useditemId
    // );
    try {
      await toggleUseditemPick({
        variables: { useditemId },
        refetchQueries: [
          {
            query: FETCH_USED_ITEMS_I_PICKED,
            variables: { search: "" },
          },
          { query: FETCH_USED_ITEM, variables: { useditemId } },
        ],
      });
    } catch (error) {
      if (error instanceof Error) Modal.error({ content: error.message });
    }
  };

  const onClickBuy = (useritemId: string) => async () => {
    try {
      await createPointTransactionOfBuyingAndSelling({
        variables: { useritemId },
        refetchQueries: [
          {
            query: FETCH_USER_LOGGED_IN,
          },
        ],
      });

      Modal.success({ content: "구매 완료되었습니다." });
      await router.push("/myPage"); // 구매 물품 목록 페이지
    } catch (error) {
      if (error instanceof Error) alert(error);
    }
  };

  return (
    <ProductDetailUI
      onClickMoveToBack={onClickMoveToBack}
      onClickDelete={onClickDelete}
      data={data}
      routerId={router.query.id}
      onClickPick={onClickPick}
      onClickBuy={onClickBuy}
      pickedItemsData={pickedItemsData}
      onClickUpdate={onClickUpdate}
    />
  );
};

export default ProductDetail;
