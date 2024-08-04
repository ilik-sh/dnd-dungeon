import { CellDto } from 'entities/cell';
import { RoomDto } from 'entities/room';

export interface AddCellState {
  cell: CellDto;
  rooms: Record<string, RoomDto>;
}
