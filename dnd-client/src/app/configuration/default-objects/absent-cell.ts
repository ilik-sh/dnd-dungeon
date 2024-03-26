import { v4 } from "uuid";
import { RoomType } from "enums/room-type.enum";
import { CellDto } from "../types/cell.dto";
import { RoomChildDto } from "../types/room-child.dto";
import { defaultDirections } from "./default-directions";

export const generateAbsentCell = () => {
  const id = v4();

  const room: RoomChildDto = {
    id: v4(),
    parentId: id,
    type: RoomType.absence,
    level: 1,
    description: " ",
    directions: defaultDirections,
    isVisited: false,
  };

  const absentCell: CellDto = {
    id,
    currentRoom: room,
    rooms: [room],
  };

  return absentCell;
};
