import { ThreeEvent, useLoader } from '@react-three/fiber';
import { memo, RefObject, useEffect, useRef } from 'react';

import { CellDto } from 'entities/cell/model/types/cell.dto';
import { DirectionAngles } from 'shared/libs/enums/direction-angles';
import { TypeColors } from 'shared/libs/enums/type-colors.enum';
import { useAppDispatch, useAppSelector } from 'shared/libs/hooks/redux.hooks';
import {
  BoxGeometry,
  BufferGeometry,
  CylinderGeometry,
  Group,
  Mesh,
  MeshStandardMaterial,
  TextureLoader,
  Vector2,
} from 'three';
import { mergeBufferGeometries } from 'three-stdlib';
import { degToRad } from 'three/src/math/MathUtils';

import { getSelectedRoom, isCellSelected } from '../../model/store/map/map.selector';
import { setSelectedCell } from '../../model/store/map/map.slice';
import brick from './floor.png';

type ThreeHexItemProps = {
  cell: CellDto;
};

const hex = new CylinderGeometry(1, 1, 1, 6, 1, false, Math.PI / 2, 2 * Math.PI);
const wallMaterial = new MeshStandardMaterial({ color: 'black', flatShading: true });
const transparentMaterial = new MeshStandardMaterial({ transparent: true, color: 'white', opacity: 0.1 });
const blankSpace = new CylinderGeometry(1, 1, 0.0, 6, 1, false, Math.PI / 2, 2 * Math.PI);

const materials = {
  NEUTRAL: new MeshStandardMaterial({ color: TypeColors.NEUTRAL.dark, flatShading: true }),
  EVIL: new MeshStandardMaterial({ color: TypeColors.EVIL.dark, flatShading: true }),
  LOOT: new MeshStandardMaterial({ color: TypeColors.LOOT.dark, flatShading: true }),
  QUEST: new MeshStandardMaterial({ color: TypeColors.QUEST.dark, flatShading: true }),
  PEACE: new MeshStandardMaterial({ color: TypeColors.PEACE.dark, flatShading: true }),
  ABSENCE: new MeshStandardMaterial({ color: TypeColors.ABSENCE.dark, flatShading: true }),
};

const ThreeHexItem = memo(function ThreeHexItem({ cell, ...props }: ThreeHexItemProps) {
  const [colorMap] = useLoader(TextureLoader, [brick]);
  const brickWall = useLoader(TextureLoader, brick);

  const dispatch = useAppDispatch();
  const room = useAppSelector(getSelectedRoom(cell.currentRoom));
  const isSelected = useAppSelector(isCellSelected(cell.id));

  const groupRef = useRef<Group>(null);
  const hexRef = useRef<Mesh>(null);
  const blankRef = useRef<Mesh>(null);

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

  if (room.type == 'ABSENCE') {
    return <mesh {...props} geometry={blankSpace} material={transparentMaterial} ref={blankRef}></mesh>;
  }

  return (
    <group onClick={handleClick} ref={groupRef} {...props}>
      <mesh geometry={hex} rotation={[0, 0, 0]} ref={hexRef}>
        <meshStandardMaterial map={brickWall} color={TypeColors[room.type].dark}></meshStandardMaterial>
      </mesh>
      <mesh geometry={wallBuffer} material={wallMaterial}>
        <meshStandardMaterial map={brickWall} color={'#212121'}></meshStandardMaterial>
      </mesh>
    </group>
  );
});

export { ThreeHexItem };
