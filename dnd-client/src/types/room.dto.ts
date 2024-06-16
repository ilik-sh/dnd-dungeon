import { RoomType } from 'enums/room-type.enum';
import { Direction } from 'enums/directions.enum';

export interface RoomDto {
  id: string;
  type: RoomType;
  level: number;
  roomDirections: Record<Direction, boolean>;
  description?: string;
  visited: boolean;
}
