import { CellDto } from "app/configuration/types/cell.dto";
import { ContextMenu } from "./context-menu.type";

export interface MapState {
  map: CellDto[][];
  selectedCellId: string | null;
  multipleSelectedCells: string[];
  multipleSelection: boolean;
  contextMenu: ContextMenu | null;
}
