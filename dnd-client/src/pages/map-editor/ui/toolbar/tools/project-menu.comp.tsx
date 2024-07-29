import React, { useState } from 'react';

import { ArrowDownward, Delete, Home, KeyboardArrowDown, Refresh } from '@mui/icons-material';
import { Divider, Menu, MenuItem, styled, useTheme } from '@mui/material';
import { router } from 'App';
import { useDeleteMapMutation } from 'entities/map/api/delete-map.mutation';
import { enqueueSnackbar } from 'notistack';
import { Tools } from 'pages/map-editor/model/constants/tools';
import { selectMapId } from 'pages/map-editor/model/store/map/map.selector';
import { getSelectedTool } from 'pages/map-editor/model/store/tools/tools.selector';
import { setTool } from 'pages/map-editor/model/store/tools/tools.slice';
import Logo from 'shared/assets/icons/logo.icon';
import { useAppDispatch, useAppSelector } from 'shared/libs/hooks/redux.hooks';
import { processReject } from 'shared/libs/utils/proccess-reject';
import RoundButton from 'shared/ui/round-button.comp';

type Props = {};

const DeleteMenuItem = styled(MenuItem)(({ theme }) => ({
  color: theme.palette.error.dark,
  '& .MuiSvgIcon-root': {
    fill: theme.palette.error.dark,
  },
}));

const StyledMenu = styled(Menu)(({ theme }) => ({
  padding: '20px',
}));

export default function ProjectMenu({}: Props) {
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const [menuAnchorElement, setMenuAnchorElement] = useState<null | HTMLElement>(null);
  const open = Boolean(menuAnchorElement);

  const tool = useAppSelector(getSelectedTool());
  const mapId = useAppSelector(selectMapId());
  const [deleteMap, result] = useDeleteMapMutation();

  const isSelected = tool === Tools.ProjectMenu;

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMenuAnchorElement(event.currentTarget);
    if (tool !== Tools.AddObject) {
      dispatch(setTool({ tool: Tools.ProjectMenu }));
      return;
    }
    dispatch(setTool({ tool: null }));
  };

  const handleMenuClose = () => {
    setMenuAnchorElement(null);
    dispatch(setTool({ tool: null }));
  };

  const handleHomeClicked = () => {
    router.navigate('/home');
  };

  const handleRegenerateClicked = () => {};

  const handleDeleteClicked = () => {
    deleteMap(mapId)
      .unwrap()
      .then((response) => {
        enqueueSnackbar('Successfuly deleted map', { variant: 'success' });
        router.navigate('/home');
      })
      .catch((reject) => {
        processReject(reject);
      });
  };

  return (
    <>
      <RoundButton onClick={handleMenuOpen} sx={isSelected ? { backgroundColor: theme.palette.grey[800] } : null}>
        <Logo sx={isSelected ? { color: theme.palette.primary.main } : null} />
        <KeyboardArrowDown fontSize="small" sx={isSelected ? { color: theme.palette.primary.main } : null} />
      </RoundButton>
      <StyledMenu anchorEl={menuAnchorElement} open={open} onClose={handleMenuClose} disableScrollLock>
        <MenuItem onClick={handleHomeClicked}>
          <Home />
          Back home
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleRegenerateClicked}>
          <Refresh />
          Regenerate map
        </MenuItem>
        <DeleteMenuItem onClick={handleDeleteClicked}>
          <Delete />
          Delete
        </DeleteMenuItem>
      </StyledMenu>
    </>
  );
}
