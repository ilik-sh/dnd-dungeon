import { styled } from '@mui/material';

import { useAppSelector } from 'shared/libs/hooks/redux.hooks';

import { selectMap } from '../../model/store/map/map.selector';
import Panel from '../panel.comp';
import ComponentMenu from './component-menu/component-menu.comp';

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
