import { useTexture } from '@react-three/drei';
import { GroupProps } from '@react-three/fiber';

import { useTheme } from '@mui/material';
import { BoxGeometry, BufferGeometry, Group, Vector2 } from 'three';
import { mergeBufferGeometries } from 'three-stdlib';
import { degToRad } from 'three/src/math/MathUtils';

import { DirectionAngles } from 'shared/libs/enums/direction-angles';
import { TypeColors } from 'shared/libs/enums/type-colors.enum';
import { hex } from 'shared/ui/geometries';

import { RoomDto } from '../model/types/room.dto';

type ThreeRoomProps = {
  room: RoomDto;
  selected: boolean;
  hovering: boolean;
} & GroupProps;

export default function ThreeRoom({ room, selected, hovering, ...props }: ThreeRoomProps) {
  const theme = useTheme();

  const texture = useTexture(
    room.textureUrl
      ? room.textureUrl
      : 'https://firebasestorage.googleapis.com/v0/b/dndhub-fb81c.appspot.com/o/textures%2F04c539f2-50f6-41af-b2e0-d93f6e286621?alt=media&token=9253a487-14db-4f4a-9691-0aafdb80aa1e',
    (texture) => {
      texture.rotation = degToRad(90);
      texture.center = new Vector2(0.5, 0.5);
      texture.needsUpdate;
    },
  );

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

  let color;

  if (hovering) {
    color = theme.palette.secondary.main;
  }

  if (selected) {
    color = theme.palette.primary.main;
  }

  return (
    <>
    <instancedMesh ref={} args={[]}>

    </instancedMesh>
      <mesh geometry={hex}>
        <meshStandardMaterial
          map={texture}
          color={color ? color : TypeColors[room.type].light}
          transparent={true}
          opacity={color ? 0.8 : 1}
          flatShading={true}
        ></meshStandardMaterial>
      </mesh>
      <mesh geometry={wallBuffer}>
        <meshStandardMaterial color={color ? color : '#212121'}></meshStandardMaterial>
      </mesh>
    </>
  );
}
