import { useContext } from 'react';

import { Box, Dialog, styled } from '@mui/material';
import { ModalContext } from 'widgets/modals-provider';

import auto from './assets/auto.png';
import AutoBox from './auto-box.comp';

const ContentBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
  },
}));

const ManualBox = styled(Box)(({ theme }) => ({
  display: 'flex',
}));

const StyledImage = styled('img')(({ theme }) => ({
  objectFit: 'cover',
  width: '20rem',
  height: '30rem',
  [theme.breakpoints.down('sm')]: {
    width: '20rem',
    height: '10rem',
  },
}));

export default function NewProjectModal() {
  const { closeModal } = useContext(ModalContext);

  const handleClose = () => {
    closeModal();
  };

  return (
    <Dialog open onClose={handleClose}>
      <ContentBox>
        <ManualBox>
          <StyledImage src={auto}></StyledImage>
        </ManualBox>
        <AutoBox />
      </ContentBox>
    </Dialog>
  );
}
