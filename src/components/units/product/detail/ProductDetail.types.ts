import { IQuery, IUseditem } from "../../../../commons/types/generated/types";

export interface IProductDetailProps {
  onClickPick: (id: string) => () => void;
  onClickDelete: (useditemId: string) => () => void;
  routerId?: string | string[];
  data?: {
    fetchUseditem: IUseditem;
  };
  onClickMoveToBack: () => void;
  pickedItemsData?: Pick<IQuery, "fetchUseditemsIPicked">;
  onClickBuy: (id: string) => () => Promise<void>;
  onClickUpdate: (
    usedItemId: string
  ) => (event: React.MouseEvent<HTMLButtonElement>) => void;
}
