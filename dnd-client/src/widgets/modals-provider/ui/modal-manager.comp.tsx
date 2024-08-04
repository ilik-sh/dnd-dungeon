import { useContext } from 'react';

import { ModalLookup } from 'shared/libs/constants/modal-lookup';

import { ModalContext } from '../model/modal.context';

export default function ModalsManager() {
  const { modal } = useContext(ModalContext);

  if (!modal) {
    return null;
  }

  const Modal = ModalLookup[modal];

  return <Modal />;
}
