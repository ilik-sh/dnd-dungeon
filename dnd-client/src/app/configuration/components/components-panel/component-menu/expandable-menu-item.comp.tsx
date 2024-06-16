import { Collapse, IconButton, List, ListItem, ListItemButton, ListItemText, styled } from '@mui/material';
import React, { useId, useState } from 'react';
import MenuItem from './menu-item.comp';
import { BorderColor, ExpandLess, ExpandMore } from '@mui/icons-material';
import { CellDto } from 'app/configuration/types/cell.dto';
import { setSelectedCell } from 'app/configuration/store/map.slice';
import { useAppDispatch, useAppSelector } from 'hooks/redux.hooks';
import { amber, grey } from '@mui/material/colors';
import { isCellSelected } from 'app/configuration/store/map.selector';

type ExpandableMenuItemProps = {
  cell: CellDto;
  title?: string;
};

const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  padding: '2px',
  '&:hover': {
    outlineBottom: '1px solid red',
  },
}));

export default function ExpandableMenuItem({ cell, title }: ExpandableMenuItemProps) {
  const [open, setOpen] = useState(false);
  const isSelected = useAppSelector(isCellSelected(cell.id));
  const dispatch = useAppDispatch();
  const id = useId();

  // if (selectectedCellId === cell.id) {
  //   const element = document.getElementById(id);
  //   element?.scrollIntoView();
  // }

  const toggleCollapse = (event: React.MouseEvent) => {
    event.stopPropagation();
    setOpen((prev) => !prev);
  };

  const handleCLick = () => {
    dispatch(setSelectedCell(cell));
  };
  return (
    <>
      <StyledListItemButton
        disableRipple
        sx={isSelected ? { background: grey[800] } : { background: '#212121' }}
        onClick={handleCLick}
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
