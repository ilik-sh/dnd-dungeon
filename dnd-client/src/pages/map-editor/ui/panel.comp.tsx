import React, { ReactNode } from 'react';

import { Box, styled } from '@mui/material';

type PanelProps = {
  children: ReactNode;
};

const PanelContainer = styled(Box)({
  position: 'absolute',
  top: '0',
  bottom: '0',
  overflow: 'hidden',
  width: '250px',
});

const PropertiesPanelVisible = styled(Box)(() => ({
  position: 'absolute',
  right: '0',
  bottom: '0',
  left: '0',
  top: 'var(--toolbar-height)',
}));

const PanelContent = styled(Box)(({ theme }) => ({
  height: '100%',
  background: theme.palette.background.paper,
  overflowY: 'auto',
  borderTop: '1px solid',
  borderColor: theme.palette.divider,
  padding: '0',
}));

export default function Panel({ children, ...restProps }: PanelProps) {
  return (
    <PanelContainer {...restProps}>
      <PropertiesPanelVisible>
        <PanelContent>{children}</PanelContent>
      </PropertiesPanelVisible>
    </PanelContainer>
  );
}
