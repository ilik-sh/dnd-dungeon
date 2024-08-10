import { createContext } from 'react';

import { ModalContextType } from './types/modal-context.type';

export const ModalContext = createContext<ModalContextType>({
  modal: '',
  openModal: (modal: string) => {},
  closeModal: () => {},
});
