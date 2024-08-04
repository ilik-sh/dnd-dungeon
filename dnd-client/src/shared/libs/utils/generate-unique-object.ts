import { v4 } from 'uuid';

import { CellDto } from 'entities/cell';
import { RoomDto } from 'entities/room';

export function generateUniqueObject(cell: CellDto, rooms: RoomDto[]) {
  const newCell = { ...cell, id: v4() };
  const newRooms = rooms.map((room) => {
    return { ...room, id: v4() };
  });
  newCell.rooms = newRooms.map((room) => room.id);
  newCell.currentRoom = newRooms[0].id;

  let roomsDictionary: Record<string, RoomDto> = {};
  newRooms.map((room) => (roomsDictionary[room.id] = room));

  return { cell: newCell, rooms: newRooms, roomsDictionary };
}
