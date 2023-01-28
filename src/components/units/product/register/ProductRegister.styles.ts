import styled from "@emotion/styled";
import DaumPostcode from "react-daum-postcode";

export const ProductFormWrapper = styled.div`
  max-width: 1240px;
  margin: 0 auto;
`;

export const NoImageBox = styled.label`
  width: 100px;
  height: 100px;
  line-height: 100px;
  font-size: 1em;
  text-align: center;
  background-color: lightgray;
  margin-right: 10px;
  cursor: pointer;
`;

export const AddressInputModal = styled(DaumPostcode)``;
