import { gql, useMutation, useQuery } from "@apollo/client";
import Head from "next/head";
import {
  IMutation,
  IMutationCreatePointTransactionOfLoadingArgs,
  IQuery,
} from "../../../commons/types/generated/types";
import useAuth from "../../common/useAuth";

const USER_LOGGED_IN = gql`
  query {
    fetchUserLoggedIn {
      _id
      email
      name
      picture
      userPoint {
        amount
      }
    }
  }
`;

export const CREATE_POINT_TRANSACTION_OF_LOADING = gql`
  mutation createPointTransactionOfLoading($impUid: ID!) {
    createPointTransactionOfLoading(impUid: $impUid) {
      _id
      amount
      balance
      status
      statusDetail
      createdAt
      updatedAt
      useditem {
        _id
        name
        remarks
        contents
        soldAt
      }
    }
  }
`;

declare const window: typeof globalThis & {
  IMP: any;
};

const MyPage = () => {
  useAuth();

  const { data } = useQuery<Pick<IQuery, "fetchUserLoggedIn">>(USER_LOGGED_IN);

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
              refetchQueries: [{ query: USER_LOGGED_IN }],
            });
            console.log(result);
            alert("뮤테이션 요청 완료");
          } catch (error) {
            if (error instanceof Error) console.log(error);
          }
        } else {
          // 결제 실패 시 로직,
        }
      }
    );
  };
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
      <div
        style={{
          maxWidth: "1240px",
          width: "100%",
          margin: "0 auto",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div>
          <div>{data?.fetchUserLoggedIn.picture ?? "사진 없음"}</div>
          <div>{data?.fetchUserLoggedIn.name}</div>
          <div>{data?.fetchUserLoggedIn.email}</div>
          <div>Point: {data?.fetchUserLoggedIn.userPoint?.amount}</div>
          <button onClick={onClickCharge}>충전하기</button>
        </div>
      </div>
    </>
  );
};

export default MyPage;
