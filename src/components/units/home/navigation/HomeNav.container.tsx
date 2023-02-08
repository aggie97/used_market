import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { MouseEvent } from "react";
import { useRecoilState } from "recoil";
import { accessTokenState } from "../../../../commons/store";
import { IQuery } from "../../../../commons/types/generated/types";
import HomeNavigationUI, { IIdMenuProps } from "./HomeNav.presenter";

const FETCH_USER_LOGGED_IN = gql`
  query fetchUserLoggedIn {
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

const HomeNavigation = () => {
  const router = useRouter();
  const [token] = useRecoilState(accessTokenState);

  const { data } =
    useQuery<Pick<IQuery, "fetchUserLoggedIn">>(FETCH_USER_LOGGED_IN);
  const menu = [
    {
      id: router.asPath === "/boards" ? "" : "boards",
      menu: router.asPath === "/boards" ? "마켓" : "게시판",
    },
  ];

  const sign: Array<IIdMenuProps | null> = [
    token
      ? {
          id: "market/new",
          menu: "상품 등록",
        }
      : null,
    {
      id: "signIn",
      menu: token ? `${data?.fetchUserLoggedIn.name ?? ""}님` : "로그인",
    },
    {
      id: "signUp",
      menu: token
        ? `Point: ${String(data?.fetchUserLoggedIn.userPoint?.amount)}`
        : "회원가입",
    },
  ];

  const onClickMenu = async (event: MouseEvent<HTMLLIElement>) => {
    await router.push(`/${String(event.currentTarget.id)}`);
  };

  return <HomeNavigationUI menu={menu} sign={sign} onClickMenu={onClickMenu} />;
};

export default HomeNavigation;
