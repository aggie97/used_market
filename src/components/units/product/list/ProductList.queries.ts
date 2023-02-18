import { gql } from "@apollo/client";

export const FETCH_USED_ITEMS_I_PICKED = gql`
  query fetchUseditemsIPicked($search: String!) {
    fetchUseditemsIPicked(search: $search) {
      _id
      name
      remarks
      contents
      images
    }
  }
`;

export const FETCH_USED_ITEMS = gql`
  query fetchUseditems($page: Int) {
    fetchUseditems(page: $page) {
      _id
      name
      contents
      price
      images
      pickedCount
    }
  }
`;

export const TOGGLE_USED_ITEM_PICK = gql`
  mutation toggleUsedItemPick($useditemId: String!) {
    toggleUsedItemPick(useditemId: $useditemId)
  }
`;
