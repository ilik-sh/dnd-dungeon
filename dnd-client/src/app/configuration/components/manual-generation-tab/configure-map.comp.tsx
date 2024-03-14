import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "hooks/redux.hooks";
import HexColumn from "components/hex-column/hex-column.comp";
import { manualGenerationConfigSelector } from "app/configuration/store/manual-generation/manual-generation-config.selector";
import { mapSelector } from "app/map/store/map.selector";
import { closeContextMenu, setMap, toggleVisit } from "app/map/store/map.slice";
import { Menu, MenuItem, styled } from "@mui/material";
import { generateAbsentCell } from "app/configuration/default-objects/absent-cell";
import ContextMenu from "components/context-menu.comp";

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
          .map((_) => generateAbsentCell())
      );
    dispatch(setMap({ map }));
  }, [mapSize]);

  const handleToggleVisitClick = () => {
    dispatch(toggleVisit());
    dispatch(closeContextMenu());
  };

  return (
    <StyledDiv>
      <ContextMenu>
        <MenuItem onClick={handleToggleVisitClick}>Toggle visit</MenuItem>
      </ContextMenu>
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
