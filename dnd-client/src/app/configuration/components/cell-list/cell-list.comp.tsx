import { manualGenerationConfigSelector } from "app/configuration/store/manual-generation/manual-generation-config.selector";
import { useAppDispatch, useAppSelector } from "hooks/redux.hooks";
import CellItem from "./cell-item/cell-item.comp";
import { Button } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { CellDto } from "app/configuration/types/cell.dto";
import { addCell } from "app/configuration/store/manual-generation/manual-generation-config.slice";
import { RoomType } from "enums/room-type.enum";
import { RoomChildDto } from "app/configuration/types/room-child.dto";

type Props = {};

export default function CellList({}: Props) {
  const { cells } = useAppSelector(manualGenerationConfigSelector);
  const dispatch = useAppDispatch();

  const onClick = () => {
    const id = uuidv4();
    const cell: CellDto = {
      id: id,
      currentRoom: null,
      rooms: [],
    };
    const room: RoomChildDto = {
      id: uuidv4(),
      parentId: id,
      type: RoomType.neutral,
      level: 1,
      description: " ",
    };
    cell.rooms.push(room);

    dispatch(addCell({ cell }));
  };
  return (
    <div>
      {cells.map((cell, index) => (
        <CellItem key={index} cell={cell} />
      ))}
      <Button onClick={onClick}>Add cell</Button>
    </div>
  );
}
