import { Close } from '@mui/icons-material';
import { IconButton, styled } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'shared/libs/hooks/redux.hooks';
import { linear2dSearch } from 'shared/libs/utils/linear2dSearch';
import { RoomDto } from 'shared/model/types/room.dto';

import { getSelectedCell, mapSelector } from '../model/store/map/map.selector';
import { deleteRoom, selectRoom, setSelectedCell } from '../model/store/map/map.slice';
import CellProperties from './cell-properties.comp';
import Panel from './panel.comp';

const RightPanel = styled(Panel)({
  right: '0',
});

export default function PropertiesPanel() {
  const selectedCell = useAppSelector(getSelectedCell());

  if (!selectedCell) {
    return null;
  }

  return (
    <RightPanel>
      <CellProperties cell={selectedCell} />
    </RightPanel>
  );
}
