import React from 'react';

import { ListItem, ListItemText } from '@mui/material';

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
