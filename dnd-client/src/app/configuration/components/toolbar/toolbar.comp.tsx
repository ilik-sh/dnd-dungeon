import { styled } from '@mui/material/styles';
import { Box, Paper } from '@mui/material';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import { Download, Upload as UploadIcon, Loop } from '@mui/icons-material';
import useDownload from 'hooks/use-download.hook';
import { useAppDispatch, useAppSelector } from 'hooks/redux.hooks';
import { mapSelector } from 'app/configuration/store/map.selector';
import { enqueueSnackbar } from 'notistack';
import { setMap } from 'app/configuration/store/map.slice';
import { useState } from 'react';
import Replace from './tools/replace.comp';
import Upload from './tools/upload.comp';
import { RootState } from 'store';

const ToolbarPaper = styled(Paper)(({ theme }) => ({
  display: 'flex',
  width: '100%',
  padding: '10px',
  alignItems: 'center',
  justifyContent: 'space-between',
}));

export default function Toolbar() {
  const { map } = useAppSelector((state: RootState) => state.map.map);
  const dispatch = useAppDispatch();
  const handleDownload = useDownload(map);
  const [tool, setTool] = useState('');

  const handleUpload = async (data: unknown) => {
    if (!data) {
      enqueueSnackbar('Error uploading map', { variant: 'error' });
    }

    try {
      const map = data;
      dispatch(setMap({ map }));
    } catch (e) {
      console.log(e);
      enqueueSnackbar('Error setting map', { variant: 'error' });
    }
  };

  return (
    <ToolbarPaper elevation={4}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <IconButton>
          <Download></Download>
        </IconButton>
        <IconButton onClick={() => setTool('upload')}>
          <UploadIcon />
        </IconButton>
        <IconButton onClick={() => setTool('replace')}>
          <Loop />
        </IconButton>
      </div>
      <Divider />
      <Box component={'div'}>
        {tool === 'replace' && <Replace />}
        {tool === 'upload' && <Upload onUpload={handleUpload} />}
      </Box>
    </ToolbarPaper>
  );
}
