import { styled } from '@mui/material';

import { useAppSelector } from 'shared/libs/hooks/redux.hooks';

import { getSelectedCell } from '../model/store/map/map.selector';
import { isAddCellSelected } from '../model/store/tools/tools.selector';
import AddCellProperties from './add-cell-properties.comp';
import CellProperties from './cell-properties.comp';
import Panel from './panel.comp';

const RightPanel = styled(Panel)({
  right: '0',
});

export default function PropertiesPanel() {
  const selectedCell = useAppSelector(getSelectedCell());
  const isAddCell = useAppSelector(isAddCellSelected());

  if (isAddCell) {
    return (
      <RightPanel>
        <AddCellProperties />
      </RightPanel>
    );
  }

  if (!selectedCell) {
    return null;
  }

  return (
    <RightPanel>
      <CellProperties cell={selectedCell} />
    </RightPanel>
  );
}
