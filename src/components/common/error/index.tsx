import styled from "@emotion/styled";

interface IError {
  children?: string;
}

const CommonError = (props: IError) => {
  return <StyledError>{props.children}</StyledError>;
};

export default CommonError;

export const StyledError = styled.span`
  display: block;
  color: red;
  font-weight: 400;
  font-size: 14px;
`;
