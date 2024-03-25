import { FC, ReactNode, useState } from "react";

interface ModalProps {
  closeModal?: () => void;
  open?: boolean;
  children: ReactNode
}

export const Modal: FC<ModalProps> = ({
  children,
  open = false,
  closeModal = () => undefined
}) => {
  return (
    <>
      {open ? (
        <>
          <div
            onClick={closeModal}
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl z-60">
              {children}
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}

export const useModal = () => {
  const [open, setOpen] = useState(false);

  const closeModal = () => {
    setOpen(false);
  };

  const openModal = () => {
    setOpen(true);
  };

  const toggleModal = () => {
    setOpen(!open);
  };

  const modalProps = {
    open,
    closeModal,
  };

  return { closeModal, openModal, toggleModal, modalProps };
};