import { View } from '@react-three/drei';
import { Control, useController } from 'react-hook-form';

import { Box, Checkbox, styled, useMediaQuery } from '@mui/material';
import { RoomFormYup } from 'pages/map-editor/model/validation-schemas/room-form.schema';
import { DirectionAngles } from 'shared/libs/enums/direction-angles';
import { Directions } from 'shared/libs/enums/directions.enum';
import { RoomType } from 'shared/libs/enums/room-type.enum';
import { TypeColors } from 'shared/libs/enums/type-colors.enum';

import { Hex } from './hex';

type HexDirectionsProps = {
  control: Control<RoomFormYup, any>;
  submit?: () => void;
};

const CenteredBox = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
});

const GridCheckboxList = styled(Box)({
  height: '100%',
  display: 'grid',
  gridTemplateColumns: '1fr 2fr 1fr',
  gridTemplateRows: '1fr 1fr',
});

const StyledCheckbox = styled(Checkbox)({
  padding: '0',
  opacity: '0',
});

export default function RoomDirections({ control, submit }: HexDirectionsProps) {
  const outerHex = new Hex(50);

  const { field } = useController({
    control,
    name: 'roomDirections',
  });

  const type = control._defaultValues.type;

  return (
    <CenteredBox>
      <svg
        height={outerHex.dimensions.height.toString()}
        width={outerHex.dimensions.width.toString()}
        clipPath={`polygon(${outerHex.points.toString()})`}
        fill="none"
      >
        <polygon id="hex" fill={TypeColors[type as RoomType].dark} points={outerHex.points.toString()}></polygon>
        {Object.entries(field.value).map(([key, value], index) => {
          return (
            <polygon
              style={{ padding: '10px' }}
              key={index}
              points={outerHex.lines[key as Directions].toString()}
              stroke={value ? undefined : TypeColors[type as RoomType].light}
              strokeWidth="10px"
            ></polygon>
          );
        })}
        <foreignObject width="100%" height="100%">
          <GridCheckboxList>
            {Object.entries(Directions).map(([key, _], index) => {
              return (
                <StyledCheckbox
                  key={index}
                  onChange={(e) => {
                    const prev = field.value;
                    prev[e.target.name as Directions] = e.target.checked;
                    field.onChange(prev);
                    if (submit) {
                      submit();
                    }
                  }}
                  checked={field.value[`${key as Directions}`]}
                  value={`${key}`}
                  name={`${key}`}
                />
              );
            })}
          </GridCheckboxList>
        </foreignObject>
      </svg>
    </CenteredBox>
  );
}
