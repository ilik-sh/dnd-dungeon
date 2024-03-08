import React from "react";
import HexItem from "./hex-item/hex-item.comp";
import { styled } from "@mui/material";
import { RoomDto } from "app/configuration/types/cell.dto";

type Props = {
  style?: React.CSSProperties;
  column: (RoomDto | null)[];
};

const ColumnBox = styled("div")({
  display: "flex",
  flexDirection: "column",
});

export default function HexColumn({ style, column }: Props) {
  return (
    <div style={style}>
      {column.map((hex, index) => (
        <HexItem hex={hex} key={index} />
      ))}
    </div>
  );
}
