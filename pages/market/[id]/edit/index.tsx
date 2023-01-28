import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import {
  IQuery,
  IQueryFetchUseditemArgs,
} from "../../../../src/commons/types/generated/types";
import ProductRegister from "../../../../src/components/units/product/register/ProductRegister.container";

export const FETCH_USED_ITEM = gql`
  query fetchUseditem($useditemId: ID!) {
    fetchUseditem(useditemId: $useditemId) {
      _id
      name
      remarks
      contents
      price
      tags
      images
      pickedCount
      useditemAddress {
        __typename
        zipcode
        address
        addressDetail
        lat
        lng
      }
      createdAt
      updatedAt
    }
  }
`;

const ProductEditPage = () => {
  const router = useRouter();
  const { data } = useQuery<
    Pick<IQuery, "fetchUseditem">,
    IQueryFetchUseditemArgs
  >(FETCH_USED_ITEM, {
    variables: { useditemId: String(router.query.id) },
  });
  console.log(router.query.id);
  console.log("edit", data);
  return <ProductRegister data={data} isEdit={true} />;
};

export default ProductEditPage;
