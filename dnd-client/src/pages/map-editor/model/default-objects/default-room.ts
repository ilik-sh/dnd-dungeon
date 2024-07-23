import { RoomType } from 'shared/libs/enums/room-type.enum';
import { RoomDto } from 'shared/model/types/room.dto';
import { v4 } from 'uuid';

import { defaultDirections } from './default-directions';

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
