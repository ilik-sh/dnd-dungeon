import React from 'react';

import { useTheme } from '@mui/material';

import { Tools } from 'pages/map-editor/model/constants/tools';
import { getSelectedTool } from 'pages/map-editor/model/store/tools/tools.selector';
import { setTool } from 'pages/map-editor/model/store/tools/tools.slice';

import { useAppDispatch, useAppSelector } from 'shared/libs/hooks/redux.hooks';
import RoundButton from 'shared/ui/round-button.comp';

import AddRow from '../../assets/icons/add-row.icon';

type Props = {};

export default function AddRowButton({}: Props) {
  const tool = useAppSelector(getSelectedTool());
  const _tool = Tools.AddRow;
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const isSelected = tool == _tool;

  const handleClick = () => {
    if (!isSelected) {
      dispatch(setTool({ tool: _tool }));
      return;
    }
    dispatch(setTool({ tool: null }));
  };

  return (
    <RoundButton onClick={handleClick} sx={isSelected ? { backgroundColor: theme.palette.grey[800] } : null}>
      <AddRow sx={isSelected ? { color: theme.palette.primary.main } : null} />
    </RoundButton>
  );
}
