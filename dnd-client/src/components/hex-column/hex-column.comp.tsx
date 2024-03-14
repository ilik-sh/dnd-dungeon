import React from "react";
import HexItem from "./hex-item/hex-item.comp";
import { styled } from "@mui/material";
import { CellDto } from "app/configuration/types/cell.dto";

type Props = {
  style?: React.CSSProperties;
  column: CellDto[];
};

const ColumnBox = styled("div")({
  display: "flex",
  flexDirection: "column",
});

export default function HexColumn({ style, column }: Props) {
  return (
    <ColumnBox style={style}>
      {column.map((cell, index) => (
        <HexItem cell={cell} key={index} />
      ))}
    </ColumnBox>
  );
}
