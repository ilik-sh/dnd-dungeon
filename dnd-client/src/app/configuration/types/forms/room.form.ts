import { Direction } from 'enums/directions.enum';

export interface Room {
  type: string;
  level: number;
  description?: string;
  roomDirections: Record<Direction, boolean>;
  visited: boolean;
}
