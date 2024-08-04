import { BaseSyntheticEvent, useEffect, useState } from 'react';

import { Tab, TabPanel, Tabs, TabsList } from '@mui/base';
import { Check, Close, Hexagon } from '@mui/icons-material';
import { IconButton, styled } from '@mui/material';
import { enqueueSnackbar } from 'notistack';

import { getSelectedCell, roomsSelector } from '../../../../pages/map-editor/model/store/map/map.selector';
import { deleteRoom, selectRoom } from '../../../../pages/map-editor/model/store/map/map.slice';

import { CellDto } from 'entities/cell';
import { RoomDto } from 'entities/room/model/types/room.dto';

import { TypeColors } from 'shared/libs/enums/type-colors.enum';
import { useAppDispatch, useAppSelector } from 'shared/libs/hooks/redux.hooks';
import Scrollable from 'shared/ui/scrollable.comp';

import RoomProperties from './room-properties.comp';

type RoomShowcaseProps = {
  deleteAction: (room: RoomDto) => void;
  selectAction: (room: RoomDto) => void;
  updateAction: (room: RoomDto) => void;
  rooms: RoomDto[];
  cell: CellDto;
};

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
  fontSize: '16px',
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

export default function RoomShowcase({ selectAction, deleteAction, updateAction, rooms, cell }: RoomShowcaseProps) {
  const [value, setValue] = useState(cell.currentRoom);

  useEffect(() => {
    setValue(cell.currentRoom);
  }, [cell]);

  const handleChange = (e: BaseSyntheticEvent | null, newValue: string | number | null) => {
    if (newValue) {
      setValue(`${newValue}`);
    }
  };

  return (
    <Tabs onChange={handleChange} value={value} defaultValue={value}>
      <StyledTabsList>
        <Scrollable scrollButtons={true}>
          {rooms.map((room) => (
            <StyledTab slots={{ root: 'div' }} key={room.id} value={room.id}>
              {cell.currentRoom === room.id ? <Selected /> : null}
              <Hexagon fontSize="large" sx={{ color: `${TypeColors[room.type].light}` }} />
              <DeleteButton
                disableRipple
                onClick={(e) => {
                  e.preventDefault();
                  setValue(room.id);
                  deleteAction(room);
                }}
              >
                <CloseIcon></CloseIcon>
              </DeleteButton>
            </StyledTab>
          ))}
        </Scrollable>
      </StyledTabsList>
      {rooms.map((room) => (
        <TabPanel key={room.id} value={room.id}>
          <RoomProperties room={room} updateAction={updateAction} />
        </TabPanel>
      ))}
    </Tabs>
  );
}
