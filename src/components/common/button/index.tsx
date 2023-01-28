import styled from "@emotion/styled";

interface IButtonProps {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: string | JSX.Element;
  type?: "button" | "submit";
}

const Button = (props: IButtonProps) => {
  return (
    <StyledButton type={props.type} onClick={props.onClick}>
      {props.children}
    </StyledButton>
  );
};

export default Button;

const StyledButton = styled.button`
  width: 100%;
  border: 1px solid #ddd;
  padding: 10px 1em;
  font-size: 15px;
  font-weight: 400;
  outline: none;
  transition: all 0.3s ease;
  background-color: white;
  color: deepskyblue;
  border: 1px solid deepskyblue;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    color: white;
    background-color: deepskyblue;
  }
`;
