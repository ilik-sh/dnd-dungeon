import { RoomType } from 'enums/room-type.enum';
import { Direction } from 'enums/directions.enum';

export interface RoomDto {
  id: string;
  type: RoomType;
  level: number;
  directions: Record<Direction, boolean>;
  description: string;
  isVisited: boolean;
}
