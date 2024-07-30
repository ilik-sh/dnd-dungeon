import React from 'react';

import { useTheme } from '@mui/material';

import { Tools } from 'pages/map-editor/model/constants/tools';
import { getSelectedTool } from 'pages/map-editor/model/store/tools/tools.selector';
import { setTool } from 'pages/map-editor/model/store/tools/tools.slice';

import { useAppDispatch, useAppSelector } from 'shared/libs/hooks/redux.hooks';
import RoundButton from 'shared/ui/round-button.comp';

import AddCell from '../../assets/icons/add-cell.icon';

type Props = {};

export default function AddCellButton({}: Props) {
  const tool = useAppSelector(getSelectedTool());
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const isSelected = tool === Tools.AddCell;

  const handleClick = () => {
    if (tool !== Tools.AddCell) {
      dispatch(setTool({ tool: Tools.AddCell }));
      return;
    }
    dispatch(setTool({ tool: null }));
  };
  return (
    <RoundButton onClick={handleClick} sx={isSelected ? { backgroundColor: theme.palette.grey[800] } : null}>
      <AddCell sx={isSelected ? { color: theme.palette.primary.main } : null} />
    </RoundButton>
  );
}
