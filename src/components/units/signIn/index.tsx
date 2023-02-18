import { gql, useMutation } from "@apollo/client";
import styled from "@emotion/styled";
import { Modal } from "antd";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
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
import { styleSet } from "../../../commons/styles/globalStyles";

interface IStyle {
  isFocused?: boolean;
}

const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      accessToken
    }
  }
`;

const MySchema = yup.object({
  email: yup.string().required("이메일을 입력하세요."),
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
  const [isPasswordMasked, setIsMaskedPassword] = useState(true);
  const [isFocused, setIsFocused] = useState({
    email: false,
    password: false,
  });

  const { register, handleSubmit, setFocus, getValues, formState } =
    useForm<IMutationLoginUserArgs>({
      resolver: yupResolver(MySchema),
      mode: "onSubmit",
    });

  useEffect(() => {
    setFocus("email");
    setIsFocused({ email: true, password: false });
  }, []);

  const setIsLoggedInUser = useSetRecoilState(isLoggedInUserState);
  const setToken = useSetRecoilState(accessTokenState);

  const [loginUser] = useMutation<
    Pick<IMutation, "loginUser">,
    IMutationLoginUserArgs
  >(LOGIN_USER);

  const onSubmit = async (formData: IMutationLoginUserArgs) => {
    try {
      const result = await loginUser({
        variables: { ...formData },
      });

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

  const onClickEmail = () => {
    if (document.activeElement?.tagName === "INPUT") {
      if (document.activeElement?.id === "email") {
        setIsFocused({
          email: true,
          password: getValues("password") !== "",
        });
      } else if (document.activeElement?.id === "password") {
        setIsFocused({ email: getValues("email") !== "", password: true });
      }
    } else {
      setIsFocused({
        email: getValues("email") !== "",
        password: getValues("password") !== "",
      });
    }
  };

  return (
    <SignPageWrapper onClick={onClickEmail}>
      <LoginContainer>
        <Logo />
        <h1>로그인</h1>
        <FormWrapper onSubmit={handleSubmit(onSubmit)}>
          <InputWrapper>
            <Input type="email" id="email" {...register("email")} />
            <PlaceHolder
              isFocused={isFocused.email}
              onClick={() => setFocus("email")}
            >
              이메일 입력
            </PlaceHolder>
          </InputWrapper>
          <CommonError>{formState.errors.email?.message}</CommonError>
          <InputWrapper>
            <Input
              {...register("password")}
              type={isPasswordMasked ? "password" : "text"}
              id="password"
            />
            <PlaceHolder
              isFocused={isFocused.password}
              onClick={() => setFocus("password")}
            >
              비밀번호 입력
            </PlaceHolder>
            <ToggleLabel onClick={onClickToggleLabel}>
              {isPasswordMasked ? "비밀번호 보기" : "가리기"}
            </ToggleLabel>
            <CommonError>{formState.errors.password?.message}</CommonError>
          </InputWrapper>
          <Button>로그인</Button>
        </FormWrapper>
        <div>
          <p>회원이 아니신가요?</p>
          <MoveToSignUp onClick={async () => await router.push("/signUp")}>
            회원가입 하러가기
          </MoveToSignUp>
        </div>
      </LoginContainer>
    </SignPageWrapper>
  );
};

export default SignIn;

export const SignPageWrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginContainer = styled.div`
  max-width: 30rem;
  width: 100%;
  padding: 3rem 2.5rem;
  border: 1px solid #ccc;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

export const FormWrapper = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  position: relative;

  & input {
    position: relative;
    width: 100%;
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 10px 1em;
    font-size: 1rem;
    font-weight: 400;
    outline: none;
    transition: all 0.1s ease;
  }
`;

export const PasswordWrapper = styled.div`
  position: relative;
`;

export const InputWrapper = styled.div`
  position: relative;
`;

export const Input = styled.input`
  :focus {
    border: 2px solid ${styleSet.mainColor};
  }
`;

export const PlaceHolder = styled.div`
  position: absolute;
  left: ${(props: IStyle) => (props.isFocused ? "0.8rem" : "1rem")};
  bottom: ${(props: IStyle) => (props.isFocused ? "2rem" : "0.65rem")};
  font-size: ${(props: IStyle) => (props.isFocused ? "0.8rem" : "1rem")};
  background-color: ${(props: IStyle) =>
    props.isFocused ? "#fff" : "transparent"};
  padding: ${(props: IStyle) => (props.isFocused ? "0 0.2rem" : "inherit")};
  color: ${(props: IStyle) => (props.isFocused ? styleSet.mainColor : "#777")};
  transition: all 0.15s ease;
`;

export const Password = styled.input`
  padding-right: 105px !important;
`;

export const ToggleLabel = styled.label`
  position: absolute;
  top: 0;
  right: 1rem;
  line-height: 45px;
  font-size: 14px;
  font-weight: 400;
  width: 100px;
  cursor: pointer;
  text-align: end;
`;

export const MoveToSignUp = styled.a`
  cursor: pointer;
  color: ${styleSet.mainColor + "cc"};
  padding: 0.5rem;
  border-radius: 0.5rem;
  &:hover {
    color: ${styleSet.mainColor};
    background-color: ${styleSet.mainColor + "11"};
  }
`;
