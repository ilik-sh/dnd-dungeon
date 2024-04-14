import { RoomChildDto } from 'app/configuration/types/room-child.dto';

export type ContextMenu = {
  x: number;
  y: number;
  room: RoomChildDto;
};
