import { enqueueSnackbar } from 'notistack';

export function processReject(reject: any) {
  if (!reject.data) {
    enqueueSnackbar('Unknown error', { variant: 'error' });
    return;
  }
  if (Array.isArray((reject as any).data.errors)) {
    (reject as any).data.errors.map((reject) => {
      enqueueSnackbar(reject, { variant: 'error' });
    });
  }
}
