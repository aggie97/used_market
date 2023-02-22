import { useMutation, useQuery } from "@apollo/client";
import { Modal } from "antd";
import Head from "next/head";
import Image from "next/image";
import { ChangeEvent, useRef, useState } from "react";
import {
  IMutation,
  IMutationCreatePointTransactionOfLoadingArgs,
  IMutationUpdateUserArgs,
  IMutationUploadFileArgs,
  IQuery,
} from "../../../commons/types/generated/types";
import Button from "../../common/button";
import useAuth from "../../common/useAuth";
import {
  CREATE_POINT_TRANSACTION_OF_LOADING,
  FETCH_USER_LOGGED_IN,
  UPDATE_USER,
  UPLOAD_FILE,
} from "./myPage.queries";
import * as S from "./myPage.styles";

declare const window: typeof globalThis & {
  IMP: any;
};

const MyPage = () => {
  useAuth();

  const inputRef = useRef<HTMLInputElement>(null);

  const TabMenu = [
    { name: "찜 목록", content: "찜 목록" },
    { name: "장바구니 목록", content: " 장바구니 목록" },
    { name: "구매 목록", content: "구매 목록" },
    { name: "판매 목록", content: "판매 목록" },
  ];

  const { data } =
    useQuery<Pick<IQuery, "fetchUserLoggedIn">>(FETCH_USER_LOGGED_IN);

  const [activeTab, setActiveTab] = useState([true, false, false, false]);

  const [uploadFile] = useMutation<
    Pick<IMutation, "uploadFile">,
    IMutationUploadFileArgs
  >(UPLOAD_FILE);

  const [updateUser] = useMutation<
    Pick<IMutation, "updateUser">,
    IMutationUpdateUserArgs
  >(UPDATE_USER);

  const [createPointTransactionOfLoading] = useMutation<
    Pick<IMutation, "createPointTransactionOfLoading">,
    IMutationCreatePointTransactionOfLoadingArgs
  >(CREATE_POINT_TRANSACTION_OF_LOADING);

  const onClickCharge = () => {
    const IMP = window.IMP;
    console.log(window);
    IMP.init("imp49910675");
    IMP.request_pay(
      {
        // param
        pg: "nice",
        pay_method: "card",
        // merchant_uid: "ORD20180131-0000011",
        name: "포인트",
        amount: 100, // item.price
        buyer_email: "4ggie97@gmail.com",
        buyer_name: "김민겸",
        buyer_tel: "010-6298-6609",
        buyer_addr: "서울특별시 강남구 신사동",
        buyer_postcode: "01181",
        m_redirect_url: `http://localhost:3000/myPage`,
      },
      async (rsp: { success: any; imp_uid: any }) => {
        // callback
        if (rsp.success) {
          // 결제 성공 시 로직,
          console.log(rsp);
          try {
            const result = await createPointTransactionOfLoading({
              variables: { impUid: rsp.imp_uid },
              refetchQueries: [{ query: FETCH_USER_LOGGED_IN }],
            });
            console.log(result);
            alert("결제 요청 완료");
          } catch (error) {
            if (error instanceof Error) console.log(error);
          }
        } else {
          // 결제 실패 시 로직,
        }
      }
    );
  };

  const onChangeActiveTab = (index: number) => () => {
    setActiveTab((prev) => prev.map((_, stateIndex) => index === stateIndex));
  };

  const onUpdateUser = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];

    try {
      const url = await uploadFile({ variables: { file } });
      const picture = String(url.data?.uploadFile.url);
      await updateUser({
        variables: {
          updateUserInput: {
            picture,
            name: data?.fetchUserLoggedIn.name,
          },
        },
        update(cache) {
          cache.modify({ fields: { fetchUserLoggedIn: () => {} } });
        },
      });
      Modal.success({ content: "프로필 이미지가 변경되었습니다." });
    } catch (error) {}
  };

  const onClickImageBox = () => inputRef.current?.click();

  return (
    <>
      <Head>
        <script
          type="text/javascript"
          src="https://code.jquery.com/jquery-1.12.4.min.js"
        ></script>
        {/* iamport.payment.js */}
        <script
          type="text/javascript"
          src="https://cdn.iamport.kr/js/iamport.payment-1.2.0.js"
        ></script>
      </Head>
      <S.Wrapper>
        <S.LeftSideWrapper>
          <S.UserInfo>
            <S.UserImageBox onClick={onClickImageBox}>
              {data?.fetchUserLoggedIn.picture ? (
                <Image
                  width={500}
                  height={500}
                  layout="responsive"
                  src={`https://storage.googleapis.com/${data?.fetchUserLoggedIn.picture}`}
                />
              ) : (
                <S.DefaultImage>프로필 이미지 선택하기</S.DefaultImage>
              )}
              <S.InvisibleInput
                ref={inputRef}
                type="file"
                onChange={onUpdateUser}
              />
            </S.UserImageBox>
            <S.UserName>{data?.fetchUserLoggedIn.name}</S.UserName>
            <S.PointBox>
              보유 포인트{" "}
              <S.Point>{data?.fetchUserLoggedIn.userPoint?.amount}P</S.Point>
            </S.PointBox>
            <Button padding={"0.5rem"} onClick={onClickCharge}>
              충전하기
            </Button>
          </S.UserInfo>
          <S.TabBox>
            <S.TabUl>
              {TabMenu.map((menu, index) => (
                <S.TabLi
                  isActive={activeTab[index]}
                  onClick={onChangeActiveTab(index)}
                  key={index}
                >
                  {menu.name}
                </S.TabLi>
              ))}
            </S.TabUl>
          </S.TabBox>
        </S.LeftSideWrapper>
        <S.Divider></S.Divider>
        <S.RightSideWrapper>
          <S.TabContentBox>
            {TabMenu[activeTab.indexOf(true)].content}
          </S.TabContentBox>
        </S.RightSideWrapper>
      </S.Wrapper>
    </>
  );
};

export default MyPage;
