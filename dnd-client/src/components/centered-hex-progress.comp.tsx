import { Box, CircularProgress, keyframes, styled } from '@mui/material';

const CenteredDiv = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100dvh',
});

const Hex = styled(Box)(({ theme }) => ({
  width: '7dvh',
  height: '7dvh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: theme.palette.primary.main,
  overflow: 'hidden',
  clipPath: 'polygon(0% 50%, 25% 95%, 75% 95%, 100% 50%,  75% 5%, 25% 5% )',
  // clipPath: 'polygon( 50% 0%, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%)',
}));

const InnerHex = styled(Hex)({
  width: '90%',
  height: '90%',
  position: 'relative',
});

const rotateAnimation = keyframes`
  0% {
    transform: translateX( -50% ) rotate( 0deg )
  }
  100% {
    transform: translateX( -50% ) rotate( -360deg )
  }
`;

const InnerShape = styled(Box)(({ theme }) => ({
  width: '150%',
  height: '150%',
  position: 'absolute',
  top: '50%',
  left: '50%',
  background: theme.palette.background.paper,
  animation: `${rotateAnimation} 1.3s infinite cubic-bezier(0.645, 0.045, 0.355, 1.000)`,
  transformOrigin: 'center top',
}));

export default function CenteredCircularProgress() {
  return (
    <CenteredDiv>
      <Hex>
        <InnerHex>
          <InnerShape />
        </InnerHex>
      </Hex>
    </CenteredDiv>
  );
}
