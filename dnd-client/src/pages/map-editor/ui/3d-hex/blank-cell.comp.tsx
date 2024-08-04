import { MeshProps, ThreeEvent } from '@react-three/fiber';
import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import { Tools } from 'pages/map-editor/model/constants/tools';
import { cellSelector, getRooms } from 'pages/map-editor/model/store/add-cell/add-cell.selector';
import { refreshId } from 'pages/map-editor/model/store/add-cell/add-cell.slice';
import { addCell } from 'pages/map-editor/model/store/map/map.slice';
import { getSelectedTool } from 'pages/map-editor/model/store/tools/tools.selector';
import { setTool } from 'pages/map-editor/model/store/tools/tools.slice';

import { useAppDispatch, useAppSelector } from 'shared/libs/hooks/redux.hooks';

import { blankSpace, hex } from './geometries';

type Props = {
  coordinates: {
    x: number;
    y: number;
  };
  props?: MeshProps;
} & MeshProps;

export default function BlankCellObject({ coordinates, ...props }: Props) {
  const blankRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const tool = useSelector(getSelectedTool());
  const isAddCellActive = tool === Tools.AddCell;
  const dispatch = useAppDispatch();
  const cell = useAppSelector(cellSelector);
  const rooms = useAppSelector(getRooms());

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
      dispatch(addCell({ cell, rooms, coordinates }));
      dispatch(refreshId());

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
      ref={blankRef}
      geometry={isAddCellActive && hovered ? hex : blankSpace}
    >
      <meshStandardMaterial
        transparent={true}
        opacity={isAddCellActive && hovered ? 0.5 : 0.1}
        color={isAddCellActive && hovered ? 'forestGreen' : 'white'}
      />
    </mesh>
  );
}
