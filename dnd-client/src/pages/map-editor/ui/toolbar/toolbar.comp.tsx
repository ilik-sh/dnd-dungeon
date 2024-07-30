import { Box, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

import TitleInput from './title-input.comp';
import AddCellButton from './tools/add-cell.comp';
import AddObjectButton from './tools/add-object.comp';
import AddRowButton from './tools/add-row.comp';
import ProjectMenu from './tools/project-menu.comp';

const ToolbarPaper = styled(Paper)(({ theme }) => ({
  display: 'flex',
  width: '100%',
  alignItems: 'center',
  justifyContent: 'space-between',
  minHeight: 'var(--toolbar-height)',
  borderRadius: '0px',
  zIndex: '2',
}));

const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-around',
  flexGrow: 1,
  padding: theme.spacing(1),
}));

const StyledToolbox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  flexGrow: 1,
  height: '100%',
  padding: '0px',
}));

export default function Toolbar() {
  return (
    <ToolbarPaper>
      <StyledToolbox>
        <ProjectMenu />
        <AddCellButton />
        <AddRowButton />
        <AddObjectButton />
      </StyledToolbox>
      {/* <TitleInput /> */}
      <StyledBox></StyledBox>
    </ToolbarPaper>
  );
}
