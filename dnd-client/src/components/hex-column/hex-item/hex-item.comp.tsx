import { styled } from "@mui/material";
import { TypeColors } from "enums/type-colors.enum";
import React from "react";
import { Hex } from "./hex";
import { RoomDto } from "app/configuration/types/cell.dto";
import { RoomType } from "enums/room-type.enum";

type Props = {
  hex: RoomDto | null;
  onClick: 
};

type LowercasedType = "neutral" | "peace" | "evil" | "quest" | "loot";

const HexBox = styled("div")({});

export default function HexItem({ hex }: Props) {
  const hexProperties = new Hex(50);
  return (
    <div style={{ display: "flex" }} onClick>
      <svg height="87" width="100" stroke="rgba(0 0 0 / 0.5)">
        <polygon
          fill={
            TypeColors[hex?.currentVariant?.type.toLowerCase() as RoomType]
              .light
          }
          points={hexProperties.points.toString()}
        ></polygon>
        {/* {hex
          ? Object.entries(hex.roomDirections).map(([key, value], index) => {
              if (value) {
                return (
                  <polygon
                    points={hexProperties.lines[key as Directions].toString()}
                    stroke="saddleBrown"
                    strokeWidth="3px"
                  ></polygon>
                );
              }
            })
          : null} */}
      </svg>
    </div>
  );
}
