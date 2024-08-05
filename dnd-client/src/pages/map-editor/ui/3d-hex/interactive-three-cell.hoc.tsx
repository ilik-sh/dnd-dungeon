import { GroupProps, ThreeEvent } from '@react-three/fiber';
import { memo, useRef } from 'react';

import { Group } from 'three';

import { isHoveringOverObject } from 'pages/map-editor/model/store/hover/hover.selector';
import { setHoveringElement } from 'pages/map-editor/model/store/hover/hover.slice';

import { CellDto } from 'entities/cell/model/types/cell.dto';
import ThreeRoom from 'entities/room/ui/three-room.comp';

import { useAppDispatch, useAppSelector } from 'shared/libs/hooks/redux.hooks';

import { getSelectedRoom, isCellSelected } from '../../model/store/map/map.selector';
import { setSelectedCell } from '../../model/store/map/map.slice';

type InteractiveThreeCellProps = {
  cell: CellDto;
} & GroupProps;

const InteractiveThreeCell = memo(function InteractiveThreeCell({ cell, ...props }: InteractiveThreeCellProps) {
  const dispatch = useAppDispatch();
  const room = useAppSelector(getSelectedRoom(cell.currentRoom));
  const isSelected = useAppSelector(isCellSelected(cell.id));
  const isHovering = useAppSelector(isHoveringOverObject(cell.id));

  const groupRef = useRef<Group>(null);

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
      <ThreeRoom room={room} selected={isSelected} hovering={isHovering} />
    </group>
  );
});

export { InteractiveThreeCell };
