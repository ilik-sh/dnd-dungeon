import { RoomDto } from "app/configuration/types/cell.dto";

export const linear2dSearch = (arr: [RoomDto[]], target: string) => {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      if (arr[i][j].id == target) {
        return [i, j];
      }
    }
  }
  return [-1, -1];
};
