import React, { useContext } from 'react';

import { Close } from '@mui/icons-material';
import { Box, Dialog, IconButton, styled, Typography } from '@mui/material';

import { ModalContext } from 'widgets/modals-provider';

const DialogTitleBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  padding: '1rem',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

export default function ImportModelModal() {
  const { closeModal } = useContext(ModalContext);

  const handleClose = () => {
    closeModal();
  };

  return (
    <Dialog open onClose={handleClose}>
      <DialogTitleBox>
        <Typography variant="body1">Import</Typography>
        <IconButton onClick={handleClose}>
          <Close />
        </IconButton>
      </DialogTitleBox>
    </Dialog>
  );
}
