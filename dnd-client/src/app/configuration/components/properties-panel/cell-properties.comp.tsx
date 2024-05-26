import { deleteRoom, selectRoom } from 'app/configuration/store/map.slice';
import { CellDto } from 'app/configuration/types/cell.dto';
import { useAppDispatch, useAppSelector } from 'hooks/redux.hooks';
import React from 'react';
import { RoomDto } from 'types/room.dto';
import RoomProperties from './room-properties.comp';
import { IconButton, Typography } from '@mui/material';
import { Add, PlusOne } from '@mui/icons-material';

type CellPropertiesProps = {
  cell: CellDto;
};

export default function CellProperties({ cell }: CellPropertiesProps) {
  const dispatch = useAppDispatch();
  const rooms = useAppSelector((state) => state.map.rooms);
  const handleRoomDelete = (room: RoomDto) => {
    dispatch(deleteRoom({ room, cell }));
  };

  const handleRoomSelect = (room: RoomDto) => {
    dispatch(selectRoom({ room, cell }));
  };

  const handleAddRoomClick = () => {};

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
      {cell.rooms.map((roomId) => (
        <RoomProperties
          room={rooms[roomId]}
          onRoomDeleteButtonClicked={handleRoomDelete}
          onRoomSelectButtonClicked={handleRoomSelect}
        />
      ))}
    </div>
  );
}
