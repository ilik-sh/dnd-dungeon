import { v4 } from 'uuid';
import { RoomType } from 'enums/room-type.enum';
import { RoomChildDto } from '../types/room-child.dto';
import { defaultDirections } from './default-directions';

export const generateDefaultRoom = (parentId: string) => {
  const defaultRoom: RoomChildDto = {
    id: v4(),
    parentId: parentId,
    type: RoomType.neutral,
    level: 1,
    description: ' ',
    directions: defaultDirections,
    isVisited: false,
  };

  return defaultRoom;
};
