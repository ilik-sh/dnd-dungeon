import { v4 } from 'uuid';

import { CellDto } from 'entities/cell';
import { RoomDto } from 'entities/room';

import { generateDefaultRoom } from './default-room';

export function generateDefaultCell() {
  const defaultRoom = generateDefaultRoom();

  const defaultCell: CellDto = {
    id: v4(),
    currentRoom: defaultRoom.id,
    rooms: [defaultRoom.id],
  };

  const roomDictionary: Record<string, RoomDto> = {};
  roomDictionary[defaultRoom.id] = defaultRoom;

  return { cell: defaultCell, room: defaultRoom, roomDictionary };
}
