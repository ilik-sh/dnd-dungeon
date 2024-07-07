import { useContext } from 'react';

import { Casino, MeetingRoom } from '@mui/icons-material';
import { Box, Dialog, Divider, styled, Typography } from '@mui/material';
import auto from 'app/user/assets/auto.png';
import { ModalContext } from 'modules/modals-provider';

import AutoBox from './components/auto-box';

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
        <StyledBox>
          <StyledIcon />
          <StyledTypography variant="h5"> Let the magic happen</StyledTypography>
          <AutoForm control={control} validationErrors={errors} onSubmit={handleSubmit(onSubmit)} isLoading={false} />
        </StyledBox>
      </ContentBox>
    </Dialog>
  );
}
