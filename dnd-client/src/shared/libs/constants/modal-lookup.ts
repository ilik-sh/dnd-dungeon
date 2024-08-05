import { ImportModal } from 'widgets/import-modal';
import { ImportModelModal } from 'widgets/import-model-modal';
import { ModalLookup as ModalLookupType } from 'widgets/modals-provider';
import { NewProjectModal } from 'widgets/new-project-modal';
import { SignInModal } from 'widgets/sign-in-modal';
import { SignUpModal } from 'widgets/sign-up-modal';

export const ModalLookup: ModalLookupType = {
  ImportModal: ImportModal,
  NewProjectModal: NewProjectModal,
  SignInModal: SignInModal,
  SignUpModal: SignUpModal,
  ImportModelModal: ImportModelModal,
};
