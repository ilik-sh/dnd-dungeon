import { CircularProgress, styled } from '@mui/material';

type Props = {};

const CenteredDiv = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
});

export default function CenteredCircularProgress({}: Props) {
  return (
    <CenteredDiv>
      <CircularProgress />
    </CenteredDiv>
  );
}
