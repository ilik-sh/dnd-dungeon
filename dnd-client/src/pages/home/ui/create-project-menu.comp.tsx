import React, { useContext, useState } from 'react';

import { Create, KeyboardArrowDown, UploadFile } from '@mui/icons-material';
import { Button, Divider, Menu, MenuItem } from '@mui/material';

import { ModalContext } from 'widgets/modals-provider';

import { Modals } from 'shared/libs/constants/modals';

export default function CreateProjectMenu() {
  const [menuAnchorElement, setMenuAnchorElement] = useState<null | HTMLElement>(null);
  const open = Boolean(menuAnchorElement);
  const { openModal } = useContext(ModalContext);

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMenuAnchorElement(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorElement(null);
  };

  const handleNewProjectClicked = () => {
    openModal(Modals.NewProjectModal);
    handleMenuClose();
  };

  const handleImportClicked = () => {
    openModal(Modals.ImportModal);
    handleMenuClose();
  };

  return (
    <>
      <Button variant="contained" color="primary" onClick={handleMenuOpen} endIcon={<KeyboardArrowDown />}>
        Create
      </Button>
      <Menu open={open} anchorEl={menuAnchorElement} onClose={handleMenuClose} disableScrollLock>
        <MenuItem onClick={handleNewProjectClicked}>
          <Create />
          New project
        </MenuItem>
        <Divider></Divider>
        <MenuItem onClick={handleImportClicked}>
          <UploadFile />
          Import from file
        </MenuItem>
      </Menu>
    </>
  );
}