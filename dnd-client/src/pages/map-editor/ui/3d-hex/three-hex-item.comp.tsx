import { useTexture } from '@react-three/drei';
import { GroupProps, ThreeEvent, useLoader } from '@react-three/fiber';
import { memo, Suspense, useRef } from 'react';

import { alpha, useTheme } from '@mui/material';
import { BoxGeometry, BufferGeometry, CylinderGeometry, Group, TextureLoader } from 'three';
import { mergeBufferGeometries } from 'three-stdlib';
import { degToRad } from 'three/src/math/MathUtils';

import { isHoveringOverObject } from 'pages/map-editor/model/store/hover/hover.selector';
import { setHoveringElement } from 'pages/map-editor/model/store/hover/hover.slice';

import { CellDto } from 'entities/cell/model/types/cell.dto';

import { DirectionAngles } from 'shared/libs/enums/direction-angles';
import { TypeColors } from 'shared/libs/enums/type-colors.enum';
import { useAppDispatch, useAppSelector } from 'shared/libs/hooks/redux.hooks';

import { getSelectedRoom, isCellSelected } from '../../model/store/map/map.selector';
import { setSelectedCell } from '../../model/store/map/map.slice';
import { hex } from './geometries';

type ThreeHexItemProps = {
  cell: CellDto;
} & GroupProps;

const ThreeHexItem = memo(function ThreeHexItem({ cell, ...props }: ThreeHexItemProps) {
  const dispatch = useAppDispatch();
  const room = useAppSelector(getSelectedRoom(cell.currentRoom));
  const isSelected = useAppSelector(isCellSelected(cell.id));
  const isHovering = useAppSelector(isHoveringOverObject(cell.id));
  const theme = useTheme();

  const grass = useTexture(
    room.textureUrl
      ? room.textureUrl
      : 'https://firebasestorage.googleapis.com/v0/b/dndhub-fb81c.appspot.com/o/textures%2F04c539f2-50f6-41af-b2e0-d93f6e286621?alt=media&token=9253a487-14db-4f4a-9691-0aafdb80aa1e',
  );

  const groupRef = useRef<Group>(null);

  let wallBuffer = new BufferGeometry();

  wallBuffer = mergeBufferGeometries([new BoxGeometry(0, 0, 0)])!;

  Object.entries(room.roomDirections).map(([key, value]) => {
    if (!value) {
      const wall = new BoxGeometry(1 * 1.1, 0.5, 0.15);
      const distanceToTheSide = (Math.sqrt(3) / 2) * 1;
      const angle = DirectionAngles[key] + 90;
      const pointX = distanceToTheSide * Math.cos((Math.PI / 180) * angle);
      const pointY = distanceToTheSide * Math.sin((Math.PI / 180) * angle);

      wall.rotateY(degToRad(-DirectionAngles[key]));
      wall.translate(pointX, 0.5, pointY);
      wallBuffer = mergeBufferGeometries([wallBuffer, wall])!;
    }
  });

  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    dispatch(setSelectedCell(cell));
  };

  const handlePointerOver = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    dispatch(setHoveringElement({ hoveringElementId: cell.id }));
  };

  const handlePointerOut = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    dispatch(setHoveringElement({ hoveringElementId: '' }));
  };

  let color;

  if (isHovering) {
    color = theme.palette.secondary.main;
  }

  if (isSelected) {
    color = theme.palette.primary.main;
  }

  return (
    <Suspense fallback={null}>
      <group
        onClick={handleClick}
        onPointerEnter={handlePointerOver}
        onPointerOut={handlePointerOut}
        ref={groupRef}
        {...props}
      >
        <mesh geometry={hex}>
          <meshStandardMaterial
            map={grass}
            color={color ? color : TypeColors[room.type].dark}
            transparent={true}
            opacity={color ? 0.8 : 1}
            flatShading={true}
          ></meshStandardMaterial>
        </mesh>
        <mesh geometry={wallBuffer}>
          <meshStandardMaterial color={color ? color : '#212121'}></meshStandardMaterial>
        </mesh>
      </group>
    </Suspense>
  );
});

export { ThreeHexItem };
