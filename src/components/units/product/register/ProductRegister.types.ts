import { ChangeEventHandler, MutableRefObject } from "react";
import { Address } from "react-daum-postcode";
import {
  FormState,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import {
  IUseditem,
  IUseditemAddress,
  Maybe,
} from "../../../../commons/types/generated/types";

export interface IFormDataProps {
  name: string;
  remarks: string;
  contents: string;
  price: number;
  tags?: Maybe<string[]>;
  useditemAddress?: Partial<IUseditemAddress>;
  images?: Maybe<string[]>;
  createdAt?: string;
  pickedCount?: Maybe<number>;
}

export interface IProductProps {
  formState: FormState<IFormDataProps>;
  onChangeValue: (value: string) => void;
  setValue: UseFormSetValue<IFormDataProps>;
  onEdit: (formData: IFormDataProps) => Promise<void>;
  onClickSearchAddress: (() => void) | undefined;
  data?: { fetchUseditem: IUseditem };
  isEdit?: boolean;
  getValues: (arg: string) => string;
  onCompleteAddressSearch: ((address: Address) => void) | undefined;
  isOpen: any;
  images: string[];
  preImages: string[];
  imageRef: MutableRefObject<undefined | HTMLLabelElement>;
  onChangeImageBox: (
    index: number
  ) => ChangeEventHandler<HTMLInputElement> | undefined;
  onClickBox: () => void;
  onSubmit: (formData: IFormDataProps) => Promise<void>;
  handleSubmit: UseFormHandleSubmit<IFormDataProps>;
  register: UseFormRegister<IFormDataProps>;
}
