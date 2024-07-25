import { MeshProps, ThreeEvent } from '@react-three/fiber';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import { Tools } from 'pages/map-editor/model/constants/tools';
import { generateDefaultCell } from 'pages/map-editor/model/default-objects/default-cell';
import { addCell } from 'pages/map-editor/model/store/map/map.slice';
import { getSelectedTool, toolSelector } from 'pages/map-editor/model/store/tools/tools.selector';
import { setTool } from 'pages/map-editor/model/store/tools/tools.slice';
import { useAppDispatch } from 'shared/libs/hooks/redux.hooks';
import { useHover } from 'shared/libs/hooks/use-hover.hook';
import { CylinderGeometry, Mesh, MeshStandardMaterial, Vector2 } from 'three';

type Props = {
  coordinates: {
    x: number;
    y: number;
  };
  props?: MeshProps;
};

const hex = new CylinderGeometry(1, 1, 1, 6, 1, false, Math.PI / 2, 2 * Math.PI);
const blankSpace = new CylinderGeometry(1, 1, 0.0, 6, 1, false, Math.PI / 2, 2 * Math.PI);

export default function BlankCellObject({ coordinates, ...props }: Props) {
  const blankRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const tool = useSelector(getSelectedTool());
  const isAddCellActive = tool === Tools.AddCell;
  const dispatch = useAppDispatch();

  const handlePointerEnter = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setHovered(true);
  };

  const handlePointerLeave = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setHovered(false);
  };

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    if (isAddCellActive) {
      const cellObject = generateDefaultCell();
      dispatch(addCell({ cell: cellObject.cell, room: cellObject.room, coordinates }));
      if (e.shiftKey) {
        return;
      }
      dispatch(setTool({ tool: null }));
    }
  };

  return (
    <mesh
      {...props}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onClick={handleClick}
      geometry={isAddCellActive && hovered ? hex : blankSpace}
      ref={blankRef}
    >
      <meshStandardMaterial
        transparent={true}
        opacity={isAddCellActive && hovered ? 0.5 : 0.1}
        color={isAddCellActive && hovered ? 'forestGreen' : 'white'}
      />
    </mesh>
  );
}
