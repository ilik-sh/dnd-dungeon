import { Direction } from 'shared/libs/enums/directions.enum';
import { RoomType } from 'shared/libs/enums/room-type.enum';

export interface RoomDto {
  id: string;
  type: RoomType;
  level: number;
  roomDirections: Record<Direction, boolean>;
  description?: string;
  visited: boolean;
  textureUrl: string;
}
