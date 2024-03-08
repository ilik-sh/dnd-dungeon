import { RoomType } from "enums/room-type.enum";

export interface RoomDto {
  id: string;
  type: RoomType;
  level: number;
  description: string;
}
