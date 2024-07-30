import { CellDto } from 'entities/cell/model/types/cell.dto';
import { RoomDto } from 'entities/room/model/types/room.dto';

export type MapSnapshot = {
  id: string;
  name: string;
  mapLayout: CellDto[][];
  mapInfo: Record<string, RoomDto>;
};
