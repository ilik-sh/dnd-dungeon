import { useState } from 'react';

import { Download as DownloadIcon, Loop, Upload as UploadIcon } from '@mui/icons-material';
import { Box, Paper } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import { setMap } from 'app/configuration/store/map.slice';
import { enqueueSnackbar } from 'notistack';

import { useAppDispatch } from 'hooks/redux.hooks';

import TitleInput from './title-input.comp';
import Download from './tools/download.comp';
import Replace from './tools/replace.comp';
import Upload from './tools/upload.comp';

const ToolbarPaper = styled(Paper)(({ theme }) => ({
  display: 'flex',
  width: '100%',
  alignItems: 'center',
  justifyContent: 'space-between',
  minHeight: 'var(--toolbar-height)',
  borderRadius: '0px',
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
  padding: theme.spacing(1),
}));

export default function Toolbar() {
  const [tool, setTool] = useState('');
  const dispatch = useAppDispatch();

  const handleUpload = async (data: unknown) => {
    if (!data) {
      enqueueSnackbar('Error uploading map', { variant: 'error' });
    }

    try {
      const mapS = data;
      dispatch(setMap({ map: mapS.map, name: mapS.name, rooms: mapS.mapInfo }));
    } catch (e) {
      enqueueSnackbar('Error setting map', { variant: 'error' });
    }
  };

  return (
    <ToolbarPaper>
      <StyledToolbox>
        <IconButton onClick={() => setTool('download')}>
          <DownloadIcon />
        </IconButton>
        <IconButton onClick={() => setTool('upload')}>
          <UploadIcon />
        </IconButton>
        {/* <IconButton onClick={() => setTool('replace')}>
          <Loop />
        </IconButton> */}
      </StyledToolbox>
      <TitleInput />
      <StyledBox>
        {/* {tool === 'replace' && <Replace />} */}
        {tool === 'upload' && <Upload onUpload={handleUpload} />}
        {tool === 'download' && <Download />}
      </StyledBox>
    </ToolbarPaper>
  );
}
