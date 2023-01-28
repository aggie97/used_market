import { MouseEvent, useState } from "react";
import PaginationUI from "./pagination.present";

interface IPaginationProps {
  count?: number;
  refetch: any;
}

const Pagination = ({ count, refetch }: IPaginationProps) => {
  const [startPage, setStartPage] = useState(1);
  const [isPrevEnd, setIsPrevEnd] = useState(true);
  const [isNextEnd, setIsNextEnd] = useState(false);

  const lastPage = count != null ? Math.ceil(count / 10) : 0;

  const onClickPrevPage = () => {
    if (startPage === 1) return;
    if (startPage === 11) setIsPrevEnd(true);
    setIsNextEnd(false);
    setStartPage((prev) => {
      if (prev <= 10) return prev;
      return prev - 10;
    });
    refetch({ page: startPage - 10 });
  };

  const onClickNextPage = async () => {
    if (Math.ceil(startPage / 10) === Math.ceil(lastPage / 10)) return;
    setIsPrevEnd(false);
    if (startPage + 10 <= lastPage) {
      setStartPage((prev) => prev + 10);
    }
    if (startPage + 20 > lastPage) setIsNextEnd(true);
    refetch({ page: startPage + 10 });
  };

  const onClickPageNum = async (event: MouseEvent<HTMLInputElement>) => {
    await refetch({ page: Number(event.currentTarget.id) });
  };

  return (
    <PaginationUI
      onClickPageNum={onClickPageNum}
      onClickPrevPage={onClickPrevPage}
      onClickNextPage={onClickNextPage}
      startPage={startPage}
      lastPage={lastPage}
      isPrevEnd={isPrevEnd}
      isNextEnd={isNextEnd}
    />
  );
};

export default Pagination;
