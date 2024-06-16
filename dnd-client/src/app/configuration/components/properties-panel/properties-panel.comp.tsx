import { IconButton, styled } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'hooks/redux.hooks';
import { Close } from '@mui/icons-material';
import { deleteRoom, selectRoom, setSelectedCell } from 'app/configuration/store/map.slice';
import { getSelectedCell, mapSelector } from 'app/configuration/store/map.selector';
import { linear2dSearch } from 'utils/linear2dSearch';
import Panel from '../panel.comp';
import CellProperties from './cell-properties.comp';
import { RoomDto } from 'types/room.dto';

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
