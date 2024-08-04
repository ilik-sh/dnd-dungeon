import React from 'react';

import { Hexagon } from '@mui/icons-material';
import { ListItem, ListItemText } from '@mui/material';

type MenuItemProps = {
  title: string;
};

export default function MenuItem({ title }: MenuItemProps) {
  return (
    <ListItem sx={{ paddingLeft: '15%' }}>
      <ListItemText primary={title} color="white" />
    </ListItem>
  );
}
