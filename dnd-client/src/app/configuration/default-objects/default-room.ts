import { RoomType } from "enums/room-type.enum";
import { v4 } from "uuid";
import { RoomVariantDto } from "../../../types/room.dto";
import { RoomDto } from "../types/cell.dto";

export const generateDefaultRoom = () => {
  const id = v4();

  const roomVariant: RoomVariantDto = {
    id: v4(),
    parentId: id,
    type: RoomType.neutral,
    level: 1,
    description: " ",
  };

  const room: RoomDto = {
    id,
    isVisited: false,
    currentVariant: roomVariant,
    variants: [roomVariant],
  };

  return room;
};
