import { CellDto } from 'app/configuration/types/cell.dto';
import { mapSelector } from 'app/configuration/store/map.selector';
import { RoomType } from 'enums/room-type.enum';
import { TypeColors } from 'enums/type-colors.enum';
import { useAppDispatch, useAppSelector } from 'hooks/redux.hooks';
import { BoxGeometry, BufferGeometry, CylinderGeometry, Group, Vector2 } from 'three';
import { mergeBufferGeometries } from 'three-stdlib';
import { degToRad } from 'three/src/math/MathUtils';
import { useRef } from 'react';
import { DirectionAngles } from 'enums/direction-angles';
import { setSelectedCell } from 'app/configuration/store/map.slice';

type ThreeHexItemProps = {
  cell: CellDto;
  position: Vector2;
};

export default function ThreeHexItem({ cell, position }: ThreeHexItemProps) {
  const { selectedCellId, rooms } = useAppSelector(mapSelector);
  const dispatch = useAppDispatch();
  const room = rooms[cell.currentRoom];

  const groupRef = useRef<Group>();

  const ref = useRef();

  const hex = new CylinderGeometry(1, 1, 1, 6, 1, false, Math.PI / 2, 2 * Math.PI);
  hex.translate(position.x, 0, position.y);
  let wallBuffer = new BufferGeometry();
  wallBuffer = mergeBufferGeometries([new BoxGeometry(0, 0, 0)])!;

  Object.entries(room.roomDirections).map(([key, value], index) => {
    if (!value) {
      const distanceToTheSide = (Math.sqrt(3) / 2) * 1;
      const angle = DirectionAngles[key] + 90;
      const pointX = position.x + distanceToTheSide * Math.cos((Math.PI / 180) * angle);
      const pointY = position.y + distanceToTheSide * Math.sin((Math.PI / 180) * angle);
      const wall = new BoxGeometry(1 * 1.1, 0.5, 0.15);
      wall.rotateY(degToRad(-DirectionAngles[key]));
      wall.translate(pointX, 0.5, pointY);
      wallBuffer = mergeBufferGeometries([wallBuffer, wall])!;
    }
  });

  cell.id === selectedCellId ? groupRef.current?.position.setY(1) : groupRef.current?.position.setY(0);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    dispatch(setSelectedCell(cell));
  };

  return (
    <group onClick={handleClick} ref={groupRef}>
      <mesh geometry={hex} rotation={[0, 0, 0]} ref={ref}>
        <pointLight color={'blue'} position={[position.x, 1, position.y]} />
        <meshStandardMaterial flatShading={true} color={TypeColors[room?.type as RoomType].dark}></meshStandardMaterial>
      </mesh>
      <mesh geometry={wallBuffer}>
        <meshStandardMaterial flatShading={true} color={'grey'}></meshStandardMaterial>
      </mesh>
    </group>
  );
}
