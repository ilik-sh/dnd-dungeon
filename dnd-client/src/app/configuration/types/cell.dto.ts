import { RoomChildDto } from "./room-child.dto";

export interface CellDto {
  id: string;
  currentRoom: RoomChildDto | null;
  rooms: RoomChildDto[];
}
