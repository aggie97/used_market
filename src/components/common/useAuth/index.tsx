import { Modal } from "antd";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import getAccessToken from "../../../commons/libraries/getAccessToken";
import { accessTokenState } from "../../../commons/store";

const useAuth = () => {
  const router = useRouter();
  const [token] = useRecoilState(accessTokenState);
  useEffect(() => {
    if (!token) {
      void getAccessToken().then((newAccessToken) => {
        if (!newAccessToken) {
          Modal.error({ content: "로그인 후 이용 가능합니다." });
          void router.push("/signIn");
        }
      });
    }
  }, []);
};

export default useAuth;
