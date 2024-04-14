import { Direction } from 'enums/directions.enum';

export interface Room {
  type: string;
  level: number;
  description: string;
  directions: Record<Direction, boolean>;
  isVisited: boolean;
}
