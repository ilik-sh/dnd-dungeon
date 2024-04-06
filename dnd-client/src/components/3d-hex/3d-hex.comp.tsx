import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { BoxGeometry, Vector2 } from "three";
import ThreeHexItem from "./three-hex-item.comp";
import { useAppSelector } from "hooks/redux.hooks";
import { mapSelector } from "app/map/store/map.selector";

type Props = {};

const tileToPosition = (tileX: number, tileY: number, size: number) => {
  return new Vector2(
    (tileX * size * 3) / 2,
    tileY * Math.sqrt(3) * size + (((tileX % 2) * Math.sqrt(3)) / 2) * size
  );
};

export default function ThreeHex({}: Props) {
  const mapS = new BoxGeometry(15, 1, 15);
  mapS.translate(4.5, -1, 5.5);
  const { map } = useAppSelector(mapSelector);
  return (
    <Canvas camera={{ position: [5, 10, 25] }}>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Environment preset="night" />
      <mesh>
        <cylinderGeometry args={[1, 1, 3, 1, 1, false]}></cylinderGeometry>
        <meshStandardMaterial color={"red"}></meshStandardMaterial>
        {map.map((item, index) =>
          item.map((cell, nextIndex) => (
            <ThreeHexItem
              cell={cell}
              position={tileToPosition(index, nextIndex, 1)}
            />
          ))
        )}
      </mesh>
      <mesh geometry={mapS}>
        <meshStandardMaterial color={"#6c6c6c"}></meshStandardMaterial>
      </mesh>
      <OrbitControls
        target={[5, 0, 5]}
        enableDamping={true}
        dampingFactor={0.05}
      />
    </Canvas>
  );
}
