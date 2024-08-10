import { CellDto } from 'entities/cell';
import { v4 } from 'uuid';

import { generateDefaultRoom } from './default-room';

export function generateDefaultCell() {
  const defaultRoom = generateDefaultRoom();

  const defaultCell: CellDto = {
    id: v4(),
    currentRoom: defaultRoom.id,
    rooms: [defaultRoom.id],
  };

  return { cell: defaultCell, room: defaultRoom };
}
