import styled from "@emotion/styled";
import { Modal } from "antd";
import DaumPostcode from "react-daum-postcode";

export const Wrapper = styled.form`
  max-width: 1200px;
  width: 100%;
  margin: 5em auto;
  box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.2);

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  padding: 60px 100px;

  span {
    font-weight: 500;
    font-size: 16px;
  }

  input {
    border: 1px solid #bdbdbd;
  }

  & > div {
    width: 100%;
    display: flex;
    gap: 10px;
  }
`;

export const InputBox = styled.div`
  width: 100%;
  height: 92px;
  display: flex;
  flex-direction: column;

  input {
    height: 52px;
    padding: 14px;
  }

  textarea {
    height: 480px;
  }
`;

export const TextareaBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const AddressBox = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;

  input[type="text"] {
    height: 52px;
    padding: 14px;
  }

  div {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  div input {
    width: 77px;
    height: 52px;
  }

  div button {
    width: 124px;
    height: 52px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    background-color: black;
    padding: 14px 16px;
    border: none;
  }
`;

export const PictureBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  & > div {
    display: flex;
    gap: 10px;
  }
`;

export const Picture = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2em;
  width: 78px;
  height: 78px;
  background-image: url("/image 3.png");
  cursor: pointer;
`;

export const MainSettingBox = styled.div`
  width: 159px;
  height: 64px;
  display: flex;
  flex-direction: column;

  p {
    margin: 0;
    margin-top: 10px;
  }

  div {
    display: flex;
  }

  div div {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-right: 20px;
  }

  div div input {
    width: 20px;
    height: 20px;
    margin: 0;
  }

  div label {
    font-weight: 500;
    font-size: 16px;
    padding-left: 10px;
  }
`;

export const SubmitBox = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px 0;
  display: flex;
  justify-content: center;

  button {
    background: transparent;
    border: none;
    outline: none;
  }
`;

export const AddressModal = styled(Modal)``;

export const AddressSearchInput = styled(DaumPostcode)``;
