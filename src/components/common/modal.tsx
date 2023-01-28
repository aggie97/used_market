import styled from "@emotion/styled";

interface IMyModalProps {
  children: JSX.Element;
  title: string;
  onClickModalWrapper: () => void;
  onToggleModal: () => void;
}

const MyModal = (props: IMyModalProps) => {
  return (
    <>
      <ModalWrapper id="wrapper" onClick={props.onClickModalWrapper}>
        <Modal>
          <ModalTitle>{props.title}</ModalTitle>
          <ModalMain>{props.children}</ModalMain>
          <ModalFooter>
            <ModalCancelButton onClick={props.onToggleModal}>
              Cancel
            </ModalCancelButton>
            <ModalOKButton onClick={props.onToggleModal}>Ok</ModalOKButton>
          </ModalFooter>
        </Modal>
      </ModalWrapper>
    </>
  );
};

export default MyModal;

const ModalWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease;
`;

const Modal = styled.div`
  width: 600px;
  height: 250px;
  margin-bottom: 20vh;
  display: flex;
  flex-direction: column;
  background-color: white;
  & > * {
    width: 100%;
    padding: 1rem 1.5rem;
  }
  border-radius: 10px;
`;

const ModalTitle = styled.div`
  font-size: 2em;
  font-weight: 500;
  background-color: #c313c3;
  color: white;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

const ModalMain = styled.div`
  min-height: 100px;
  height: 100%;
  font-size: 1.5em;
  font-weight: 400;
  display: flex;
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;

  gap: 20px;
`;

const ModalOKButton = styled.button`
  color: white;
  background-color: #990f99;
  border: 1px solid #990f99;
  padding: 0.5em;
  width: 120px;
  border-radius: 5px;
  font-size: 1.2em;

  cursor: pointer;
`;
const ModalCancelButton = styled.button`
  border: 1px solid #990f99;
  background-color: white;
  padding: 0.5em;
  font-size: 1.2em;
  width: 120px;
  border-radius: 5px;
  transition: all 0.3s ease-in-out;

  cursor: pointer;
`;
