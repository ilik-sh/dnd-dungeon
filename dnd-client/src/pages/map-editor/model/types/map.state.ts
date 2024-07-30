import { CellDto } from 'entities/cell';
import { RoomDto } from 'entities/room/model/types/room.dto';

export interface MapState {
  map: (CellDto | null)[][];
  rooms: Record<string, RoomDto>;
  selectedCellId: string | null;
  mapName: string;
  id: string;
}
