export type ModalContextType = {
  modal: string | null;
  openModal: (modal: string) => void;
  closeModal: () => void;
};
