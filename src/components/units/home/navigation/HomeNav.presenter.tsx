import { MouseEvent } from "react";
import {
  Wrapper,
  WrapperInner,
  WrapperInnerLeft,
  WrapperInnerRight,
} from "./HomeNav.styles";

export interface IIdMenuProps {
  id: string;
  menu: string;
}

interface INavProps {
  onClickMenu: (event: MouseEvent<HTMLLIElement>) => void;
  menu: IIdMenuProps[];
  sign: Array<IIdMenuProps | null>;
}

const HomeNavigationUI = ({ menu, onClickMenu, sign }: INavProps) => {
  return (
    <>
      <Wrapper>
        <WrapperInner>
          <WrapperInnerLeft>
            <ul style={{ display: "flex", listStyle: "none", gap: "20px" }}>
              {menu.map((el) => (
                <li key={el.id} id={el.id} onClick={onClickMenu}>
                  {el.menu}
                </li>
              ))}
            </ul>
          </WrapperInnerLeft>
          <WrapperInnerRight>
            <ul style={{ display: "flex", listStyle: "none", gap: "20px" }}>
              {sign.map(
                (el) =>
                  el === null || (
                    <li key={el.id} id={el.id} onClick={onClickMenu}>
                      {el.menu}
                    </li>
                  )
              )}
            </ul>
          </WrapperInnerRight>
        </WrapperInner>
      </Wrapper>
    </>
  );
};

export default HomeNavigationUI;
