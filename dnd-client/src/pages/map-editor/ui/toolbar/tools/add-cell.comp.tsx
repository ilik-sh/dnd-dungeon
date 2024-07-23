import React from 'react';

import { IconButton, styled, useTheme } from '@mui/material';
import { Tools } from 'pages/map-editor/model/constants/tools';
import { getSelectedTool } from 'pages/map-editor/model/store/tools/tools.selector';
import { setTool } from 'pages/map-editor/model/store/tools/tools.slice';
import { useAppDispatch, useAppSelector } from 'shared/libs/hooks/redux.hooks';

import AddCell from '../../assets/icons/add-cell.icon';

type Props = {};

const RoundButton = styled(IconButton)(({ theme }) => ({
  borderRadius: '1px',
  height: '100%',
  aspectRatio: '1/1',
}));

export default function AddCellButton({}: Props) {
  const tool = useAppSelector(getSelectedTool());
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const handleClick = () => {
    if (tool !== Tools.AddCell) {
      dispatch(setTool({ tool: Tools.AddCell }));
      return;
    }
    dispatch(setTool({ tool: null }));
  };
  return (
    <RoundButton
      onClick={handleClick}
      sx={tool === Tools.AddCell ? { backgroundColor: theme.palette.grey[800] } : null}
    >
      <AddCell sx={tool === Tools.AddCell ? { color: theme.palette.primary.main } : null} />
    </RoundButton>
  );
}
