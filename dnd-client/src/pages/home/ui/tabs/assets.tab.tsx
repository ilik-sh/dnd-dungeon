import React, { useContext } from 'react';

import { Terrain, ViewInAr } from '@mui/icons-material';
import { Box, Button, styled, Typography } from '@mui/material';

import { ModalContext } from 'widgets/modals-provider';

import { Modals } from 'shared/libs/constants/modals';

type Props = {};

const ImportBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '1rem',
}));

const TextureButton = styled(Button)(({ theme }) => ({
  padding: '0.5rem',
}));

const ModelButton = styled(Button)(({ theme }) => ({
  padding: '0.5rem',
}));

const TextBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
}));

export default function AssetsTab({}: Props) {
  const { openModal } = useContext(ModalContext);

  const openModelImport = () => {
    openModal(Modals.ImportModelModal);
  };

  return (
    <ImportBox>
      <TextureButton fullWidth color="secondary" variant="contained" startIcon={<Terrain />}>
        Texture
      </TextureButton>
      <ModelButton fullWidth color="secondary" variant="contained" startIcon={<ViewInAr />} onClick={openModelImport}>
        Model
      </ModelButton>
    </ImportBox>
  );
}
