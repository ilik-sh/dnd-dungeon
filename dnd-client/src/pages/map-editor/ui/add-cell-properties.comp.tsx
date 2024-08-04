import { Add } from '@mui/icons-material';
import { IconButton, Typography } from '@mui/material';

import RoomShowcase from '../../../entities/room/ui/room-properties/room-showcase.comp';
import { CellDto } from 'entities/cell';
import { RoomDto } from 'entities/room';

import { useAppDispatch, useAppSelector } from 'shared/libs/hooks/redux.hooks';

import { generateDefaultRoom } from '../model/default-objects/default-room';
import { cellSelector, roomsSelector } from '../model/store/add-cell/add-cell.selector';
import { addRoom, deleteRoom, selectRoom, updateRoom } from '../model/store/add-cell/add-cell.slice';
import { getCellRooms } from '../model/store/map/map.selector';

type CellPropertiesProps = {};

export default function AddCellProperties({}: CellPropertiesProps) {
  const dispatch = useAppDispatch();
  const roomsDictionary = useAppSelector(roomsSelector);
  const cell = useAppSelector(cellSelector);

  const rooms = Object.keys(roomsDictionary).map((key) => {
    return roomsDictionary[key];
  });

  const handleAddRoomClick = () => {
    const defaultRoom = generateDefaultRoom();
    dispatch(addRoom({ room: defaultRoom }));
  };

  const handleDelete = (room: RoomDto) => {
    dispatch(deleteRoom({ room }));
  };

  const handleSelect = (room: RoomDto) => {
    dispatch(selectRoom({ room }));
  };

  const handleUpdate = (room: RoomDto) => {
    dispatch(updateRoom({ room }));
  };

  return (
    <div style={{ outline: '1px solid grey', padding: '10px' }}>
      <Typography variant="h6">Adding cell</Typography>
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
      <RoomShowcase
        cell={cell}
        rooms={rooms}
        updateAction={handleUpdate}
        selectAction={handleSelect}
        deleteAction={handleDelete}
      />
    </div>
  );
}
