import { ListItem, ListItemText } from '@mui/material';
import React from 'react';

type MenuItemProps = {
  title: string;
};

export default function MenuItem({ title }: MenuItemProps) {
  return (
    <ListItem button>
      <ListItemText primary={title} color="white" />
    </ListItem>
  );
}
