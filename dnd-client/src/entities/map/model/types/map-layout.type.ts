import { CellDto } from 'entities/cell';
import { RoomDto } from 'entities/room';

export type MapLayout = {
  id: string;
  mapLayout: (CellDto | null)[][];
  mapInfo: Record<string, RoomDto>;
};
