import { DragEvent, useContext, useId } from 'react';

import { Close } from '@mui/icons-material';
import { alpha, Box, Button, Dialog, Divider, IconButton, styled, Typography, useTheme } from '@mui/material';

import { ModalContext } from 'widgets/modals-provider';

const StyledDialog = styled(Dialog)(({ theme }) => ({}));

const StyledBox = styled(Box)({
  padding: '1rem',
});

const DialogTitleBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  padding: '1rem',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

const TextBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginBottom: '20px',
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  borderRadius: '0',
}));

const DropBox = styled(Box)(({ theme }) => ({
  padding: '100px',
  border: `3px dashed ${theme.palette.divider}`,
}));

const StyledInput = styled('input')(({ theme }) => ({
  display: 'none',
}));

const StyledButton = styled(Button)(({ theme }) => ({
  cursor: 'default',
}));

export default function ImportModal() {
  const { closeModal } = useContext(ModalContext);
  const id = useId();
  const uploadId = useId();
  const theme = useTheme();

  const handleClose = () => {
    closeModal();
  };

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const dropBox = document.getElementById(id);
    if (dropBox) {
      dropBox.style.background = alpha(theme.palette.primary.light, 0.4);
      dropBox.style.border = `3px solid ${theme.palette.primary.light}`;
    }
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const dropBox = document.getElementById(id);
    if (dropBox) {
      dropBox.style.background = 'transparent';
      dropBox.style.border = `3px dashed ${theme.palette.divider}`;
    }
  };

  const handleDrop = (e: DragEvent) => {};

  return (
    <StyledDialog
      open
      onClose={handleClose}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <DialogTitleBox>
        <Typography variant="body1">Import</Typography>
        <StyledIconButton onClick={handleClose}>
          <Close />
        </StyledIconButton>
      </DialogTitleBox>
      <Divider />
      <StyledBox>
        <DropBox
          id={id}
          onDrop={(e) => {
            e.preventDefault();
            console.log('change');
          }}
        >
          <TextBox>
            <Typography variant="body1" fontWeight={600}>
              Bring your dungeon here
            </Typography>
            <Typography variant="body2">Import JSON file that contains map information</Typography>
          </TextBox>

          <StyledButton variant="contained" fullWidth>
            <label htmlFor={uploadId}>
              Choose file from computer
              <StyledInput type="file" id={uploadId}></StyledInput>
            </label>
          </StyledButton>
        </DropBox>
      </StyledBox>
    </StyledDialog>
  );
}
