import { gql, useMutation } from "@apollo/client";
import styled from "@emotion/styled";
import { Modal } from "antd";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { accessTokenState, isLoggedInUserState } from "../../../commons/store";
import {
  IMutation,
  IMutationLoginUserArgs,
} from "../../../commons/types/generated/types";
import Logo from "../../common/logo";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import CommonError from "../../common/error";
import Button from "../../common/button";

const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      accessToken
    }
  }
`;

const MySchema = yup.object({
  email: yup.string().required("필수 입력란입니다."),
  // password: yup
  //   .string()
  //   .matches(
  //     /^.*(?=^.{3,12}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/,
  //     "영문, 숫자, 특수문자를 포함한 12자 이내로 입력해주세요."
  //   )
  //   .required("필수 입력란입니다."),
});

const SignIn = () => {
  const router = useRouter();
  const { register, handleSubmit, formState } = useForm<IMutationLoginUserArgs>(
    {
      resolver: yupResolver(MySchema),
      mode: "onSubmit",
    }
  );
  const [, setIsLoggedInUser] = useRecoilState(isLoggedInUserState);
  const [, setToken] = useRecoilState(accessTokenState);
  const [isPasswordMasked, setIsMaskedPassword] = useState(true);

  const [loginUser] = useMutation<
    Pick<IMutation, "loginUser">,
    IMutationLoginUserArgs
  >(LOGIN_USER);

  const onSubmit = async (formData: IMutationLoginUserArgs) => {
    console.log("login test");
    // 로그인 뮤테이션 전송

    try {
      const result = await loginUser({
        variables: { ...formData },
      });
      console.log(result);
      const accessToken = result.data?.loginUser.accessToken;
      if (!accessToken) {
        Modal.error({ content: "로그인을 해주세요." });
        return;
      }
      setToken(accessToken);
      setIsLoggedInUser(true);

      Modal.success({ content: "로그인이 완료되었습니다." });

      await router.push("/");
    } catch (error) {
      if (error instanceof Error) Modal.error({ content: error.message });
    }
  };

  const onClickToggleLabel = () => {
    setIsMaskedPassword((prev) => !prev);
  };
  return (
    <SignPageWrapper>
      <Logo />
      <FormWrapper onSubmit={handleSubmit(onSubmit)}>
        <Email
          placeholder="이메일을 입력해주세요."
          type="email"
          id="email"
          {...register("email")}
        />
        <CommonError>{formState.errors.email?.message}</CommonError>
        <PasswordWrapper>
          <Password
            placeholder="비밀번호를 입력해주세요."
            {...register("password")}
            type={isPasswordMasked ? "password" : "text"}
            id="password"
          />
          <CommonError>{formState.errors.password?.message}</CommonError>
          <ToggleLabel onClick={onClickToggleLabel}>
            {isPasswordMasked ? "비밀번호 보기" : "가리기"}
          </ToggleLabel>
        </PasswordWrapper>
        <Button>로그인</Button>
      </FormWrapper>
      <div>
        <p>회원이 아니신가요?</p>
        <MoveToSignUp onClick={async () => await router.push("/signUp")}>
          회원가입 하러가기
        </MoveToSignUp>
      </div>
    </SignPageWrapper>
  );
};

export default SignIn;

export const SignPageWrapper = styled.div`
  /* width: 100%; */
  padding: 83px 0;
  width: 328px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
`;

export const FormWrapper = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;

  & input {
    position: relative;
    width: 100%;
    border: 1px solid #ddd;
    padding: 10px 1em;
    font-size: 15px;
    font-weight: 400;
    outline: none;
  }
`;

export const PasswordWrapper = styled.div`
  position: relative;
`;

export const Email = styled.input``;

export const Password = styled.input`
  padding-right: 105px !important;
`;

export const ToggleLabel = styled.label`
  position: absolute;
  top: 0;
  left: 220px;
  line-height: 45px;
  font-size: 14px;
  font-weight: 400;
  width: 100px;
  cursor: pointer;
  text-align: end;
`;

export const MoveToSignUp = styled.a`
  &:hover {
    text-decoration: underline;
  }
`;
