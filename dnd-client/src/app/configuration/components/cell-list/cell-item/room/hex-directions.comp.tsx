import { Checkbox } from "@mui/material";
import { amber } from "@mui/material/colors";
import { RoomFormYup } from "app/configuration/validation-schemas/room-form.schema";
import { mapSelector } from "app/map/store/map.selector";
import { Hex } from "components/hex-column/hex-item/hex";
import { Directions } from "enums/directions.enum";
import { RoomType } from "enums/room-type.enum";
import { TypeColors } from "enums/type-colors.enum";
import { useAppSelector } from "hooks/redux.hooks";
import React from "react";
import { Control, useController } from "react-hook-form";
import { RoomDto } from "types/room.dto";
import { transform } from "typescript";

type HexDirectionsProps = {
  control: Control<RoomFormYup, any>;
};

export default function HexDirections({ control }: HexDirectionsProps) {
  const outerHex = new Hex(75);
  const { field } = useController({
    control,
    name: "directions",
  });
  return (
    <svg
      height={outerHex.dimensions.height.toString()}
      width={outerHex.dimensions.width.toString()}
      clipPath={`polygon(${outerHex.points.toString()})`}
      fill="none"
    >
      <polygon
        id="hex"
        fill={TypeColors["absense"].dark}
        points={outerHex.points.toString()}
      ></polygon>
      {Object.entries(field.value).map(([key, value], index) => {
        return (
          <polygon
            style={{ padding: "10px" }}
            key={index}
            points={outerHex.lines[key as Directions].toString()}
            stroke={value ? undefined : TypeColors["absense"].light}
            strokeWidth="20px"
          ></polygon>
        );
      })}
      <foreignObject width="100%" height="100%">
        <div
          style={{
            display: "grid",
            width: "100%",
            height: "100%",
            gridTemplateColumns: "1fr 2fr 1fr",
            gridTemplateRows: "1fr 1fr",
          }}
        >
          {Object.entries(field.value).map(([key, value], index) => {
            return (
              <Checkbox
                key={index}
                onChange={(e) => {
                  const prev = field.value;
                  prev[e.target.name as Directions] = e.target.checked;
                  field.onChange(prev);
                }}
                sx={{ width: "100%", height: "100%", opacity: "0" }}
                checked={field.value[`${key as Directions}`]}
                value={`${key}`}
                name={`${key}`}
              />
            );
          })}
        </div>
      </foreignObject>
    </svg>
  );
}
