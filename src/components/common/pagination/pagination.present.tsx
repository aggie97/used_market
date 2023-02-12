import { MouseEvent } from "react";

import {
  Label,
  PaginationLi,
  PaginationUl,
  PaginationWrapper,
  Radio,
} from "./pagination.styles";

import { LeftOutlined, RightOutlined } from "@ant-design/icons";

interface IPaginationUI {
  onClickPageNum: (event: MouseEvent<HTMLInputElement>) => void;
  onClickPrevPage: () => void;
  onClickNextPage: () => void;
  startPage: number;
  lastPage: number;
  isPrevEnd: boolean;
  isNextEnd: boolean;
}

const PaginationUI = ({
  onClickPageNum,
  onClickPrevPage,
  onClickNextPage,
  startPage,
  lastPage,
  isPrevEnd,
  isNextEnd,
}: IPaginationUI) => {
  return (
    <PaginationWrapper>
      <PaginationUl>
        <LeftOutlined
          style={{
            color: isPrevEnd ? "#ddd" : "#222",
          }}
          disabled={isPrevEnd}
          onClick={onClickPrevPage}
        />
        {new Array(10).fill(1).map((_, index) => {
          return (
            startPage + index <= lastPage && (
              <PaginationLi key={index + startPage}>
                <Label htmlFor={String(index + startPage)}>
                  {index + startPage}
                </Label>
                <Radio
                  defaultChecked={index === 0}
                  type="radio"
                  name="pages"
                  id={String(index + startPage)}
                  onClick={onClickPageNum}
                />
              </PaginationLi>
            )
          );
        })}
        <RightOutlined
          style={{
            color: isNextEnd ? "#ddd" : "#222",
          }}
          disabled={isNextEnd}
          onClick={onClickNextPage}
        />
      </PaginationUl>
    </PaginationWrapper>
  );
};

export default PaginationUI;
