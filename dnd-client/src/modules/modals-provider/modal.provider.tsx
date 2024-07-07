import { createContext, useState } from 'react';

type ModalProviderProps = {
  children: any;
};

type ModalContextType = {
  modal: string | null;
  openModal: (name: string) => void;
  closeModal: () => void;
};

export const ModalContext = createContext<ModalContextType>({
  modal: '',
  openModal: (name: string) => {},
  closeModal: () => {},
});

export const ModalsProvider = ({ children }: ModalProviderProps) => {
  const [modal, setModal] = useState<string | null>(null);
  const openModal = (name: string) => {
    setModal(name);
    console.log(modal);
  };

  const closeModal = () => {
    setModal(null);
  };

  return <ModalContext.Provider value={{ modal, openModal, closeModal }}>{children}</ModalContext.Provider>;
};
