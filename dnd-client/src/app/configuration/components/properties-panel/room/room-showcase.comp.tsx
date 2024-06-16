import { Tabs, TabsList, Tab, TabPanel } from '@mui/base';
import { Check, Close, Hexagon } from '@mui/icons-material';
import { TypeColors } from 'enums/type-colors.enum';
import RoomProperties from './room-properties.comp';
import { useAppDispatch, useAppSelector } from 'hooks/redux.hooks';
import { getSelectedCell, roomsSelector } from 'app/configuration/store/map.selector';
import { deleteRoom, selectRoom } from 'app/configuration/store/map.slice';
import { enqueueSnackbar } from 'notistack';
import { RoomDto } from 'types/room.dto';
import { Box, IconButton, styled } from '@mui/material';

import Scrollable from 'components/hoc/scrollable.comp';
import { BaseSyntheticEvent, useState } from 'react';

type RoomShowcaseProps = {};

const StyledTabsList = styled(TabsList)({
  display: 'flex',
  justifyContent: 'space-evenly',
});

const StyledTab = styled(Tab)(({ theme }) => ({
  position: 'relative',
  padding: '1px 6px',
  border: 'none',
  background: 'transparent',
  borderRadius: '10px',
  '&:hover': {
    background: '#00000030',
    '&>button': {
      visibility: 'visible',
    },
  },

  '&.base--selected': {
    background: '#ffffff30',
  },
}));

const Selected = styled(Check)({
  position: 'absolute',
  right: '0',
  top: '-5px',
  fontSize: '12px',
  padding: '2px',
  borderRadius: '100%',
  background: 'green',
  color: 'white',
});

const DeleteButton = styled(IconButton)({
  visibility: 'hidden',
  position: 'absolute',
  width: '5px',
  height: '5px',
  top: '-5px',
  right: '0',
  background: 'grey',
});

const CloseIcon = styled(Close)(({ theme }) => ({
  color: 'black',
  fontSize: '12px',
}));

export default function RoomShowcase({}: RoomShowcaseProps) {
  const dispatch = useAppDispatch();
  const rooms = useAppSelector(roomsSelector);
  const cell = useAppSelector(getSelectedCell())!;

  const [value, setValue] = useState(rooms[cell.currentRoom].id);

  const handleRoomDelete = (room: RoomDto) => {
    if (cell.currentRoom === room.id) {
      enqueueSnackbar(`Can't delete currently selected room`, { variant: 'warning' });
      return;
    }
    dispatch(deleteRoom({ room, cell }));
  };

  const handleRoomSelect = (room: RoomDto) => {
    dispatch(selectRoom({ room, cell }));
  };

  const handleChange = (e: BaseSyntheticEvent | null, newValue: string | number | null) => {
    if (newValue) {
      setValue(`${newValue}`);
    }
  };

  return (
    <Tabs onChange={handleChange} value={value}>
      <StyledTabsList>
        <Scrollable scrollButtons={true}>
          {cell.rooms.map((roomId) => (
            <StyledTab slots={{ root: 'div' }} key={roomId} value={roomId}>
              {cell.currentRoom === roomId ? <Selected /> : null}
              <Hexagon fontSize="large" sx={{ color: `${TypeColors[rooms[roomId].type].light}` }} />
              <DeleteButton
                disableRipple
                onClick={(e) => {
                  e.preventDefault();
                  setValue(rooms[cell.currentRoom].id);
                  handleRoomDelete(rooms[roomId]);
                }}
              >
                <CloseIcon></CloseIcon>
              </DeleteButton>
            </StyledTab>
          ))}
        </Scrollable>
      </StyledTabsList>
      {cell.rooms.map((roomId) => (
        <TabPanel key={roomId} value={roomId}>
          <RoomProperties room={rooms[roomId]} onRoomSelectButtonClicked={handleRoomSelect} />
        </TabPanel>
      ))}
    </Tabs>
  );
}
