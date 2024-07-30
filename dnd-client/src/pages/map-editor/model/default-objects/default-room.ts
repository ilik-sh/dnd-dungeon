import { v4 } from 'uuid';

import { RoomDto } from 'entities/room/model/types/room.dto';

import { RoomType } from 'shared/libs/enums/room-type.enum';

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
