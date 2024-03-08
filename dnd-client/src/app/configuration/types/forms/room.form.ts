import { RoomType } from "enums/room-type.enum";

export interface Room {
  type: string;
  level: number;
  description: string;
}
