import React from 'react';

import { useTheme } from '@mui/material';

import { Tools } from 'pages/map-editor/model/constants/tools';
import { getSelectedTool } from 'pages/map-editor/model/store/tools/tools.selector';
import { setTool } from 'pages/map-editor/model/store/tools/tools.slice';

import { useAppDispatch, useAppSelector } from 'shared/libs/hooks/redux.hooks';
import RoundButton from 'shared/ui/round-button.comp';

import AddObject from '../../assets/icons/add-object';

type Props = {};

export default function AddObjectButton({}: Props) {
  const tool = useAppSelector(getSelectedTool());
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const isSelected = tool === Tools.AddObject;

  const handleClick = () => {
    if (tool !== Tools.AddObject) {
      dispatch(setTool({ tool: Tools.AddObject }));
      return;
    }
    dispatch(setTool({ tool: null }));
  };
  return (
    <RoundButton onClick={handleClick} sx={isSelected ? { backgroundColor: theme.palette.grey[800] } : null}>
      <AddObject sx={isSelected ? { color: theme.palette.primary.main } : null} />
    </RoundButton>
  );
}
