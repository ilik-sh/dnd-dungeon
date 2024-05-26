import { IconButton, styled } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'hooks/redux.hooks';
import { Close } from '@mui/icons-material';
import { deleteRoom, selectRoom, setSelectedCell } from 'app/configuration/store/map.slice';
import { mapSelector } from 'app/configuration/store/map.selector';
import { linear2dSearch } from 'utils/linear2dSearch';
import Panel from '../panel.comp';
import CellProperties from './cell-properties.comp';
import { RoomDto } from 'types/room.dto';

const RightPanel = styled(Panel)({
  right: '0',
});
const StyledButton = styled(Close)({
  width: '40px',
  height: '40px',
});

export default function PropertiesPanel() {
  const { selectedCellId, map } = useAppSelector(mapSelector);
  const selectedCell = linear2dSearch(map, selectedCellId);

  if (!selectedCell) {
    return null;
  }

  return (
    <RightPanel>
      <CellProperties cell={selectedCell} />
    </RightPanel>
  );
}
