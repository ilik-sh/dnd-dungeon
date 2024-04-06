import { amber, green, grey, orange, red } from "@mui/material/colors";
import { CellDto } from "app/configuration/types/cell.dto";
import { mapSelector } from "app/map/store/map.selector";
import { Directions } from "enums/directions.enum";
import { RoomType } from "enums/room-type.enum";
import { TypeColors } from "enums/type-colors.enum";
import { useAppSelector } from "hooks/redux.hooks";
import React, { useEffect, useRef } from "react";
import {
  BoxGeometry,
  BufferGeometry,
  CylinderGeometry,
  EdgesGeometry,
  LineBasicMaterial,
  LineSegments,
  MathUtils,
  Matrix4,
  Object3D,
  PlaneGeometry,
  Quaternion,
  Shape,
  SphereGeometry,
  SpotLight,
  Vector2,
  Vector3,
} from "three";
import { mergeBufferGeometries } from "three-stdlib";
import { degToRad } from "three/src/math/MathUtils";

type ThreeHexItemProps = {
  cell: CellDto;
  position: Vector2;
};

export default function ThreeHexItem({ cell, position }: ThreeHexItemProps) {
  const ref = useRef<CylinderGeometry>(null!);
  const { selectedCellId, multipleSelection, multipleSelectedCells } =
    useAppSelector(mapSelector);
  const room = cell.rooms.find((room) => room.id == cell.currentRoom?.id);

  const hex = new CylinderGeometry(1, 1, 1, 6, 1, false, 10, 2 * Math.PI);
  hex.translate(position.x, 0, position.y);
  let buffer = new BufferGeometry();
  buffer = mergeBufferGeometries([new BoxGeometry(0, 0, 0)])!;
  Object.entries(room!.directions).map(([key, value], index) => {
    if (!value) {
      const angle = 60 * index + 90;
      const pointX = position.x + 0.8 * Math.cos((Math.PI / 180) * angle);
      const pointY = position.y + 0.8 * Math.sin((Math.PI / 180) * angle);
      const wall = new BoxGeometry(0.9, 0.25, 0.05);
      wall.rotateY(degToRad(-60 * index + 2));
      wall.translate(pointX, 0.6, pointY);
      buffer = mergeBufferGeometries([buffer, wall])!;
    }
  });

  const handleClick = () => {
    console.log("clicked");
    const v = new Vector3();
  };
  return (
    <>
      <mesh onClick={handleClick} geometry={hex} rotation={[0, 0, 0]}>
        <pointLight
          color={cell.id == selectedCellId ? grey[100] : amber[800]}
          position={[position.x, 1, position.y]}
        />
        <meshStandardMaterial
          flatShading={true}
          color={TypeColors[room?.type as RoomType].dark}
        ></meshStandardMaterial>
      </mesh>
      <mesh geometry={buffer}>
        <meshStandardMaterial
          flatShading={true}
          color={TypeColors[room?.type as RoomType].light}
        ></meshStandardMaterial>
      </mesh>
    </>
  );
}
