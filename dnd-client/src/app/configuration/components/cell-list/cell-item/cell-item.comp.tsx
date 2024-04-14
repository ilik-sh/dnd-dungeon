import React from 'react';
import { Box, styled } from '@mui/material';
import Room from './room/room-item.comp';
import { useAppDispatch } from 'hooks/redux.hooks';
import { RoomChildDto } from 'app/configuration/types/room-child.dto';
import { CellDto } from 'app/configuration/types/cell.dto';
import AddRoomButton from './add-room-button.comp';
import { addRoom } from 'app/configuration/store/map.slice';
import { generateDefaultRoom } from 'app/configuration/default-objects/default-room';
import RoomIconStack from './room-stack-icon.comp';

type CellItemProps = {
  cell: CellDto;
};

const CustomGrid = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  gap: '20px',
  overflowY: 'auto',
  overflowX: 'hidden',
  maxHeight: '80vh',
});

const SummaryBox = styled('div')({
  alignItems: 'center',
  display: 'flex',
  gap: '20px',
  marginBottom: '20px',
});

function CellItem({ cell }: CellItemProps) {
  const dispatch = useAppDispatch();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    const room: RoomChildDto = generateDefaultRoom(cell.id);
    dispatch(addRoom({ room }));
  };
  return (
    <>
      <SummaryBox>
        <RoomIconStack rooms={cell.rooms} />
      </SummaryBox>
      <CustomGrid>
        {cell.rooms.map((room, index) => (
          <Box key={index} component="div">
            <Room selected={cell.currentRoom?.id == room.id} room={room} />
          </Box>
        ))}
        <Box component="div">
          <AddRoomButton handleClick={handleClick} />
        </Box>
      </CustomGrid>
    </>
  );
}

export default CellItem;
