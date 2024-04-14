import styled from '@emotion/styled';
import RoomItem from './room-item.comp';
import { Box } from '@mui/material';
import { CellDto } from 'app/configuration/types/cell.dto';

type RoomListProps = {
  cell: CellDto;
};

const CustomGrid = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  gap: '20px',
  overflowY: 'auto',
});

export default function RoomList({ cell }: RoomListProps) {
  return (
    <CustomGrid>
      {cell.rooms.map((room, index) => (
        <Box key={index}>
          <RoomItem selected={cell.currentRoom?.id == room.id} room={room} />
        </Box>
      ))}
      <Box></Box>
    </CustomGrid>
  );
}
