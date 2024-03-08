import { v4 } from "uuid";
import { RoomVariantDto } from "../../../types/room.dto";
import { RoomType } from "enums/room-type.enum";
import { RoomDto } from "../types/cell.dto";

export const generateAbsentRoom = () => {
  const id = v4();

  const variant: RoomVariantDto = {
    id: v4(),
    parentId: id,
    type: RoomType.absense,
    level: 1,
    description: " ",
  };

  const absentRoom: RoomDto = {
    id,
    isVisited: false,
    currentVariant: variant,
    variants: [variant],
  };

  return absentRoom;
};
