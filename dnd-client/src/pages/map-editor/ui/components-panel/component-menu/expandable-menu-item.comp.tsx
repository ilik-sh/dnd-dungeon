import React, { MouseEvent, PointerEvent, useId, useState } from 'react';

import { ArrowRight } from '@mui/icons-material';
import { alpha, Collapse, IconButton, List, ListItemButton, ListItemText, styled, useTheme } from '@mui/material';

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
}));

const NoHoverIconButton = styled(IconButton)(({ theme }) => ({
  '&:hover': {
    background: 'none',
  },
}));

export default function ExpandableMenuItem({ cell, title }: ExpandableMenuItemProps) {
  const [open, setOpen] = useState(false);

  const isSelected = useAppSelector(isCellSelected(cell.id));
  const dispatch = useAppDispatch();

  const theme = useTheme();
  const id = useId();

  const toggleCollapse = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setOpen((prev) => !prev);
  };

  const handlePointerEnter = (e: PointerEvent<HTMLDivElement>) => {
    e.stopPropagation();
    dispatch(setHoveringElement({ hoveringElementId: cell.id }));
  };

  const handlePointerOut = (e: PointerEvent<HTMLDivElement>) => {
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
          background: isSelected ? alpha(theme.palette.primary.light, 0.7) : '',
          '&:hover': {
            background: isSelected ? alpha(theme.palette.primary.light, 0.7) : theme.palette.grey[800],
          },
        }}
        onClick={handleCLick}
        onPointerOver={handlePointerEnter}
        onPointerOut={handlePointerOut}
        id={id}
      >
        <NoHoverIconButton disableTouchRipple onClick={toggleCollapse} size="small">
          <ArrowRight
            sx={{
              rotate: open ? '90deg' : '',
              transition: 'rotate 0.1s ease-in-out',
            }}
          />
        </NoHoverIconButton>
        <ListItemText primary={title ? title : cell.id} color="white" />
      </StyledListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {cell.rooms.map((item, index) => (
            <MenuItem title={'Room ' + (index + 1)} key={index}></MenuItem>
          ))}
        </List>
      </Collapse>
    </>
  );
}
