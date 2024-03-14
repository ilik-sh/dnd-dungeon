import { Direction } from "enums/directions.enum";
import { RoomType } from "enums/room-type.enum";

export interface Room {
  type: string;
  level: number;
  description: string;
  directions: Record<Direction, boolean>;
  isVisited: boolean;
}
