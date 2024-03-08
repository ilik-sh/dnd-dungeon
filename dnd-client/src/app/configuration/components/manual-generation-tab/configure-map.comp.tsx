import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "hooks/redux.hooks";
import HexColumn from "components/hex-column/hex-column.comp";
import { manualGenerationConfigSelector } from "app/configuration/store/manual-generation/manual-generation-config.selector";
import { mapSelector } from "app/map/store/map.selector";
import { setMap } from "app/map/store/map.slice";
import { styled } from "@mui/material";
import { generateAbsentRoom } from "app/configuration/default-objects/absent-room";

type Props = {};

const StyledDiv = styled("div")({
  display: "flex",
  justifyContent: "center",
});

export default function ConfigureMap({}: Props) {
  const { mapSize } = useAppSelector(manualGenerationConfigSelector);
  const { map } = useAppSelector(mapSelector);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const map = Array(mapSize)
      .fill(undefined)
      .map((_) =>
        Array(mapSize)
          .fill(undefined)
          .map((_) => generateAbsentRoom())
      );
    dispatch(setMap({ map }));
  }, [mapSize]);

  return (
    <StyledDiv>
      {map.map((item, index) => (
        <HexColumn
          column={item}
          key={index}
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
    </StyledDiv>
  );
}
