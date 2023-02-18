import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { cartItemsState } from "../../../../commons/store";
import { IUseditem } from "../../../../commons/types/generated/types";

const SideCartItemList = () => {
  const [items, setItems] = useRecoilState(cartItemsState);
  useEffect(() => {
    const savedItems = JSON.parse(localStorage.getItem("useditems") ?? "[]");
    setItems(savedItems);
  }, []);

  const router = useRouter();

  return (
    <div>
      {items.map((item: IUseditem) => (
        <SideCartItemWrapper
          onClick={async () => await router.push(`/market/${item._id}`)}
          key={item._id}
        >
          <img
            width={50}
            height={50}
            src={`https://storage.googleapis.com/${item.images?.[0] ?? ""}`}
          />
        </SideCartItemWrapper>
      ))}
    </div>
  );
};

export default SideCartItemList;

const SideCartItemWrapper = styled.div`
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid deepskyblue;
  cursor: pointer;
  transition: all ease 0.2s;
  &:hover {
    opacity: 0.7;
    transform: scale(1.1);
  }
`;
