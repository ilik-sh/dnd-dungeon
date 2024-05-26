import { styled } from '@mui/material';
import { useAppSelector } from 'hooks/redux.hooks';
import { mapSelector } from 'app/configuration/store/map.selector';
import Panel from '../panel.comp';
import ComponentMenu from './component-menu/component-menu.comp';

const LeftPanel = styled(Panel)({
  left: '0',
});

export default function ComponentsPanel() {
  const { map } = useAppSelector(mapSelector);

  return (
    <LeftPanel>
      <ComponentMenu components={map.flat(1)} />
    </LeftPanel>
  );
}
