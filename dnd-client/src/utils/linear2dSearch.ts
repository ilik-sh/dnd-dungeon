import { CellDto } from "app/configuration/types/cell.dto";

export const linear2dSearch = (arr: CellDto[][], target: string | null) => {
  if (!target) {
    return null;
  }
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      if (arr[i][j].id == target) {
        return arr[i][j];
      }
    }
  }
  return null;
};
