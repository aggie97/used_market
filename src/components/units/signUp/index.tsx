import { gql, useMutation } from "@apollo/client";
import styled from "@emotion/styled";
import { Button, Modal } from "antd";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useRef, useState } from "react";

import {
  IMutation,
  IMutationCreateUserArgs,
} from "../../../commons/types/generated/types";
import Input from "../../common/input";

const CREATE_USER = gql`
  mutation createUser($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      _id
      email
      name
      createdAt
    }
  }
`;

const SignUp = () => {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const [createUser] = useMutation<
    Pick<IMutation, "createUser">,
    IMutationCreateUserArgs
  >(CREATE_USER);

  const [input, setInput] = useState({
    email: "",
    password: "",
    name: "",
  });

  const [passwordSame, setPasswordSame] = useState("");

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, [event.target.id]: event.target.value });
  };

  const onChangePwSame = (event: ChangeEvent<HTMLInputElement>) => {
    setPasswordSame(event.target.value);
  };

  const onClickSubmit = async () => {
    if (passwordSame !== input.password) {
      Modal.error({
        content: "비밀번호가 일치하지 않습니다.\n 다시 입력해주세요.",
      });
      return;
    }
    try {
      const result = await createUser({
        variables: {
          createUserInput: { ...input },
        },
      });
      console.log(result);
      Modal.success({ content: "회원가입이 완료되었습니다." });
      await router.push("/signIn");
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    }
  };
  return (
    <SignUpPageWrapper>
      <Header>
        <Title>회원가입</Title>
      </Header>
      <FormWrapper>
        이메일{" "}
        <EmailInput
          onChange={onChangeInput}
          type="text"
          id="email"
          ref={inputRef}
        />
        비밀번호{" "}
        <Input onChange={onChangeInput} type="password" id="password" />
        비밀번호 확인 <Input onChange={onChangePwSame} type="password" />
        이름 <Input onChange={onChangeInput} type="text" id="name" />
        <Button onClick={onClickSubmit}>회원가입</Button>
      </FormWrapper>
    </SignUpPageWrapper>
  );
};

export default SignUp;

export const SignUpPageWrapper = styled.div`
  padding: 83px 0;
  width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 10px;
`;

export const Title = styled.h1`
  margin: 0;
  padding: 0;
`;

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  & > input {
    margin-bottom: 1em;
  }
`;

export const EmailInput = styled.input`
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
