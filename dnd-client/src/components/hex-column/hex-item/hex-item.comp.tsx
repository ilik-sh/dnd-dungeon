import { MenuItem, styled } from "@mui/material";
import { TypeColors } from "enums/type-colors.enum";
import React from "react";
import { Hex } from "./hex";
import { RoomDto } from "types/room.dto";
import { RoomType } from "enums/room-type.enum";
import { CellDto } from "app/configuration/types/cell.dto";
import { useAppDispatch, useAppSelector } from "hooks/redux.hooks";
import {
  closeContextMenu,
  openContextMenu,
  setSelectedCell,
  toggleVisit,
} from "app/map/store/map.slice";
import { mapSelector } from "app/map/store/map.selector";
import { amber, red } from "@mui/material/colors";
import { Direction } from "enums/directions.enum";
import { linear2dSearch } from "utils/linear2dSearch";
import { ContextMenu as ContextSettings } from "app/map/types/context-menu.type";
import ContextMenu from "components/context-menu.comp";

type Props = {
  cell: CellDto;
};

const HexBox = styled("div")({});

function HexItem({ cell }: Props) {
  const hexProperties = new Hex(50);
  const dispatch = useAppDispatch();
  const { selectedCellId, map } = useAppSelector(mapSelector);
  const room = cell.rooms.find((room) => room.id == cell.currentRoom?.id);

  const handleClick = () => {
    dispatch(setSelectedCell(cell));
  };

  const handleContextClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const contextSettings: ContextSettings = {
      x: e.clientX,
      y: e.clientY,
      room: room!,
    };
    dispatch(openContextMenu(contextSettings));
  };

  return (
    <>
      <a
        style={{ display: "flex" }}
        onClick={handleClick}
        onContextMenu={handleContextClick}
      >
        <svg
          height={hexProperties.dimensions.height.toString()}
          width={hexProperties.dimensions.width.toString()}
          clipPath={`polygon(${hexProperties.points.toString()})`}
          fill={room?.isVisited ? "rgba(0, 0, 0, 0.4)" : "none"}
        >
          <polygon
            id="hex"
            fill={TypeColors[room?.type.toLowerCase() as RoomType].dark}
            points={hexProperties.points.toString()}
          ></polygon>
          {room
            ? Object.entries(room.directions).map(([key, value], index) => {
                {
                  return (
                    <polygon
                      strokeLinejoin="round"
                      key={index}
                      points={hexProperties.lines[key as Direction].toString()}
                      stroke={
                        value
                          ? `${null}`
                          : `${
                              TypeColors[room?.type.toLowerCase() as RoomType]
                                .light
                            }`
                      }
                      strokeWidth="1rem"
                    ></polygon>
                  );
                }
              })
            : null}
          <polygon
            style={{
              strokeWidth: "15px",
              stroke: cell?.id === selectedCellId ? `${amber[800]}` : undefined,
            }}
            points={hexProperties.points.toString()}
          ></polygon>
        </svg>
      </a>
    </>
  );
}

export default HexItem;
