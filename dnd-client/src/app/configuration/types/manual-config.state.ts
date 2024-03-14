import { CellDto } from "./cell.dto";

export interface ManualConfigState {
  cells: CellDto[];
  mapSize: number;
  selectedCell: CellDto | null;
}
