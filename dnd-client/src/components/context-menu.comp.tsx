import { Menu } from '@mui/material';
import { mapSelector } from 'app/configuration/store/map.selector';
import { closeContextMenu } from 'app/configuration/store/map.slice';
import { useAppDispatch, useAppSelector } from 'hooks/redux.hooks';
import React from 'react';

type ContextMenuProps = {
  children?: React.ReactNode;
};

export default function ContextMenu({ children }: ContextMenuProps) {
  const dispatch = useAppDispatch();
  const { contextMenu } = useAppSelector(mapSelector);

  const handleContextClose = () => {
    dispatch(closeContextMenu());
  };

  return (
    <Menu
      open={contextMenu !== null}
      onClose={handleContextClose}
      anchorReference="anchorPosition"
      anchorPosition={contextMenu !== null ? { top: contextMenu.y, left: contextMenu.x } : undefined}
    >
      {children}
    </Menu>
  );
}
