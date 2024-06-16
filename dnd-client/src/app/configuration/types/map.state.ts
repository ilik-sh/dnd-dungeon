import { CellDto } from 'app/configuration/types/cell.dto';
import { RoomDto } from 'types/room.dto';

export interface MapState {
  map: CellDto[][];
  rooms: Record<string, RoomDto>;
  selectedCellId: string | null;
  mapName: string;
}
