import styled from "@emotion/styled";

interface IButtonProps {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: string | JSX.Element;
  type?: "button" | "submit";
  width?: string;
  padding?: string;
  height?: string;
}

interface IStyle {
  width?: string;
  padding?: string;
  height?: string;
}

const Button = (props: IButtonProps) => {
  return (
    <StyledButton
      width={props.width}
      height={props.height}
      padding={props.padding}
      type={props.type}
      onClick={props.onClick}
    >
      {props.children}
    </StyledButton>
  );
};

export default Button;

const StyledButton = styled.button`
  width: ${(props: IStyle) => props.width ?? "100%"};
  height: ${(props: IStyle) => props.height ?? "100%"};
  padding: ${(props: IStyle) => props.padding ?? "0.5rem"};
  font-size: 1rem;
  font-weight: 400;
  outline: none;
  transition: all 0.3s ease;
  background-color: white;
  color: #6401ff;
  border: 1px solid #6401ff;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    color: white;
    background-color: #6401ff;
  }
`;
