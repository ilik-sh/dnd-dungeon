import React from "react";
import HexColumn from "../../components/hex-column/hex-column.comp";
import { styled } from "@mui/material";
import { useAppSelector } from "hooks/redux.hooks";
import { mapSelector } from "./store/map.selector";

type Props = {};

const MapBox = styled("div")({
  display: "flex",
});

export default function MapPage({}: Props) {
  const { map } = useAppSelector(mapSelector);
  return (
    <MapBox>
      {map.map((column, index) => (
        <HexColumn
          key={index}
          column={column}
          style={
            index % 2 == 0
              ? {
                  transform: `translateX(${-25 * index}px)`,
                }
              : {
                  marginTop: `${(Math.sqrt(3) / 2) * 50}px`,
                  transform: `translateX(${-25 * index}px)`,
                }
          }
        />
      ))}
    </MapBox>
  );
}
