import { addRoom, deleteRoom, selectRoom } from 'app/configuration/store/map.slice';
import { CellDto } from 'app/configuration/types/cell.dto';
import { useAppDispatch, useAppSelector } from 'hooks/redux.hooks';
import React, { useState } from 'react';
import { RoomDto } from 'types/room.dto';
import RoomProperties from './room-properties.comp';
import { IconButton, Typography } from '@mui/material';
import { Add, Hexagon } from '@mui/icons-material';
import { generateDefaultRoom } from 'app/configuration/default-objects/default-room';
import { enqueueSnackbar } from 'notistack';
import { Tab } from '@mui/base/Tab';
import { TabsList } from '@mui/base/TabsList';
import { TabPanel } from '@mui/base/TabPanel';
import { Tabs } from '@mui/base/Tabs';
import { TypeColors } from 'enums/type-colors.enum';
import RoomShowcase from './room/room-showcase.comp';

type CellPropertiesProps = {};

export default function CellProperties({}: CellPropertiesProps) {
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
