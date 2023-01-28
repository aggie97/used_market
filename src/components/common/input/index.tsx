import styled from "@emotion/styled";
import { ChangeEvent } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

const StyledInput = styled.input`
  position: relative;
  width: 100%;
  border: 1px solid #ddd;
  padding: 10px 1em;
  font-size: 15px;
  font-weight: 400;
  outline: none;
  transition: border 0.3s ease;
  &:focus {
    border: 1px solid skyblue;
  }
`;

interface IInputProps {
  type: string;
  id?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  ref?: any;
  placeholder?: string;
  defaultValue?: string;
  register?: UseFormRegisterReturn;
  value?: string | number;
  readonly?: boolean;
}

const Input = ({
  type,
  id,
  onChange,
  placeholder,
  defaultValue,
  register,
  value,
  readonly,
}: IInputProps) => {
  return (
    <StyledInput
      {...register}
      value={value}
      readOnly={readonly}
      onChange={onChange}
      type={type}
      id={id}
      placeholder={placeholder}
      defaultValue={defaultValue}
    />
  );
};

export default Input;
