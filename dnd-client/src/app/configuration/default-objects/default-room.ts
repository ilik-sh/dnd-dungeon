import { v4 } from 'uuid';
import { RoomType } from 'enums/room-type.enum';
import { defaultDirections } from './default-directions';
import { RoomDto } from 'types/room.dto';

export const generateDefaultRoom = () => {
  const defaultRoom: RoomDto = {
    id: v4(),
    type: RoomType.NEUTRAL,
    level: 1,
    description: ' ',
    roomDirections: defaultDirections,
    visited: false,
  };

  return defaultRoom;
};
