import React, { ReactElement, ReactNode, useContext } from 'react';

import { ModalContext } from './modal.provider';

type ModalLookup = {
  [key: string]: () => JSX.Element;
};

type ModalManagerProps = {
  modalLookup: ModalLookup;
};

export function ModalManager({ modalLookup }: ModalManagerProps) {
  const { modal } = useContext(ModalContext);
  console.log(modal);
  if (!modal) {
    return null;
  }

  const Modal = modalLookup[modal];

  return <Modal />;
}
