import { Add } from '@mui/icons-material';
import { IconButton, Typography } from '@mui/material';

import { CellDto } from 'entities/cell';

import { useAppDispatch } from 'shared/libs/hooks/redux.hooks';

import { generateDefaultRoom } from '../model/default-objects/default-room';
import { addRoom } from '../model/store/map/map.slice';
import RoomShowcase from './room-properties/room-showcase.comp';

type CellPropertiesProps = {
  cell: CellDto;
};

export default function CellProperties({ cell }: CellPropertiesProps) {
  const dispatch = useAppDispatch();

  const handleAddRoomClick = () => {
    const defaultRoom = generateDefaultRoom();
    dispatch(addRoom({ room: defaultRoom }));
  };

  return (
    <div style={{ outline: '1px solid grey', padding: '10px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6">Rooms</Typography>
        <IconButton
          onClick={handleAddRoomClick}
          sx={{
            borderRadius: '0',
          }}
        >
          <Add />
        </IconButton>
      </div>
      <RoomShowcase />
    </div>
  );
}
