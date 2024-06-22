import { CellDto } from 'app/configuration/types/cell.dto';
import { getSelectedRoom, isCellSelected } from 'app/configuration/store/map.selector';
import { TypeColors } from 'enums/type-colors.enum';
import { useAppDispatch, useAppSelector } from 'hooks/redux.hooks';
import { BoxGeometry, BufferGeometry, CylinderGeometry, Group, Mesh, MeshStandardMaterial, Vector2 } from 'three';
import { mergeBufferGeometries } from 'three-stdlib';
import { degToRad } from 'three/src/math/MathUtils';
import { memo, useEffect, useRef } from 'react';
import { DirectionAngles } from 'enums/direction-angles';
import { setSelectedCell } from 'app/configuration/store/map.slice';
import { ThreeEvent } from '@react-three/fiber';

type ThreeHexItemProps = {
  cell: CellDto;
  position: Vector2;
};

const hex = new CylinderGeometry(1, 1, 1, 6, 1, false, Math.PI / 2, 2 * Math.PI);
const wallMaterial = new MeshStandardMaterial({ color: 'grey', flatShading: true });

const materials = {
  NEUTRAL: new MeshStandardMaterial({ color: TypeColors.NEUTRAL.dark, flatShading: true }),
  EVIL: new MeshStandardMaterial({ color: TypeColors.EVIL.dark, flatShading: true }),
  LOOT: new MeshStandardMaterial({ color: TypeColors.LOOT.dark, flatShading: true }),
  QUEST: new MeshStandardMaterial({ color: TypeColors.QUEST.dark, flatShading: true }),
  PEACE: new MeshStandardMaterial({ color: TypeColors.PEACE.dark, flatShading: true }),
  ABSENCE: new MeshStandardMaterial({ color: TypeColors.ABSENCE.dark, flatShading: true }),
};

const ThreeHexItem = memo(function ThreeHexItem({ cell, position }: ThreeHexItemProps) {
  useEffect(() => {
    if (hexRef.current) {
      hexRef.current.position.set(position.x, 0, position.y);
    }
  }, []);

  const dispatch = useAppDispatch();
  const room = useAppSelector(getSelectedRoom(cell.currentRoom));
  const isSelected = useAppSelector(isCellSelected(cell.id));

  const groupRef = useRef<Group>(null);
  const hexRef = useRef<Mesh>(null);

  let wallBuffer = new BufferGeometry();

  wallBuffer = mergeBufferGeometries([new BoxGeometry(0, 0, 0)])!;

  Object.entries(room.roomDirections).map(([key, value]) => {
    if (!value) {
      const wall = new BoxGeometry(1 * 1.1, 0.5, 0.15);
      const distanceToTheSide = (Math.sqrt(3) / 2) * 1;
      const angle = DirectionAngles[key] + 90;
      const pointX = position.x + distanceToTheSide * Math.cos((Math.PI / 180) * angle);
      const pointY = position.y + distanceToTheSide * Math.sin((Math.PI / 180) * angle);

      wall.rotateY(degToRad(-DirectionAngles[key]));
      wall.translate(pointX, 0.5, pointY);
      wallBuffer = mergeBufferGeometries([wallBuffer, wall])!;
    }
  });

  isSelected ? groupRef.current?.position.setY(1) : groupRef.current?.position.setY(0);

  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    dispatch(setSelectedCell(cell));
  };

  return (
    <group onClick={handleClick} ref={groupRef}>
      <mesh geometry={hex} rotation={[0, 0, 0]} ref={hexRef} material={materials[room?.type]}></mesh>
      <mesh geometry={wallBuffer} material={wallMaterial}></mesh>
    </group>
  );
});

export { ThreeHexItem };
