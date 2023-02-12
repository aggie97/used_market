import {
  Wrapper,
  InputBox,
  TextareaBox,
  AddressBox,
  PictureBox,
  MainSettingBox,
  SubmitBox,
  AddressModal,
  AddressSearchInput,
  Picture,
} from "./BoardRegister.styles";
import styled from "@emotion/styled";
import { IProps } from "./BoardRegister.types";
import { uniqueId } from "lodash";
import { styleSet } from "../../../../commons/styles/globalStyles";
import Button from "../../../common/button";

const BoardRegisterUI = ({
  onCompleteAddressSearch,
  onClickAddressSearch,
  onCloseModal,
  onClickPicture,
  onChangeInput,
  submitForm,
  editForm,
  isOpen,
  isEmpty,
  isEdit,
  input,
  data,
  imageRef,
}: IProps) => {
  return (
    <>
      {isOpen && (
        <AddressModal open={true} onCancel={onCloseModal}>
          <AddressSearchInput onComplete={onCompleteAddressSearch} />
        </AddressModal>
      )}
      <Wrapper onSubmit={isEdit ? editForm : submitForm}>
        <h1>게시물 {isEdit ? "수정" : "등록"}</h1>
        <div>
          <InputBox>
            <span>작성자</span>
            <Input
              id="writer"
              type="text"
              placeholder="이름을 적어주세요."
              isEmpty={isEmpty}
              onChange={onChangeInput}
              defaultValue={data?.fetchBoard?.writer ?? ""}
            />
          </InputBox>
          <InputBox>
            <span>비밀번호</span>
            <Input
              id="password"
              isEmpty={isEmpty}
              type="password"
              placeholder="비밀번호를 입력해주세요."
              onChange={onChangeInput}
            />
          </InputBox>
        </div>
        <InputBox>
          <span>제목</span>
          <Input
            id="title"
            isEmpty={isEmpty}
            type="text"
            placeholder="제목을 작성해주세요."
            onChange={onChangeInput}
            defaultValue={data?.fetchBoard?.title}
          />
        </InputBox>
        <TextareaBox>
          <span>내용</span>
          <TextArea
            id="contents"
            placeholder="내용을 작성해주세요."
            isEmpty={isEmpty}
            onChange={onChangeInput}
            defaultValue={data?.fetchBoard?.contents}
          />
        </TextareaBox>
        <AddressBox>
          <span>주소</span>
          <div>
            <Input
              id="zipcode"
              type="text"
              readOnly
              placeholder="07250"
              value={
                input.zipcode || (data?.fetchBoard?.boardAddress?.zipcode ?? "")
              }
            />
            <button type="button" onClick={onClickAddressSearch}>
              우편번호 검색
            </button>
          </div>
          <Input
            id="address"
            type="text"
            readOnly
            placeholder="주소를 입력해주세요."
            value={
              input.address || (data?.fetchBoard?.boardAddress?.address ?? "")
            }
          />
          <div></div>
          <Input
            id="addressDetail"
            type="text"
            placeholder="상세 주소를 입력해주세요."
            onChange={onChangeInput}
            defaultValue={data?.fetchBoard?.boardAddress?.addressDetail ?? ""}
          />
        </AddressBox>
        <InputBox>
          <span>유튜브</span>
          <Input
            id="youtubeLink"
            type="text"
            placeholder="링크를 적어주세요."
            onChange={onChangeInput}
            defaultValue={data?.fetchBoard?.youtubeUrl ?? ""}
          />
        </InputBox>
        <PictureBox>
          <span>사진 첨부</span>
          <div>
            {new Array(3).fill(1).map((_, i) => (
              <>
                <Picture onClick={onClickPicture} key={uniqueId()}>
                  {input.images?.[i] ? (
                    <img
                      width={78}
                      height={78}
                      src={`https://storage.googleapis.com/${input.images[i]}`}
                    />
                  ) : (
                    "+"
                  )}
                </Picture>
                <input
                  ref={imageRef}
                  type="file"
                  id="images"
                  onChange={onChangeInput}
                  style={{ display: "none" }}
                />
              </>
            ))}
          </div>
        </PictureBox>
        <MainSettingBox>
          <p>메인 설정</p>
          <div>
            <div>
              <input name="option" type="radio" />
              <label>유튜브</label>
            </div>
            <div>
              <input name="option" type="radio" />
              <label>사진</label>
            </div>
          </div>
          <div></div>
        </MainSettingBox>
        <SubmitBox>
          <Button width="10rem" padding="1rem">
            {isEdit ? "수정하기" : "등록하기"}
          </Button>
        </SubmitBox>
      </Wrapper>
    </>
  );
};

export default BoardRegisterUI;

interface IStyle {
  isEmpty?: boolean;
}

const Input = styled.input`
  outline: none;

  &::placeholder {
    ${(props: IStyle) => (props.isEmpty ? "color: red;" : "color: #bdbdbd")};
  }
`;

const TextArea = styled(Input.withComponent("textarea"))`
  background: #fff;
  height: 480px;
  padding: 14px;
  border: 1px solid #bdbdbd;
  resize: none;
  transition: border 0.3s ease;
  :focus {
    border: 1px solid ${styleSet.mainColor};
  }
`;
