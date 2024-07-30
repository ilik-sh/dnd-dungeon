import React, { useId, useState } from 'react';

import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Collapse, IconButton, List, ListItemButton, ListItemText, styled, useTheme } from '@mui/material';

import { isHoveringOverObject } from 'pages/map-editor/model/store/hover/hover.selector';
import { setHoveringElement } from 'pages/map-editor/model/store/hover/hover.slice';

import { CellDto } from 'entities/cell/model/types/cell.dto';

import { useAppDispatch, useAppSelector } from 'shared/libs/hooks/redux.hooks';

import { isCellSelected } from '../../../model/store/map/map.selector';
import { setSelectedCell } from '../../../model/store/map/map.slice';
import MenuItem from './menu-item.comp';

type ExpandableMenuItemProps = {
  cell: CellDto;
  title?: string;
};

const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  padding: '2px',
  '&:hover': {
    outlineOffset: '-2px',
    outline: '1px solid dodgerBlue',
  },
}));

export default function ExpandableMenuItem({ cell, title }: ExpandableMenuItemProps) {
  const [open, setOpen] = useState(false);

  const isSelected = useAppSelector(isCellSelected(cell.id));
  const dispatch = useAppDispatch();
  const isHovering = useAppSelector(isHoveringOverObject(cell.id));

  const theme = useTheme();
  const id = useId();

  const toggleCollapse = (event: MouseEvent) => {
    event.stopPropagation();
    setOpen((prev) => !prev);
  };

  const handlePointerEnter = (e: MouseEvent) => {
    e.stopPropagation();
    dispatch(setHoveringElement({ hoveringElementId: cell.id }));
  };

  const handlePointerOut = (e: MouseEvent) => {
    e.stopPropagation();
    dispatch(setHoveringElement({ hoveringElementId: '' }));
  };

  const handleCLick = () => {
    dispatch(setSelectedCell(cell));
  };

  return (
    <>
      <StyledListItemButton
        disableRipple
        sx={{
          background: isSelected ? theme.palette.grey[800] : '',
          outlineOffset: isHovering ? '-2px' : '',
          outline: isHovering ? '1px solid' : '',
          outlineColor: isHovering ? theme.palette.secondary.main : '',
        }}
        onClick={handleCLick}
        onMouseOver={handlePointerEnter}
        onMouseOut={handlePointerOut}
        id={id}
      >
        <IconButton disableRipple onClick={toggleCollapse}>
          {open ? <ExpandLess /> : <ExpandMore />}
        </IconButton>
        <ListItemText primary={title ? title : cell.id} color="white" />
      </StyledListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {cell.rooms.map((item, index) => (
            <MenuItem title={item} key={index}></MenuItem>
          ))}
        </List>
      </Collapse>
    </>
  );
}
