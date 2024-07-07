import React, { SyntheticEvent, useContext, useState } from 'react';

import { Create, KeyboardArrowDown, UploadFile } from '@mui/icons-material';
import { Button, Divider, Menu, MenuItem, styled } from '@mui/material';
import { ModalContext } from 'modules/modals-provider';

const StyledButton = styled(Button)({});

type Props = {};

export default function CreateProjectMenu({}: Props) {
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
    openModal('NewProjectModal');
    handleMenuClose();
  };

  const handleImportClicked = () => {
    openModal('ImportModal');
    handleMenuClose();
  };

  return (
    <>
      <StyledButton variant="contained" color="primary" onClick={handleMenuOpen} endIcon={<KeyboardArrowDown />}>
        Create
      </StyledButton>
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
