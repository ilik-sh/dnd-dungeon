import { RoomDto } from "types/room.dto";

export interface MapState {
  map: (RoomDto | null)[][];
  selectedRoom: RoomDto | null;
}
