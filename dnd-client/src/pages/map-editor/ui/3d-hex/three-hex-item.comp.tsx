import { GroupProps, ThreeEvent } from '@react-three/fiber';
import { memo, useRef } from 'react';

import { useTheme } from '@mui/material';
import { BoxGeometry, BufferGeometry, CylinderGeometry, Group } from 'three';
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

type ThreeHexItemProps = {
  cell: CellDto;
} & GroupProps;

const hex = new CylinderGeometry(1, 1, 1, 6, 1, false, Math.PI / 2, 2 * Math.PI);

const ThreeHexItem = memo(function ThreeHexItem({ cell, ...props }: ThreeHexItemProps) {
  const dispatch = useAppDispatch();
  const room = useAppSelector(getSelectedRoom(cell.currentRoom));
  const isSelected = useAppSelector(isCellSelected(cell.id));
  const isHovering = useAppSelector(isHoveringOverObject(cell.id));
  const theme = useTheme();

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

  function animatePosition() {
    if (Math.floor(groupRef.current?.position.y) < 1) {
      groupRef.current?.position.setY(groupRef.current?.position.y + 0.1);
      requestAnimationFrame(animatePosition);
    } else {
      cancelAnimationFrame(animatePosition);
    }
  }

  function deanimatePosition() {
    if (groupRef.current?.position.y > 0.1) {
      groupRef.current?.position.setY(groupRef.current?.position.y - 0.1);
      requestAnimationFrame(deanimatePosition);
    } else {
      cancelAnimationFrame(deanimatePosition);
    }
  }

  isSelected ? animatePosition() : deanimatePosition();

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

  return (
    <group
      onClick={handleClick}
      onPointerEnter={handlePointerOver}
      onPointerOut={handlePointerOut}
      ref={groupRef}
      {...props}
    >
      <mesh geometry={hex}>
        <meshStandardMaterial
          color={isHovering ? theme.palette.secondary.main : TypeColors[room.type].dark}
          flatShading={true}
        ></meshStandardMaterial>
      </mesh>
      <mesh geometry={wallBuffer}>
        <meshStandardMaterial color={'#212121'}></meshStandardMaterial>
      </mesh>
    </group>
  );
});

export { ThreeHexItem };
