import { useState } from 'react';

import { ModalContext } from '../model/modal.context';

type ModalProviderProps = {
  children: any;
};

export default function ModalsProvider({ children }: ModalProviderProps) {
  const [modal, setModal] = useState<string | null>(null);

  const openModal = (modal: string) => {
    setModal(modal);
  };

  const closeModal = () => {
    setModal(null);
  };

  return <ModalContext.Provider value={{ modal, openModal, closeModal }}>{children}</ModalContext.Provider>;
}
