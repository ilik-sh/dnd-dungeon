import { useState } from 'react';

import { Download as DownloadIcon, Loop, Upload as UploadIcon } from '@mui/icons-material';
import { Box, Paper } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import { enqueueSnackbar } from 'notistack';
import { getSelectedTool } from 'pages/map-editor/model/store/tools/tools.selector';
import { useAppDispatch, useAppSelector } from 'shared/libs/hooks/redux.hooks';

import { setMap } from '../../model/store/map/map.slice';
import AddCell from '../assets/icons/add-cell.icon';
import SwitchRoom from '../assets/icons/switch-room.icon';
import TitleInput from './title-input.comp';
import AddCellButton from './tools/add-cell.comp';
import AddObjectButton from './tools/add-object.comp';
import AddRowButton from './tools/add-row.comp';
import Download from './tools/download.comp';
import ProjectMenu from './tools/project-menu.comp';
import Replace from './tools/replace.comp';
import Upload from './tools/upload.comp';

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
        {/* <IconButton onClick={() => setTool('replace')}>
          <Loop />
        </IconButton> */}
      </StyledToolbox>
      <TitleInput />
      <StyledBox></StyledBox>
    </ToolbarPaper>
  );
}
