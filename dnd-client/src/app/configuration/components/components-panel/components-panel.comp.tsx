import { styled } from '@mui/material';
import { useAppSelector } from 'hooks/redux.hooks';
import { mapSelector, selectMap } from 'app/configuration/store/map.selector';
import Panel from '../panel.comp';
import ComponentMenu from './component-menu/component-menu.comp';
import { useMemo } from 'react';

const LeftPanel = styled(Panel)({
  left: '0',
});

export default function ComponentsPanel() {
  const map = useAppSelector(selectMap());

  return (
    <LeftPanel>
      <ComponentMenu components={map.flat(1)} />
    </LeftPanel>
  );
}
