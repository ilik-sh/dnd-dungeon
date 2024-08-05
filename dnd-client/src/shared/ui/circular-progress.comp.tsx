import { Cancel, PlayArrow } from '@mui/icons-material';
import { Box, CircularProgress, CircularProgressProps, IconButton, Typography } from '@mui/material';

type CircularProgressWithLabelProps = {} & CircularProgressProps;

export default function CircularProgressWithLabel({ props }: CircularProgressWithLabelProps) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant="determinate" {...props} />
    </Box>
  );
}
